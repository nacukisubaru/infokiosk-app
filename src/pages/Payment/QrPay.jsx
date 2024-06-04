/*REACT*/
import React, { useEffect } from "react";
import QRCode from "react-qr-code";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setMinutesPay, setSecondsPay, openModalStay } from "../../redux/actions";

/*MUI*/
import { Container, Typography, Box, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Timer from "../../components/Timer";
import BottomPanel from "../../components/BottomPanel";

/*IMAGES*/
import card from '../../assets/images/card.svg';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '150px 135px 35px'
    },
    title: {
        textAlign: 'center'
    },
    qr: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 60px',
        width: 460,
        height: 460,
        borderRadius: 50,
        border: '2px solid rgba(0, 0, 0, 0.2)',
    },
    card: {
        width: 110,
        height: 110,
        background: `url(${card}) center center no-repeat`
    },
    pay: {
        textAlign: 'center',
        marginTop: 90
    }
}));

export default function QrPay({
    checkPayment, 
    // changeOrderHandler, cancelHandler, 
    pauseTimer 
}) {    
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const openStay = useSelector(state => state.payment.openStay);
    const minutes = useSelector(state => state.timer.minutesPay);
    const seconds = useSelector(state => state.timer.secondsPay);
    const paymentLink = useSelector(state => state.payment.paymentLink);
    const choosePayment = useSelector(state => state.payment.choosePayment);
    const timerEnd = useSelector(state => state.timer.timerEnd);
    //const secondsTimerEnd = useSelector(state => state.timer.secondsTimerEnd);

    const timer = {
        minutes: minutes,
        seconds: seconds,
        setMinutes: setMinutesPay,
        setSeconds: setSecondsPay,
        payment: true
    }

    const panelData = [
        // {
        //     url: '/excursion',
        //     variant: 'outlined',
        //     name: 'ОТМЕНИТЬ ЗАКАЗ',
        //     disabled: false,
        //     handler: cancelHandler
        // },
        // {
        //     url: '',
        //     variant: 'outlined',
        //     name: 'ИЗМЕНИТЬ СПОСОБ ОПЛАТЫ',
        //     disabled: false,
        //     handler: changeOrderHandler
        // }
    ];

    useEffect(() => {
        if(timerEnd) dispatch(openModalStay());
    }, [timerEnd, dispatch]);


    useEffect(()=>{
        if(!choosePayment) {
            pauseTimer();
        }
    }, [choosePayment, pauseTimer]);
    
    // useEffect(() => {
    //     let myInterval = setInterval(() => {
    //         if (secondsTimerEnd > 0) {
    //             dispatch(setSecondsTimerEnd(secondsTimerEnd - 1));
    //         }
    //         if (secondsTimerEnd === 0) {
    //             dispatch(setTimerEnd(true)); 
    //         } 
    //     }, 1000);

    //     return ()=> {
    //         clearInterval(myInterval);
    //     };
    // });

    return (
        <Container maxWidth="md" className={ classes.container }>
            <Typography variant="h2" mb={20} className={ classes.title }>QR код для оплаты</Typography>

            <Box className={ classes.qr }>
                <QRCode value={paymentLink} />
            </Box>

            <Typography variant="body1" mb={4} className={ classes.text }>1. Отсканируйте QR-код, используя мобильное устройство.</Typography>
            <Typography variant="body1" mb={4} className={ classes.text }>2. Следуйте инструкциям на странице оплаты.</Typography>
            <Typography variant="body1" mb={20} className={ classes.text }>3. Произведите оплату и нажмите кнопку “Я оплатил”.</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Typography variant="h6" className={ classes.text } mr={2.5}>Оплата доступна в течение</Typography>
                {!openStay && <Timer props={ timer } />}
            </Box> 

            <Box className={ classes.pay }>
                <Button variant="contained" onClick={ checkPayment }>
                    <Typography variant="button2">Я ОПЛАТИЛ</Typography>
                </Button>
            </Box>

            <BottomPanel data={ panelData } bottom={'150px !important'} />
        </Container> 
    )
}