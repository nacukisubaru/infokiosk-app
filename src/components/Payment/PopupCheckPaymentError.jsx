/*REACT*/
import React from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { closePopupCheckError } from '../../redux/actions';

/*MUI*/
import { Modal, Slide, Box, Typography, Button, Stack, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px 3px 0px'
    },
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
    bodyText: {
        display: 'flex'
    },
    link: {
        color: theme.palette.primary.main
    },
}));

export default function PopupCheckPaymentError() {  
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.payment.checkError);     
    const navigate = useNavigate();

    const handleRedirectToSuccess = async () => {
        await dispatch(closePopupCheckError());
        navigate('/reservation-success');
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
                        
                        <Typography variant="h4" mb={13}>К сожалению во время оплаты произошла ошибка формирования чека.</Typography>
                        <Container maxWidth="md" className={ classes.container }>
                            <Typography variant="body1" mb={4} className={classes.bodyText}>Оплата вашего бронирования прошла успешно.</Typography>
                            <Typography variant="body1" mb={4} className={classes.bodyText} style={{marginBottom: '5px'}}>По вопросам получения чека необходимо обратиться в службу поддержки по</Typography>
                            <Typography variant="body1" mb={4} className={classes.bodyText} >телефону: <span className={ classes.link }>8-800-100-03-82</span></Typography>
                        </Container>
                        <Stack 
                            spacing={5} 
                            direction="row" 
                            justifyContent="center"
                            alignItems="center" 
                            mt={20}
                        >
                            <Button variant="contained" onClick={handleRedirectToSuccess}>
                                <Typography variant="button2">ПОНЯТНО</Typography>
                            </Button>
                        </Stack>               
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}