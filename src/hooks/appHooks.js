import { useSelector} from "react-redux";
import { setMessage, setSnack } from "../redux/actions/reducerActions";
import { useDispatch } from "react-redux";
import {useEffect, useRef, useState} from "react";
import { useTimer } from 'react-timer-hook';
import RestApi from "../api/restApi";
import { closeSmsVerifyModal, closeVerifyKeyboard, resetExList, resetFilter, resetLocation, resetWhereToGoList, setActiveTab, setCalendarValueList, setCatalogCountPage, setInputKeyboardSearch, setWhereToGoList, smsSentPhone, unsetVerify } from "../redux/actions";
import { closeSearch, setCountPage, setExcursionList } from "../redux/actions/excursionActions";
import { resetEventList, setEventList } from "../redux/actions/catalogActions";
export const useInit = () => {
    const manager = useSelector((state) => state);
    const dispatch = useDispatch();
    const mapActive = useSelector((state) => state.map.pageMapActive);
    const rest = new RestApi();
    return {
        manager,
        dispatch,
        mapActive,
        rest
    }
}

export const useShowMessage = () => {
    const init = useInit();

    const show = (message, status) => {
        init.dispatch(setMessage({name: message, status}));
        init.dispatch(setSnack(true));
    };

    const close = () => {
        init.dispatch(setSnack(false));
    }

    return {
        manager: init.manager.reducer,
        show,
        close
    };
};

export const useHandlerErrorsQuery = () => {
    const message = useShowMessage();

    const error = (data, showMessage = false) => {

    if (data) {
        if (data.result === null) {
            showMessage && message.show(data.error_description, "error");
            return data.error_description;
        }

        if (data.hasOwnProperty("error_description")) {
            let status = "error";
            if(data.hasOwnProperty("error")) {
                status = data.error;
            }

            showMessage && message.show(data.error_description, status);
            return data.error_description;
        }

        if(data.hasOwnProperty('error')) {
            showMessage && message.show(data.error, "error");
            return data.error;
        }
    }   
        
        return false;
    }

    return {
        error
    }
}

export const useCheckActiveUserInApp = (timeOutSec = 60) => {
    const ref = useRef();
    const [lastActive, setTimeLastActive] = useState(new Date().getTime());
    const [userActive, setUserActive] = useState(true);
    const time = new Date();
    time.setSeconds(timeOutSec);
    const {seconds, minutes, isRunning, start, pause} = useTimer({expiryTimestamp:time});
    const init = useInit();

    useEffect(() => {
        if(ref.current !== undefined) {
            ref.current.addEventListener('mousemove', activateUser);
            ref.current.addEventListener('keypress', activateUser);
            ref.current.addEventListener('click', activateUser);
        }
    }, [ref]);

    useEffect(() => {
        userIsActive(lastActive);
        // console.log({seconds, minutes});
    }, [seconds, minutes, lastActive, userIsActive]);

    useEffect(()=> {
        if(init.mapActive) {
            pause();
        } else {
            start();
        }
    }, [init.mapActive]);

    function userIsActive(lastActive) {
        if(isRunning) {
            if(new Date().getTime() - lastActive > timeOutSec){
                setTimeLastActive(new Date().getTime());
                setUserActive(false);
                return false;
            }
        }
    }

    function activateUser() {
        setTimeLastActive(new Date().getTime());
        if(!userActive) {
            setUserActive(true);
        }
    }

    function restartTimer() {
        activateUser();
        start();
    }

    return {ref, userActive, activateUser, pause, start, setUserActive, restartTimer};
}

export const useResetState = () => {
    const dispatch = useDispatch();
    const inputClear = useSelector(state => state.keyboard.keyboard);

    const clear = ( ) => {
        //await dispatch(setSlideIndex(0));
        dispatch(setCalendarValueList(''));
        dispatch(resetLocation());
        dispatch(resetFilter());
        dispatch(setCatalogCountPage(1));
        dispatch(setCountPage(1));
        dispatch(resetEventList());
        dispatch(setEventList([]));
        dispatch(resetWhereToGoList());
        dispatch(setWhereToGoList([]));
        dispatch(resetExList());
        dispatch(setExcursionList([]));
        dispatch(setInputKeyboardSearch(''));
        dispatch(closeSearch());
        dispatch(setActiveTab(0));
        dispatch(closeSmsVerifyModal());
        dispatch(unsetVerify());
        dispatch(closeVerifyKeyboard());
        if (inputClear.hasOwnProperty('clearInput')) inputClear.clearInput("default");
    }

    useEffect(()=>{
        clear();
    }, []);
}

export const useCreateMapObject = () => {
    const init = useInit();

    const createMapObject = (id, name, img, address, coord, phone = '') => {
        img = init.rest.host + img;
        const obj = {
            id,
            name, 
            img,
            address,
            coord: [parseFloat(coord.split(',')[0]), parseFloat(coord.split(',')[1])],
            phone
        }

        return obj;
    }

    return [createMapObject];
}