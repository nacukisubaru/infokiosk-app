/*REACT*/
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    closeSmsVerifyModal, 
    correctCode, 
    setMinutesCode, 
    setOpenKeyboardTel, 
    setPhoneRef, 
    setSecondsCode, 
    toggleWhyNoSms
} from '../../redux/actions';

/*HOOKS*/
import { useAuthUserByPhoneWithVerifyRequest } from '../../hooks/authHooks';

/*MUI*/
import { Modal, Slide, Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Timer from '../../components/Timer';
import SmsCodeInput from '../SmsCodeInput';

/*IMAGES*/
import SvgClose from '../../components/Icons/SvgClose';

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '500px',
        left: '0',
        bottom: '0',
        width: '100%',
        background: theme.palette.background.default,
        borderRadius: '50px 50px 0 0',
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: '50px 50px 40px',
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
        padding: '0 90px 50px',
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
    modalFooter: {        
        marginTop: 80
    },
    text: {
        fontWeight: 500
    },
    link: {
        display: 'inline-block',
        fontWeight: 500,
        color: theme.palette.primary.main,
        borderBottom: '1px solid'
    },
    why: {
        padding: '0 40px'
    },
    whyText: {
        textAlign: 'left',
        lineHeight: '150%',
        
    },
    phone: {
        color: theme.palette.primary.main
    },
    btn: {
        display: 'inline-block',
        background: theme.palette.background.buttonBg,
        color: theme.palette.text.primary,              
        borderRadius: 30, 
        textDecoration: 'none',
        padding: '18px 55px', 
        fontWeight: 700,
        '&:hover': {
            backgroundColor: theme.palette.background.buttonBg,
            boxShadow: theme.shadows[3]
        },
        '&:active': {
            boxShadow: theme.shadows[3]
        },
    }
}));

