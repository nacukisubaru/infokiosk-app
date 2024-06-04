/*REACT*/
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/*REDUX*/
import { useDispatch } from "react-redux";
import { setCardPayment, setChoosePayment, setMinutesCardPay, setMinutesPay, setSecondsCardPay, setSecondsPay } from "../../redux/actions";

/*MUI*/
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';

/*IMAGES*/
import card from '../../assets/images/card.svg';
import qr from '../../assets/images/QR.svg';

export const useStyles = makeStyles((theme) => ({
    containerChoose: {
        padding: '150px 50px 35px'
    },
    title: {
        textAlign: 'center'
    },
    payment: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 460,
        height: 460,
        borderRadius: 50,
        border: '2px solid rgba(0, 0, 0, 0.2)',
        '&:active, &:focus, &:hover': {
            background: theme.palette.primary.green,
            boxShadow: "inset 2px 4px 10px rgba(87, 105, 27, 0.35)"
        }
    },
    card: {
        width: 110,
        height: 110,
        background: `url(${card}) center center no-repeat`
    },
    qrcode: {
        width: 110,
        height: 110,
        background: `url(${qr}) center center no-repeat`
    },
}));

export default function ChoosePayment({ cancelHandler }) {    
    const classes = useStyles();
    const dispatch = useDispatch();

    const onCardClickHandler = () => {          
        //setTimeout(() => {
            dispatch(setChoosePayment(false)); 
            dispatch(setCardPayment(true)); 
        //}, 500);        
    }

    const onQrClickHandler = () => {
        //setTimeout(() => {
            dispatch(setChoosePayment(false)); 
            dispatch(setCardPayment(false));
        //}, 500);  
    }

    useEffect(() => {
        dispatch(setSecondsCardPay(59));
        dispatch(setMinutesCardPay(1));
        dispatch(setSecondsPay(59));
        dispatch(setMinutesPay(2));
    }, [dispatch]);

    return (
        <Container maxWidth="md" className={ classes.containerChoose }>
            <Typography variant="h2" mb={42} className={ classes.title }>Произведите оплату для завершения бронирования</Typography>

            <Typography variant="h4" mb={20} className={ classes.title }>Как хотите оплатить?</Typography>            

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className={ classes.payment } onClick={ onCardClickHandler }>
                    <Typography variant="h4" mb={7.5} className={ classes.title }>Банковской картой</Typography>
                    <span className={ classes.card }></span>
                </Box>

                <Box className={ classes.payment } onClick={ onQrClickHandler }>
                    <Typography variant="h4" mb={7.5} className={ classes.title }>Через QR-код</Typography>
                    <span className={ classes.qrcode }></span>
                </Box>
            </Box>

            <Stack 
                spacing={5} 
                direction="row" 
                justifyContent="center"
                alignItems="center" 
                mt={20}
            >
                <Link to='/excursion' onClick={ cancelHandler }>
                    <Button variant="outlined">
                        <Typography variant="button2">Отменить заказ</Typography>
                    </Button>
                </Link>
            </Stack>
        </Container>
    )
}