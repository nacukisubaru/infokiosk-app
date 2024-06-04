/*REACT*/
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { closenModalStay, setMinutesStay, setSecondsStay } from '../redux/actions';

/*MUI*/
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Timer from './Timer';

export const useStyles = makeStyles((theme) => ({
    modal: {
        minHeight: 460,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '870px',
        background: theme.palette.background.default,
        boxShadow: theme.shadows[5],
        borderRadius: 50,
        border: 'none',
        outline: 'none'
    },
    modalBody: {
        padding: '100px 50px 50px',
        textAlign: 'center'
    }
}));

export default function PopupStay({options}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const open = useSelector(state => state.payment.openStay);
    const minutes = useSelector(state => state.timer.minutesStay);
    const seconds = useSelector(state => state.timer.secondsStay);

    const timer = {
        minutes: minutes,
        seconds: seconds,
        setMinutes: setMinutesStay,
        setSeconds: setSecondsStay
    }

    useEffect( () => {
        if(minutes === 0 && seconds === 0) {
            if(options.hasOwnProperty('checkHasPayment')) {
                dispatch(setSecondsStay(10));
                dispatch(closenModalStay());
                options.checkHasPayment();
            } else {
                handleEnding();
            }
        }
    }, [minutes, seconds]);

    const handleContinue = () => {
        if(options.hasOwnProperty('onContinue')) {
            options.onContinue();
        }
        dispatch(setSecondsStay(10));
        dispatch(closenModalStay());
    }   

    const handleEnding = () => {
        if(options.hasOwnProperty('resetOrder')) {            
            options.resetOrder();
        }
        dispatch(closenModalStay());
        dispatch(setSecondsStay(10));
        navigate('/');
    }

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={ classes.modal }>                
                <Box className={ classes.modalBody }>
                  
                    <Typography variant="h4" mb={5}>Вы еще здесь?</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {options.hasOwnProperty('subtitle') && (
                             <Typography variant="h6" className={ classes.text } mr={2.5}>{options.subtitle}</Typography>
                        )}
                        <Timer props={ timer } />
                    </Box>  
                
                    <Stack 
                        spacing={5} 
                        direction="row" 
                        justifyContent="center"
                        alignItems="center" 
                        mt={15}
                    >
                        <Button  variant='outlined' onClick={ handleEnding }>
                            <Typography variant="button2">ЗАВЕРШИТЬ</Typography>
                        </Button>
                        <Button  variant='contained' onClick={ handleContinue }>
                            <Typography variant="button2">ПРОДОЛЖИТЬ</Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>    
    )
}