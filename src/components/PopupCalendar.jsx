/*REACT*/
import React from 'react';

/*HELPERS*/
import moment from 'moment';
import 'moment/locale/ru';

/*MUI*/
import { Modal, Box, Typography, Stack, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

/*ICONS*/
import SvgClose from './Icons/SvgClose';

export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        background: theme.palette.background.default,
        boxShadow: theme.shadows[5],
        borderRadius: 50,
        border: 'none',
        outline: 'none'
    },
    modalHeader: {
        padding: '30px 30px 20px',
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
        padding: '0 50px 60px',
    },
    modalFooter: {        
        marginTop: 50
    }
}));

export default function PopupCalendar({ options, disableDates = (day)=> {}, userActiveCallback = () => {} }) {
    const classes = useStyles();

    const disableDays = (day) => {
        return disableDates(day);
    }

    const handleModalClick = () => {
        options.data.hasOwnProperty('onClickModal') && options.data.onClickModal();
        userActiveCallback();
    }

    return (
        <Modal
            open={ options.data.open }
            onClose={ options.data.handlerClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={handleModalClick}
        >
            <Box className={ classes.modal }>
                <Box className={ classes.modalHeader }>
                    <div className={ classes.modalClose } onClick={ options.data.handlerClose }>
                        <SvgClose />
                    </div>                                    
                </Box>

                <Box className={ classes.modalBody }>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <StaticDatePicker 
                            label="Basic example"
                            value={ options.value }
                            onChange={ options.data.onChangeHandler }
                            renderInput={(params) => <TextField {...params} />}
                            displayStaticWrapperAs="desktop"
                            minDate={ moment() }
                            maxDate={ moment().add(3, 'M') }
                            shouldDisableDate={disableDays}
                        />
                    </LocalizationProvider>
                    <Stack 
                        spacing={5} 
                        direction="row" 
                        justifyContent="center"
                        alignItems="center" 
                        className={ classes.modalFooter }
                    >
                        <Button variant="outlined" onClick={ options.data.resetHandler }>
                            <Typography variant="button2">СБРОСИТЬ</Typography>
                        </Button>
                        <Button variant="contained" onClick={ options.data.searchHandler }>
                            <Typography variant="button2">Применить</Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>    
    )
}