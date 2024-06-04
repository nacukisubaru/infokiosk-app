import { useQuery } from "react-query";
import authApi from "../api/authApi";
import { useSelector } from "react-redux";
import { useHandlerErrorsQuery } from "../hooks/appHooks";
import { useDispatch } from "react-redux";
import {
    openSmsVerifyModal,
    setTempToken,
    inncorectCode,
    setErrorTel,
    setErrorEmail,
    resetSmsCode,
    smsSentPhone,
    enableBtnReservation,
    disableBtnReservation,
    setSmsCode,
    correctCode,
    setPayerName,
    setErrorEmailExist,
    setErrorEmailMessage,
    setCloseKeyboardEmail,
    setCloseKeyboardTel,
} from "../redux/actions";
import excursionsApi from "../api/excursionsApi";
import settingsApi from "../api/settingsApi";
import * as EmailValidator from 'node-email-validation';
import { useShowMessage } from "../hooks/appHooks";
import { useReservation } from "./excursionHooks";

const useInit = () => {
    const auth = new authApi();
    const excursion = new excursionsApi();
    const settings = new settingsApi();
    const reservation = useReservation();
    const dispatch = useDispatch();
    const message = useShowMessage();
    const errorHandler = useHandlerErrorsQuery();
    const email = useSelector((state) => state.keyboard.inputEmail);
    const phone =  useSelector((state) => state.keyboard.inputTel);
    const smscode = useSelector((state) => state.smsVerify.smscode);
    const groupId = useSelector((state) => state.select.selectGroupId);
    const gatheringId = useSelector((state) => state.select.selectPlaceId);
    const errorTel = useSelector(state => state.keyboard.showErrorTel);
    const errorEmail = useSelector(state => state.keyboard.showErrorEmail);
    const checkPolicy = useSelector(state => state.app.checkBoxPolicy);
    const quotasAvailable = useSelector(state => state.excursionManager.quotasAvailable);
    const ticketsQuantity = useSelector(
        (state) => state.inputNumber.valueTotal
    );
    const date = useSelector((state) => state.calendar.value);

    return {
        dispatch,
        auth,
        excursion,
        errorHandler,
        email,
        phone,
        smscode,
        groupId,
        gatheringId,
        ticketsQuantity,
        date,
        settings,
        errorTel,
        errorEmail,
        checkPolicy,
        quotasAvailable,
        message,
        reservation
    };
};

export const useAuthUserByPhoneWithVerifyRequest = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "auth step one",
        () =>
            init.auth.AuthUserByPhoneWithVerifyRequest(init.phone, init.email, true),
        {
            onSuccess: ({ data }) => {
                const error = init.errorHandler.error(data);
                init.dispatch(setErrorTel(false));
                init.dispatch(setErrorEmail(false));

                if (!error) {
                    if(data.hasOwnProperty('name') && data.hasOwnProperty('lastName')) {
                        init.dispatch(setPayerName(data.name + " " + data.lastName));
                    }
                    init.dispatch(openSmsVerifyModal());
                    init.dispatch(smsSentPhone(init.phone));
                } else {
                    if (data.error.indexOf("Неверный email") > -1) {
                        init.dispatch(setErrorEmail(true));
                    } else {
                        init.dispatch(setErrorEmail(false));
                    }
                    if (data.error.indexOf("некорректный номер телефона") > -1) {
                        init.dispatch(setErrorTel(true));
                    } else {
                        init.dispatch(setErrorTel(false));
                    }   
                  
                    if (data.error.indexOf("Пользователь с таким email") > -1) {
                        init.dispatch(setErrorEmail(true));
                        init.dispatch(setErrorEmailExist(true));
                        init.dispatch(setErrorEmailMessage());
                    } else {
                        init.dispatch(setErrorEmail(false));
                        init.dispatch(setErrorEmailExist(false));
                        init.dispatch(setErrorEmailMessage());
                    }
                }
            },
            enabled: false,
        }
    );

    return { isLoading, error, data, refetch };
};

export const useAuthUserByPhoneWithVerifyRequestStepTwo = () => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "auth step two",
        () =>
            init.auth.AuthUserByPhoneWithVerifyRequestStepTwo(
                init.phone,
                init.smscode
            ),
        {
            onSuccess: async ({ data }) => {
                const result = data;
                const error = init.errorHandler.error(result);
                init.dispatch(resetSmsCode());
                if (!error) {
                    if(data.hasOwnProperty('access_token')) {
                        init.dispatch(setTempToken(data.access_token));
                        init.reservation.refetch();
                    }
                }

                if (error === "не верный код смс" || !data.hasOwnProperty('access_token')) {
                    init.dispatch(inncorectCode());
                    init.dispatch(setSmsCode(""));
                } else {
                    init.dispatch(correctCode());
                }
            },
            enabled: false,
        }
    );

    return { isLoading, error, data, refetch };
};


export const useValidatePhone = (enter = false) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "validate phone number",
        () =>
            init.settings.validatePhoneNumber(init.phone),
        {
            onSuccess: ({ data }) => {
                init.dispatch(setErrorEmail(false));
                init.dispatch(setErrorEmailExist(false));
                init.dispatch(setErrorEmailMessage());
                if (data.result[1] === true) {
                    init.dispatch(setErrorTel(false));
                    if(init.errorEmail === false && init.email.length > 0 && init.checkPolicy === true && init.quotasAvailable) {
                        init.dispatch(enableBtnReservation());
                    }
                    if (enter) init.dispatch(setCloseKeyboardTel());                    
                } else {
                    init.dispatch(disableBtnReservation());
                    init.dispatch(setErrorTel(true));
                }
            },
            enabled: false,
        }
    );

    return { isLoading, error, data, refetch };
}

export const useValidateEmail = () => {
    const init = useInit();

    const goValidate = async (email, enter = false) => {
        if(EmailValidator.is_email_valid(email)) {
            await init.dispatch(setErrorEmail(false));
            init.dispatch(setErrorEmailExist(false));
            init.dispatch(setErrorEmailMessage());
            if(init.errorTel === false && init.phone.length > 0 && init.checkPolicy === true && init.quotasAvailable) {
                init.dispatch(enableBtnReservation());
            }
            if (enter) init.dispatch(setCloseKeyboardEmail());
        } else {
            await init.dispatch(setErrorEmail(true));
            init.dispatch(setErrorEmailExist(false));
            init.dispatch(setErrorEmailMessage());
            init.dispatch(disableBtnReservation());
        }
    }

    return {goValidate};
}