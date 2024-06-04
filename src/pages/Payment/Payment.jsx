/*REACT*/
import React, { useEffect } from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { 
    setInputKeyboardTel,
    openModalStay, 
    setCardPayment, 
    setChoosePayment, 
    setComeBackToList, 
    setMinutesPay, 
    setSecondsPay, 
    setSecondsTimerEnd, 
    setTimerEnd, 
    toggleNoPayment,
    setMinutesCardPay,
    setSecondsCardPay
} from "../../redux/actions";
import { setTagFiltered } from "../../redux/actions/filterActions";

/*HOOKS*/
import { useReservationHasPayment } from "../../hooks/excursionHooks";
import { useCancelPayment, useGetPayment } from "../../hooks/paymentHooks";
import { useCancelReservation } from '../../hooks/excursionHooks';

/*COMPONENTS*/
import PopupStay from "../../components/PopupStay";
import PopupNoPayment from "../../components/DetailExcursion/PopupNoPayment";
import PopupCardPaymentError from "../../components/Payment/PopupCardPaymentError";

/*PAGES*/
import ChoosePayment from "./ChoosePayment";
import QrPay from "./QrPay";
import CardPay from "./CardPay";
import PopupPayment from "../../components/Payment/PopupPayment";
import { useCheckActiveUserInApp } from "../../hooks/appHooks";
import PopupCheckPaymentError from "../../components/Payment/PopupCheckPaymentError";

export default function Payment() {
    const dispatch = useDispatch();
    const checkPayment = useReservationHasPayment().checkPayment;
    const cancelReservation = useCancelReservation();
    const {ref, userActive, activateUser, pause, restartTimer} = useCheckActiveUserInApp(300000);
    const card = useSelector(state => state.payment.cardPayment);
    const choosePayment = useSelector(state => state.payment.choosePayment);
    const orderId = Number(useSelector(state => state.payment.orderId));
    const orderSum = Number(useSelector((state) => state.payment.paymentSum));
    const openNoPayment = useSelector(state => state.payment.popupNoPayment);
    // const getPaymentRequest = useGetPayment(1000, 4, 1, 11111);
    const getPaymentRequest = useGetPayment(orderSum, 2, 1, orderId);
    const cancelPayment = useCancelPayment(orderSum, 1, orderId);

    useEffect(() => {
        if(userActive === false) {
            pause();
            dispatch(openModalStay());
        }
    }, [userActive]);

    const checkPaymentWithoutRedirect = () => {
        checkPayment(false);
        handleContinue();
    }

    const checkPaymentWithRedirect = async () => {
        handleContinue();
        checkPayment(true);
        cancelReservation.refetch();    
        dispatch(setChoosePayment(true)); 
        dispatch(setCardPayment(false));  
        dispatch(setInputKeyboardTel(''));   
    }

    const payHandler = () => getPaymentRequest.refetch();

    const handleContinue = () => {
        dispatch(setTimerEnd(false));
        dispatch(setSecondsTimerEnd(173)); 
        restartTimer();
        
        if(card) {
            dispatch(setMinutesCardPay(1));
            dispatch(setSecondsCardPay(59));
        } else {
            dispatch(setMinutesPay(2));
            dispatch(setSecondsPay(59));
        }

        if (openNoPayment) dispatch(toggleNoPayment()); 
    }

    const onChangeOrderHandler = () => {
        dispatch(setChoosePayment(true)); 
        dispatch(setCardPayment(true));
        handleContinue();
    }

    const onChangeCardOrderHandler = () => {
        cancelPayment.refetch();
        onChangeOrderHandler();
    }

    const onCancelHandler = () => {
        cancelReservation.refetch();
        dispatch(setTimerEnd(false)); 
        dispatch(setSecondsTimerEnd(173)); 
        dispatch(setTagFiltered(false));
        dispatch(setComeBackToList(false));
        dispatch(setChoosePayment(true)); 
        dispatch(setCardPayment(false));
        if(card) {
            dispatch(setMinutesCardPay(1));
            dispatch(setSecondsCardPay(59));
        } else {
            dispatch(setMinutesPay(2));
            dispatch(setSecondsPay(59));
        }

        dispatch(setInputKeyboardTel('')); 
    }

    const onCancelCardPayHandler = () => {
        cancelPayment.refetch();
        onCancelHandler();
    }

    return (
        <main ref={ ref }>            
            { choosePayment ?
                <ChoosePayment cancelHandler={ onCancelHandler } />
                :
                card ?
                    <CardPay
                        paymentRequest = {getPaymentRequest.refetch}
                        changeOrderHandler={ onChangeCardOrderHandler } 
                        cancelHandler={ onCancelCardPayHandler } 
                        pauseTimer={ pause }
                    /> :
                    <QrPay 
                        checkPayment={ checkPaymentWithoutRedirect } 
                        changeOrderHandler={ onChangeOrderHandler } 
                        cancelHandler={ onCancelHandler } 
                        pauseTimer={ pause }
                    />   
            }                
                
            <PopupStay options={{
                onContinue: ()=>{
                    if(card) {
                        getPaymentRequest.refetch();
                    } 
                    handleContinue();
                }, 
                resetOrder: checkPaymentWithRedirect, 
                checkHasPayment: checkPaymentWithRedirect, 
                subtitle: 'Сессия покупки завершится через: '
            }}/>
            <PopupNoPayment onPayHandler={ payHandler } /> 
            <PopupCheckPaymentError  />
            <PopupCardPaymentError onPayHandler={ payHandler } onCloseHandler={ handleContinue } onCancelOrder={ cancelReservation.refetch } />  
            <PopupPayment />      
        </main>
    );
}