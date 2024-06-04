/*REACT*/
import React from 'react';

/*REDUX*/
import { useSelector } from 'react-redux';

/*MUI*/
import { Modal, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import Loading from '../Loading';

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

export default function PopupPayment() {
    const classes = useStyles();
    const open = useSelector(state => state.payment.openPayment);

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={ classes.modal }>                
                <Box className={ classes.modalBody }>
                    <Typography variant="h4" mb={5}>Пожалуйста, подождите.</Typography>
                    <Typography variant="body1">Производится оплата.</Typography>
                    <Loading />
                </Box>
            </Box>
        </Modal>    
    )
}