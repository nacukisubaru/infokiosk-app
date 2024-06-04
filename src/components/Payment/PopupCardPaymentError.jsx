/*REACT*/
import React from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { closePopupCardError } from '../../redux/actions';

/*MUI*/
import { Modal, Slide, Box, Typography, Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '500px',
        left: '0',
        bottom: '0',
        width: '100%',
        background: theme.palette.background.default,
        boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.45)',
        borderRadius: '50px 50px 0 0',
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: '50px 50px 10px',
    },
    modalClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: theme.palette.primary.grey,
        cursor: 'pointer',
        marginLeft: 'auto',
        '& svg': {
            fill: theme.palette.primary.main
        }
    },
    modalBody: {
        height: 'calc(100% - 230px)',
        padding: '30px 114px 50px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        textAlign: 'center',
        '&::-webkit-scrollbar': {
            width: '11px',
            background: '#F4F4F4',
            borderRadius: '10px'
        },            
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '10px'
        }
    },
    link: {
        textDecoration: 'none'
    }
}));

export default function PopupCardPaymentError({ onPayHandler, onCloseHandler, onCancelOrder }) {  
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.payment.popupCardErrorPayment);     
    const navigate = useNavigate();

    const handleCloseWithPayment = () => {
        dispatch(closePopupCardError());
        onPayHandler();
        onCloseHandler();
    }

    const handleCancelOrder = async () => {
        await onCancelOrder();
        await dispatch(closePopupCardError());
        navigate('/excursion');
    }

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Slide direction="up" in={ open } timeout={500} mountOnEnter unmountOnExit>
                <Box className={ classes.modal }>
                    <Box className={ classes.modalHeader } /> 
                    
                    <Box className={ classes.modalBody }>
                        <Typography variant="h4" mb={13}>К сожалению, в процессе оплаты произошел сбой в работе терминала.</Typography>

                        <Typography variant="body">Попробуйте произвести оплату еще раз, нажав на кнопку “Оплатить”.</Typography>

                        <Stack 
                            spacing={5} 
                            direction="row" 
                            justifyContent="center"
                            alignItems="center" 
                            mt={20}
                        >
                            <Button variant="outlined" onClick={ handleCancelOrder }>
                                <Typography variant="button2">ОТМЕНИТЬ ЗАКАЗ</Typography>
                            </Button>

                            <Button variant="contained" onClick={ handleCloseWithPayment }>
                                <Typography variant="button2">ОПЛАТИТЬ</Typography>
                            </Button>
                        </Stack>               
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}