/*REACT*/
import React from 'react';
import DateObject from "react-date-object";

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

export default function PopupSearch() {
    const classes = useStyles();
    const open = useSelector(state => state.excursionManager.openSearchPopup);
    const date = useSelector(state => state.calendar.valueList);
    let dateNew = '';

    if (date === '') {
        dateNew = ''
    } else {
        const dateValue = new DateObject(date._d);
        dateNew = dateValue.format('DD.MM.YYYY');
    }

    return (
        <Modal
            open={ open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={ classes.modal }>                
                <Box className={ classes.modalBody }>
                    <Typography variant="h4" mb={5}>Пожалуйста, подождите.</Typography>
                    <Typography variant="body1">Выбираем лучшее для Вас!</Typography>
                    { date && <Typography variant="body1" mt={5} mb={15}>на { dateNew } г.</Typography> }
                    <Loading />
                </Box>
            </Box>
        </Modal>    
    )
}