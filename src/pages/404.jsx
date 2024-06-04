/*REACT*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

/*MUI*/
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Typography } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: '30px',
        paddingRight: '30px',
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
        margin: '360px auto 42px',
        border: '2px solid rgba(0, 0, 0, 0.2)',
        fontSize: 140,
        fontWeight: 600,
        color: theme.palette.primary.main
    },
}));

export default function NotFound() {
    const classes = useStyles(); 
    const navigate = useNavigate();
 
    return (
        <>
            <Container maxWidth="md">
                <Box className={ classes.reservation }>404</Box>

                <Typography variant="h2" mb={20} className={ classes.center }>Страница не найдена</Typography>

                <Box className={ classes.center }>
                    <Button variant="contained" onClick={() => navigate(-1)}>НАЗАД</Button>
                </Box>
            </Container>
        </>
    )
}