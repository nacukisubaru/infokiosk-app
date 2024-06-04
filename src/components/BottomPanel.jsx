/*REACT*/
import React from 'react';
import { Link } from "react-router-dom";

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { setComeBackToList } from '../redux/actions';

/*MUI*/
import { Typography, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    panel: {        
        position: 'fixed',
        left: '0',
        bottom: '70px',
        width: '100%',
        padding: '40px 0 80px',
        background: theme.palette.background.default,
        zIndex: 2
    },
    link: {
        textDecoration: 'none'
    },
    btnDisabled: {
        '&:hover': {
            background: '#B9B9B9',
            color: '#ffffff',
            boxShadow: 'none'
        },
        '&:active': {
            boxShadow: 'none'
        },
        background: '#B9B9B9',
        color: '#ffffff'
    }
}));

export default function BottomPanel({ data, bottom }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tabsValue = useSelector((state) => state.excursionManager.tabsValue);

    const clickComeBack = () => {
       dispatch(setComeBackToList(true));
       data[0].handler();
    }

    return (
        <Stack 
            spacing={5} 
            direction="row" 
            justifyContent="center"
            alignItems="center" 
            className={ classes.panel }
            sx={bottom && {bottom: bottom}}
        >
            {data.map((item, index) => {
                if (item.url) {
                    return (
                        <Link key={ index } to={ item.url } onClick={ clickComeBack } className={ classes.link }>
                            <Button variant={ item.variant } disabled={ item.disabled }>
                                <Typography variant="button2">{ item.name }</Typography>
                            </Button>
                        </Link>
                    );
                } else {
                    return (
                        <Button 
                            key={ index } 
                            variant={ item.variant } 
                            onClick={ item.handler } 
                            className={ (tabsValue !== 0 && item.disabled) ? classes.btnDisabled : '' }
                            disabled={ (tabsValue === 0 && item.disabled) && item.disabled }
                        >
                        {/* <Button key={ index } variant={ item.variant } onClick={ item.handler } disabled={ item.disabled }> */}
                            <Typography variant="button2">{ item.name }</Typography>
                        </Button>
                    )                    
                }                
            })}
        </Stack>
    )
}