export default function PopupSmsCode({options}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const authAgain = useAuthUserByPhoneWithVerifyRequest();

    const minutes = useSelector(state => state.timer.minutesCode);
    const seconds = useSelector(state => state.timer.secondsCode);
    const open = useSelector(state => state.smsVerify.openModalVerify);
    const whyNoSms = useSelector(state => state.smsVerify.whyNoSms);
    const verify = useSelector(state => state.smsVerify.verifySmsCode);    
    const tel = useSelector(state => state.keyboard.inputTel);    
    const mapActive = useSelector((state) => state.map.pageMapActive);

    const handleClose = () => {
        if(whyNoSms) {
            dispatch(toggleWhyNoSms());
        } else {
            dispatch(closeSmsVerifyModal());
            options.hasOwnProperty('activateUser') && options.activateUser();
            !mapActive && options.hasOwnProperty('startTimer') && options.startTimer();
        }
    }
    const handleToggleWhyNoSms = () => dispatch(toggleWhyNoSms());
    
    // const changeNumberPhone = () => {
    //     options.hasOwnProperty('activateUser') && options.activateUser();
    //     !mapActive && options.hasOwnProperty('startTimer') && options.startTimer();
    //     dispatch(closeSmsVerifyModal());
    //     dispatch(setPhoneRef());
    //     dispatch(setOpenKeyboardTel());
    // }

    const handleSendCodeAgain = () => {
        if(options.hasOwnProperty('pauseTimer')) {
            options.pauseTimer();
        }
        if(options.hasOwnProperty('activateUser')) {
            options.activateUser();
        }
        authAgain.refetch();
        dispatch(correctCode());
        dispatch(setSecondsCode(59));
    }

    const timer = {
        minutes: minutes,
        seconds: seconds,
        setMinutes: setMinutesCode,
        setSeconds: setSecondsCode
    }

    useEffect(()=> {
        dispatch(setSecondsCode(59));
    }, [dispatch, setSecondsCode]);

    useEffect(()=>{
        if(open && !verify && options.hasOwnProperty('pauseTimer')) {
            options.pauseTimer();
        }
    }, [open]);

    useEffect(()=>{
        if(minutes === 0 && seconds === 0) {
            if(options.hasOwnProperty('startTimer')) {
                options.startTimer();
            }
        }
    }, [minutes, seconds]);

    useEffect(()=>{
        !mapActive && options.hasOwnProperty('startTimer') && verify && options.startTimer();
    }, [verify]);

    useEffect(()=>{
        if(verify && options.hasOwnProperty('startTimer')) {
            !mapActive && options.startTimer();
        }
    }, [verify]);
    
    const num = `${tel.substring(0, 2)} ${tel.substring(2, 5)} ${tel.substring(5, 8)} ${tel.substring(8, 10)} ${tel.substring(10, 12)}`;
    
    return (
        <Modal
            open={ open }
            onClose={ !verify ? handleClose : () => {} }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={()=>{options.hasOwnProperty('activateUser') && options.activateUser()}}
        >
            <Slide direction="up" in={ open } timeout={500} mountOnEnter unmountOnExit>
                <Box className={ classes.modal }>
                    <Box className={ classes.modalHeader }>
                        { !verify &&
                            <div className={ classes.modalClose } onClick={ handleClose }>
                                <SvgClose />
                            </div>
                        }                                                            
                    </Box>
                    
                    <Box className={ classes.modalBody }>
                        {((whyNoSms === false) && (verify === false)) &&
                            <Box className={ classes.smsCode }>
                                <Typography variant="h4" mb={15}>На ваш номер телефона {tel} отправлено SMS с кодом подтверждения</Typography>
                                {/* <Button variant="outlined">
                                    <Typography variant="button2" onClick={ changeNumberPhone }>ИЗМЕНИТЬ НОМЕР ТЕЛЕФОНА</Typography>
                                </Button> */}
                                <Typography variant="h4" mt={15} mb={15}>Введите SMS-код</Typography>
                                
                                <SmsCodeInput />

                                <Box mt={15} mb={5}>
                                { minutes === 0 && seconds === 0
                                    ? null
                                    : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h6"  className={ classes.text } mr={2.5}>Получить новый код можно через</Typography>
                                        <Timer props={ timer } />
                                    </Box>
                                }
                                { minutes === 0 && seconds === 0
                                    ? <Button variant="contained">
                                        <Typography variant="button2" onClick={() => handleSendCodeAgain()}>ПОЛУЧИТЬ КОД ПОВТОРНО</Typography>
                                      </Button>
                                    : null
                                }
                                </Box>                        

                                <Typography variant="h6" className={ classes.link } onClick={ handleToggleWhyNoSms }>Не пришло SMS ?</Typography>
                            </Box>
                        }

                        {whyNoSms &&
                            <Box>
                                <Box className={ classes.why }>
                                    <Typography variant="h4" mb={15}>Почему не приходит SMS?</Typography>
                                    <Typography variant="h6" mb={5} className={ classes.whyText }>Возможно:</Typography>
                                    <Typography variant="body1" mb={15} component="div" className={ classes.whyText }>
                                        1. У Вас введён неправильный номер телефона. <br />
                                        2. Используется нестандартный оператор связи. <br />
                                        3. Произошёл технический сбой. <br />
                                        4. Неисправна SIM-карта. <br />
                                        5. На телефоне активирован режим “В самолете”. <br />
                                        6. SMS попало в папку Спам-сообщений <br />
                                        7. В настройках сооющений установлена блокировка коротких сообщений. 
                                    </Typography>
                                    <Typography variant="h6" mb={5} className={ classes.whyText }>Решение:</Typography>
                                    <Typography variant="body1" mb={15} component="div" className={ classes.whyText }>
                                        1. Если номер указан неправильно, замените его. <br />
                                        2. Если номер указан правильно, запросите код повторно и SMS придёт по резервному каналу. <br />
                                        3. Проверьте настройки телефона и SIM-карту.
                                    </Typography>
                                    <Typography variant="h6" component="div" mb={20}>Вы всегда можете обратиться в службу технической поддержки по номеру телефона <span className={ classes.phone }> 8-800-100-03-82</span></Typography>
                                </Box>

                                {/* { minutes === 0 && seconds === 0
                                    ? null
                                    : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'25px' }}>
                                        <Typography variant="h6"  className={ classes.text } mr={2.5}>Получить новый код можно через</Typography>
                                        <Timer props={ timer } />
                                    </Box>
                                } */}
                                
                                {/* <Stack
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="center"
                                    alignItems="center" 
                                    className={ classes.panel }
                                >
                                    <Button variant="outlined">
                                        <Typography variant="button2" onClick={ changeNumberPhone }>ИЗМЕНИТЬ НОМЕР ТЕЛЕФОНА</Typography>
                                    </Button>
                                  
                                    { minutes === 0 && seconds === 0
                                    ?   
                                        <Button variant="contained">
                                            <Typography variant="button2" onClick={ handleSendCodeAgainAndClosePopup }>ПОЛУЧИТЬ КОД ПОВТОРНО</Typography>
                                        </Button>
                                        : null
                                    }
                                </Stack> */}
                            </Box>
                        }

                        {verify &&
                            <Box className={ classes.verify }>
                                <Typography variant="h4" mb={15}>Ваш номер подтвержден!</Typography>
                                <Typography variant="h7" mb={15} component="div">Вы можете использовать номер телефона <span className={ classes.phone }>{num}</span> <br /> для авторизации и просмотра своих бронирований на сайте visit-sochi.com</Typography>
                                <Link to="/payment/" onClick={()=>{dispatch(closeSmsVerifyModal());}} className={ classes.btn }>
                                    <Typography variant="button2">ОПЛАТИТЬ БРОНИРОВАНИЕ</Typography>
                                </Link>                                
                            </Box>
                        }
                        
                    </Box>
                </Box>
            </Slide>
        </Modal>    
    )
}