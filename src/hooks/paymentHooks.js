import PaymentApi from "../api/paymentApi";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { openModalStay, openPopupCardError, setMinutesPay, setSecondsPay, openPopupCheckError } from "../redux/actions";

const useInit = () => {
    const dispatch = useDispatch();
    const searchWorking = useSelector((state) => state.excursionManager.search);
    const paymentApi = new PaymentApi();
    const navigate = useNavigate();

    return {
        dispatch,
        paymentApi,
        searchWorking,
        navigate
    };
};

const handlerErrorsQuery = (data, init, showMessage = false) => {

    if (data.hasOwnProperty("error_description")) {
        let status = "error";
        if(data.hasOwnProperty("error")) {
            status = data.error;
        }
        if(showMessage) {init.message.show(data.error_description, status);}
        return false;
    }

    if(data.hasOwnProperty('error')) {
        if(showMessage) {init.message.show(data.error, "error");}
        return false;
    }

    if (data.hasOwnProperty('result') && data.result === null) {
        return false;
    }

    if(data === null) {
        return false;
    }

    return true;
}

export const useGetPayment = (amount, command, count, orderId) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "catalog element",
        () => init.paymentApi.getPaymentCard(amount, command, count, orderId),
        {
            onSuccess: (data) => {
                console.log({data});
                if (data) {
                    console.log(String(data.data));
                    switch(String(data.data)) {
                        //успех
                        case "true":
                            init.navigate("/reservation-success/");
                        break;
                         //при истечении таймера и разрыве оплаты включаем попап "вы еще здесь"
                        // case "Клиент отказался от выполнения операции":
                        //     init.dispatch(setSecondsPay(0));
                        //     init.dispatch(setMinutesPay(0));
                        //     init.dispatch(openModalStay(true));
                        // break;
                        //общая ошибка терминала включаем попап ошибки
                        case "terminal_false":
                            console.log('terminal false');
                            init.dispatch(openPopupCardError());
                        break;
                        case "client_false":
                            console.log("client false");
                            init.dispatch(setSecondsPay(0));
                            init.dispatch(setMinutesPay(0));
                            init.dispatch(openModalStay(true));
                        break;
                        case "timeout_false":
                            console.log("timeout false");
                            init.dispatch(setSecondsPay(0));
                            init.dispatch(setMinutesPay(0));
                            init.dispatch(openModalStay(true));
                        break;
                        case "check_false":
                            //ошибка в работе терминала
                            console.log('check false');
                            init.dispatch(openPopupCheckError());
                        break;
                        default:
                            init.dispatch(openPopupCardError());
                        break;
                    }
                } else {
                    init.dispatch(openPopupCardError());     
                }
            },
            onError: () => {
                init.dispatch(openPopupCardError());
            },
            enabled: false
        }
    );

    return { isLoading, error, data, refetch };
}

export const useCancelPayment = (amount, count, orderId, command = 5) => {
    const init = useInit();

    const { isLoading, error, data, refetch } = useQuery(
        "cancel payment",
        () => init.paymentApi.getPaymentCard(amount, command, count, orderId),
        {
            onSuccess: (data) => {
            },
            enabled: false
        }
    );

    return { isLoading, error, data, refetch };
}