/*REACT*/
import React from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setMinutesCardPay, setSecondsCardPay, setSecondsTimerEnd, setTimerEnd } from "../../redux/actions";

/*MUI*/
import { Container, Typography, Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Timer from "../../components/Timer";
import BottomPanel from "../../components/BottomPanel";

/*IMAGES*/
import card from '../../assets/images/card.svg';
import SvgArrowDown from '../../components/Icons/SvgArrowDown';
import { useEffect } from "react";

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
        marginBottom: 60
    },
    arrowIcon: {
        display: 'block',
        margin: '90px auto 0',
        fill: theme.palette.primary.main
    },
}));

export default function CardPay({
    paymentRequest, 
    // changeOrderHandler, cancelHandler, 
    pauseTimer 
}) {
    const classes = useStyles();
    const openStay = useSelector(state => state.payment.openStay);
    const minutes = useSelector(state => state.timer.minutesCardPay);
    const seconds = useSelector(state => state.timer.secondsCardPay);
    const choosePayment = useSelector(state => state.payment.choosePayment);
    //const secondsTimerEnd = useSelector(state => state.timer.secondsTimerEnd);
    //const dispatch = useDispatch();

    const timer = {
        minutes: minutes,
        seconds: seconds,
        setMinutes: setMinutesCardPay,
        setSeconds: setSecondsCardPay
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

    useEffect(()=>{
        paymentRequest();
    }, [paymentRequest]);
    
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
            <Typography variant="h2" mb={20} className={ classes.title }>Оплата банковской картой</Typography>

            <Box className={ classes.qr }>
                <span className={ classes.card }></span>
            </Box>

            <Typography variant="body1" mb={4} className={ classes.text }>1. Приложите карту или мобильное устройство к терминалу оплаты</Typography>
            <Typography variant="body1" mb={20} className={ classes.text }>2. Следуйте инструкциям на пин-паде</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6"  className={ classes.text } mr={2.5}>Оплата доступна в течение</Typography>
                {!openStay && <Timer props={ timer } />}
            </Box>  

            <SvgArrowDown className={ classes.arrowIcon } /> 

            <BottomPanel data={ panelData } bottom={'150px !important'} />
        </Container>
    )
}