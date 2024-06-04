/*REACT*/
import React from 'react';
import { Link } from "react-router-dom";
import Parser from "html-react-parser";

/*REDUX*/
import { useDispatch } from 'react-redux';
import { setCardPayment, setChoosePayment, setComeBackToList } from '../redux/actions';
import { setTagFiltered } from '../redux/actions/filterActions';

/*HELPERS*/
import { decodeHtml } from '../helpers/stringHelper';

/*MUI*/
import { Container, Stack, Box, Breadcrumbs } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*IMAGES*/
import imgLogo from '../assets/images/logo-sm.svg';

/*COMPONENTS*/
import Clock from './Clock';
import WeatherWidjet from './WeatherWidjet';

export const useStyles = makeStyles((theme) => ({
    header: {
        background: theme.palette.primary.main,
        color: theme.palette.text.white,
        padding: '12px 0'
    },
    logo: {
        width: '155px',
        height: '30px',
        background: `url(${imgLogo}) center center no-repeat`,
        backgroundSize: 'contain',        
    },
    breadcrumb: {
        display: '-webkit-box',     
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        overflow: 'hidden',
        color: theme.palette.text.green,
        fontSize: 32,
        fontWeight: 600,
        textTransform: 'uppercase',
        width: '588px'
    },
    clock: {
        "& .MuiOutlinedInput-input": {
            boxSizing: 'border-box',
            height: 'auto',
            padding: 0,
            color: theme.palette.text.white,
            fontSize: 32,
            fontWeight: 700,
            width: 100,
            textAlign: 'center',
            pointerEvents: 'none'
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: 'none'
        }
    },
    weather: {
        position: 'relative'
    },
    delimiter: {
        display: 'block',
        width: 3,
        height: 56,
        background: theme.palette.background.default,
        margin: '0 20px'
    }
}));

export default function Header({data}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const clickComeBackToList = () => {
        dispatch(setTagFiltered(false)); 
        dispatch(setComeBackToList(false));
        if (data.payment) setPaymentPage();
    }

    const setPaymentPage = () => {
        dispatch(setChoosePayment(true)); 
        dispatch(setCardPayment(false));
    }

    return (
        <header className={ classes.header }>
            <Container maxWidth="md">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {data.logoLink ?
                        <Link to="/" onClick={clickComeBackToList}><Box component="div" className={ classes.logo }></Box></Link> :
                        <Box component="div" className={ classes.logo }></Box>
                    }                    
                    <Breadcrumbs aria-label="breadcrumb" style={{textAlign: 'center'}}>
                        {data.logoLink ?
                            <Link to={data.url} aria-current="page" onClick={clickComeBackToList} className={ classes.breadcrumb }>
                                {Parser(decodeHtml(data.title))}
                            </Link> :
                            <span className={ classes.breadcrumb }>{Parser(decodeHtml(data.title))}</span>
                        }
                    </Breadcrumbs>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" className={ classes.weather }>
                        <Clock />
                        <span className={ classes.delimiter }></span>
                        <WeatherWidjet />
                    </Stack>
                </Stack>
            </Container>
        </header>
    )
}