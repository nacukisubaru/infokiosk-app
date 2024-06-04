/*REACT*/
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { setCardPayment, setChoosePayment } from '../redux/actions';

/*HOOKS*/
import { useCheckActiveUserInApp } from "../hooks/appHooks";
import { useSettingBannerTerminal } from "../hooks/useSetting";

/*HELPERS*/
import RestApi from "../api/restApi";

/*MUI*/
import { Container, Stack, Box, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import PopupStay from "../components/PopupStay";

/*IMAGES*/
import img from '../assets/images/screen-success.jpg';
import imgLogo from '../assets/images/logo.svg';

export const useStyles = makeStyles((theme) => ({
    banner: {
        display: 'flex',
        alignItems: 'center',
        backgroundSize: 'cover', 
        color: theme.palette.text.white,
        height: '460px',
        position: 'relative',
        marginBottom: 25,
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            background: theme.palette.background.bgOpacity,
            position: 'absolute',
            top: '0',
            left: '0'
        },
    },
    container: {
        paddingLeft: '30px',
        paddingRight: '30px',
    },
    headerInner: {
        padding: '20px 0',
        position: 'relative',
        zIndex: '1'
    },
    logo: {
        width: '555px',
        height: '145px',
        background: `url(${imgLogo}) center center no-repeat`,
        backgroundSize: 'contain',        
    },
    subtitle: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(8)
    },
    center: {
        textAlign: 'center'
    },
    reservation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 460,
        height: 460,
        borderRadius: 50,
        margin: '0 auto 60px',
        border: '2px solid rgba(0, 0, 0, 0.2)',
        fontSize: 140,
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    link: {
        color: theme.palette.primary.main
    },
    qr: {
        width: 200,
        height: 200
    }
}));

export default function ReservationSuccess() {
    const restApi = new RestApi();
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ref, userActive, pause, restartTimer} = useCheckActiveUserInApp(60000);
    useSettingBannerTerminal();

    const orderId = useSelector(state => state.payment.orderId);
    const phone = useSelector(state => state.keyboard.inputTel);
    const email = useSelector(state => state.keyboard.inputEmail);
    const {reservSuccessBanner, reservSuccessSlogan} = useSelector(state => state.excursionManager);

    const setPaymentPage = () => {
        dispatch(setChoosePayment(true)); 
        dispatch(setCardPayment(false));
    }

    useEffect(() => {
        if(userActive === false) {
            pause();
            navigate('/');
        }
    }, [userActive]);

    return (
        <>  
            <div ref={ref}>
                <Box className={ classes.banner } sx={{ background: `url(${reservSuccessBanner ? restApi.host + reservSuccessBanner : img}) center center no-repeat`}}>
                    <Container maxWidth="md" className={ classes.container }>
                        <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center" 
                            className={ classes.headerInner }
                        >
                            <Link to="/" onClick={ setPaymentPage }><Box component="div" className={ classes.logo }></Box></Link>
                            <Box component="div" className={ classes.phone }>
                                <Typography variant="h1" className={ classes.subtitle }>{reservSuccessSlogan ?  reservSuccessSlogan : ' Бронирование прошло успешно!'}</Typography>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="md" sx={{padding: '35px 110px !important'}}>
                    <Typography variant="h2" mb={15} className={ classes.center }>Желаем приятного отдыха!</Typography>
                    <Typography variant="h6" mb={10} className={ classes.center }>Номер вашего бронирования</Typography>
                    <Box className={ classes.reservation }>
                        { orderId }
                    </Box>

                    <Grid container justifyContent="space-between" spacing={5} mb={20}>
                        <Grid item xs={9}>
                            <Typography variant="body1" mb={7.5} component="div" sx={{paddingRight: '56px'}}>Письмо с подтверждением бронирования отправлено вам на почту <a href={"mailto:" + email} className={ classes.link }>{email}</a></Typography>
                            <Typography variant="body1" component="div" sx={{paddingRight: '45px'}}>Вы можете  посмотреть детали бронирования и правила отмены  на сайте visit-sochi.com, используя для входа номер телефона <a href={"tel:"+phone} className={ classes.link }>{phone}</a></Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Box className={ classes.qr }>                   
                                <QRCode size={200} value={restApi.host} />
                                <Typography variant="body2" className={ classes.center }>Перейти на сайт</Typography>
                            </Box>
                        </Grid>
                    </Grid> 

                    <Box className={ classes.center }>
                        <Link to='/' onClick={ setPaymentPage }>
                            <Button variant="contained">
                                СПАСИБО :)
                            </Button>
                        </Link>             
                    </Box>                
                </Container>
                <PopupStay options={{onClose: restartTimer, subtitle: 'Сессия закончится через: '}} />
            </div>    
        </>
    );
}