/*REACT*/
import React from 'react';
import QRCode from "react-qr-code";

/*MUI*/
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    wrap: {
        paddingLeft: '83px',
        paddingRight: '83px',
    },
    title: {
        marginBottom: '60px',
        textAlign: 'center'
    },
    qr: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 46px',
        width: 460,
        height: 460,
        borderRadius: 50,
        border: '2px solid rgba(0, 0, 0, 0.2)',
    },
}));

export default function EventQr({ link, text }) {
    const classes = useStyles();

    return (
        <Box className={ classes.wrap }>
            <Typography variant="h4" className={ classes.title }>Покупка билетов по QR-коду</Typography>
            <Box className={ classes.qr }>
                <QRCode value={ link } />
            </Box>
            <Typography variant="body1" mb={4} className={ classes.text }>1. Наведите камеру телефона на QR-код и перейдите по ссылке на сайт {text.site}.</Typography>
            <Typography variant="body1" mb={4} className={ classes.text }>{text.text1}</Typography>
            <Typography variant="body1" mb={20} className={ classes.text }>3. Подтвердите покупку в приложении банка.</Typography>
        </Box>
    )
}