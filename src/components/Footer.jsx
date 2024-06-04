/*REACT*/
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { 
    resetExList, 
    resetFilter, 
    resetLocation, 
    resetWhereToGoList, 
    setActiveTab, 
    setCalendarValueList, 
    setCatalogCountPage, 
    setChosenCalendarValueList, 
    setWhereToGoList, 
    togglePopupSupport,
    setInputKeyboardSearch, 
    correctCode,
    disableBtnReservation
} from '../redux/actions';
import { closeSearch, setCountPage, setExcursionList } from '../redux/actions/excursionActions';
import { resetEventList, setEventList } from '../redux/actions/catalogActions';

/*HOOKS*/
import { useCancelReservation } from '../hooks/excursionHooks';

/*MUI*/
import { Container, Stack, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import PopupSupport from './PopupSupport';

/*ICONS*/
import SvgHome from './Icons/SvgHome';
import SvgMessage from './Icons/SvgMEssage';

export const useStyles = makeStyles((theme) => ({
    footer: {
        background: theme.palette.primary.main,
        color: theme.palette.text.white,
        position: 'sticky',
        bottom: '0',
        zIndex: 10000,
        borderRadius: '50px 50px 0px 0px',
        marginTop: '-50px',
        boxShadow: theme.shadows[0]
    },
    footerTransparent: {
        width: '100%',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)',
        color: theme.palette.text.white,
        position: 'fixed',
        bottom: '0',
        zIndex: 10000,
        borderRadius: '50px 50px 0px 0px',
        marginTop: '-20px',
        boxShadow: theme.shadows[0]
    },
    footerInner: {
        padding: '23px 0'
    },
    link: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit',
        margin: '0 10px',
    },
    linkActive: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.green,
        margin: '0 10px',
        '& svg': {
            fill: theme.palette.primary.green
        }
    },
    icon: {
        fill: theme.palette.text.white,
        marginBottom: theme.spacing(1)
    },
    linkBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'transparent',
        color: theme.palette.text.white,
        textTransform: 'initial',
    },
    linkBtnActive: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'transparent',
        color: theme.palette.primary.green,
        textTransform: 'initial',
        '& svg': {
            fill: theme.palette.primary.green
        }
    }
}));

export default function Footer({ props }) {
    let footer = props.footerMainpage;

    let location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [btnActive, setBtnActive] = useState(false);
    const cancelReservation = useCancelReservation();

    const popup = useSelector(state => state.app.popupSupport);    
    const inputClear = useSelector(state => state.keyboard.keyboard);
    // const techWork = (location.pathname.includes('tech-work')) ? true : false;
    
    if (props.location === '/') footer = !popup;

    const handleOpen = () => dispatch(togglePopupSupport());

    const clearInputSearch = async( ) => {
        await dispatch(setInputKeyboardSearch(''));
        await dispatch(setActiveTab(0));
        await dispatch(setCalendarValueList(''));
        await dispatch(setChosenCalendarValueList(''));
        await dispatch(resetLocation());
        await dispatch(resetFilter());
        await dispatch(setCatalogCountPage(1));
        await dispatch(setCountPage(1));
        await dispatch(resetEventList());
        await dispatch(setEventList([]));
        await dispatch(resetWhereToGoList());
        await dispatch(setWhereToGoList([]));
        await dispatch(resetExList());
        await dispatch(setExcursionList([]));        
        await dispatch(closeSearch());        
        dispatch(correctCode());
        dispatch(disableBtnReservation());
        if (props.location === '/payment' || props.location === '/payment/') cancelReservation.refetch();
        
        setBtnActive(true);
        setTimeout(() => {
            setBtnActive(false);
        }, 500);

        if (inputClear.hasOwnProperty('clearInput')) inputClear.clearInput("default");
    }

    return (
        <footer className={ (footer) ? classes.footerTransparent : classes.footer }>
            <Container maxWidth="md">
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" className={ classes.footerInner }>
                {props.showBtnHome && (
                     <Link to="/mainpage" className={ btnActive ? classes.linkActive : classes.link } onClick={ clearInputSearch }>
                        <SvgHome className={ classes.icon } />
                        <Typography variant="body2" className={ classes.text }>На главную</Typography>
                    </Link>
                )}
                <Button className={ (popup) ? classes.linkBtnActive : classes.linkBtn } onClick={ handleOpen }>
                    <SvgMessage className={ classes.icon } />
                    <Typography variant="body2" className={ classes.text }>Служба поддержки</Typography>
                </Button>
                </Stack>
            </Container>
            <PopupSupport />
        </footer>
    )
}