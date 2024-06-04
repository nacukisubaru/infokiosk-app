/*REACT*/
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Parser from "html-react-parser";

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
    setWhereToGoList 
} from '../redux/actions';
import { setInputKeyboardSearch } from '../redux/actions';
import { closeSearch, setCountPage, setExcursionList } from '../redux/actions/excursionActions';
import { resetEventList, setEventList } from '../redux/actions/catalogActions';

/*HELPERS*/
import RestApi from '../api/restApi';
import { decodeHtml } from '../helpers/stringHelper';

/*MUI*/
import { Container, Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import InputSearch from './InputSearch';

/*IMAGES*/
import img1 from '../assets/images/screen-main.jpg';
import img2 from '../assets/images/where-to-go.png';
import img3 from '../assets/images/events-screen.jpg';
import imgLogo from '../assets/images/logo.svg';

export const useStyles = makeStyles((theme) => ({
    banner: {
        display: 'flex',
        alignItems: 'center',         
        backgroundSize: 'cover', 
        color: theme.palette.text.white,
        height: '460px',
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            background: theme.palette.background.bgOpacity2,
            position: 'absolute',
            top: '0',
            left: '0'
        }
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
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        overflow: 'hidden',
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(8)
    },
    phone: {
        display: 'flex',
        alignItems: 'center',
    },
    phoneNumber: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export default function Banner({ data, callbacks }) {
    const rest = new RestApi();
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();
    
    const {pageImage, pageSlogan} = useSelector(state => state.excursionManager);
    const {whereToGoBanner, eventBanner, whereToGoSlogan, eventSlogan} = useSelector(state => state.catalog);
    const {banner, slogan} = useSelector(state => state.mainPage);
    const inputClear = useSelector(state => state.keyboard.keyboard);
    const host = rest.host;
    
    let title = '';    
    let img = img1;

    switch(location.pathname) {
        case '/excursion':
        case '/excursion/':
            title = pageSlogan ? pageSlogan : 'Лучшие экскурсии';
            img = pageImage ? host + pageImage  : img1;
            break;
        case '/events':
        case '/events/':
            title = eventSlogan ? eventSlogan : 'СОБЫТИЯ';
            img = eventBanner ? host + eventBanner : img3;
            break;
        case '/where-to-go':
        case '/where-to-go/':
            title = whereToGoSlogan ? whereToGoSlogan : 'Куда сходить';
            img = whereToGoBanner ? host + whereToGoBanner : img2;
            break;
        default:
            img = banner ? host + banner : img1;
            title = slogan ? slogan : 'Начни свой visit в Сочи'
    }

    const clearInputSearch = async( ) => {
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
        await dispatch(setInputKeyboardSearch(''));
        await dispatch(closeSearch());
        await dispatch(setActiveTab(0));
        if (inputClear.hasOwnProperty('clearInput')) inputClear.clearInput("default");
    }
    
    return (
        <Box className={ classes.banner } sx={{background: `url(${img}) center center no-repeat`}}>
            <Container maxWidth="md" className={ classes.container }>
                <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center" 
                    className={ classes.headerInner }
                >
                    <Link to="/mainpage" onClick={ clearInputSearch }><Box component="div" className={ classes.logo }></Box></Link>
                    <Box component="div" className={ classes.phone }>
                        <Typography variant="h1" className={ classes.subtitle } style={{textAlign: 'center'}}>{Parser(decodeHtml(title))}</Typography>
                    </Box>
                    <InputSearch data={ data } callbacks={data.callbacks} keyboardCallback={data.keyboardCallback} />
                </Stack>
            </Container>
        </Box>
    )
}