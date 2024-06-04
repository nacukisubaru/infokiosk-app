/*REACT*/
import React from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { togglePopupSupport } from '../redux/actions';

/*MUI*/
import { Modal, Slide, Box, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*ICONS*/
import SvgClose from './Icons/SvgClose';
import SvgPhone from './Icons/SvgPhone';
import SvgEmail from './Icons/SvgEmail';

export const useStyles = makeStyles((theme) => ({
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
        padding: '0 135px 50px',
        overflowX: 'hidden',
        overflowY: 'scroll',
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
    flex: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            fill: theme.palette.primary.main,
            marginRight: 10
        }
    }
}));

export default function PopupSupport() {  
    const dispatch = useDispatch();
    const classes = useStyles();
    const open = useSelector(state => state.app.popupSupport); 

    const handleClose = () => dispatch(togglePopupSupport());    

    return (
        <Modal
            open={ open }
            onClose={ handleClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Slide direction="up" in={ open } timeout={500} mountOnEnter unmountOnExit>
                <Box className={ classes.modal }>
                    <Box className={ classes.modalHeader }>
                        <div className={ classes.modalClose } onClick={ handleClose }>
                            <SvgClose />
                        </div>                                    
                    </Box>
                    
                    <Box className={ classes.modalBody }>
                        <Typography variant="h4" mb={5} sx={{ textAlign: 'center' }}>Служба поддержки</Typography>
                        <Typography variant="body1" mb={20} sx={{ textAlign: 'center' }}>с 09:00 до 18:00</Typography>

                        <Typography variant="h6" mb={11}>АНО “Агентство по развитию туризма в г.Сочи”</Typography>
                        <Typography variant="h6" mb={5}>Юридический адрес:</Typography>
                        <Typography variant="body1" mb={11}>354002, Краснодарский край, г Сочи, Депутатская ул, д. 9, помещ. 28</Typography>
                        <Typography variant="h6" mb={5}>Фактический адрес:</Typography>
                        <Typography variant="body1" mb={11}>354002, Краснодарский край, г Сочи, ул.Виноградная 20А</Typography>
                        
                        <Stack 
                            spacing={20} 
                            direction="row" 
                            justifyContent="start"
                            alignItems="center" 
                        >
                            <Box className={ classes.flex }>
                                <SvgEmail /> 
                                <Typography variant="body1">hello@visit-sochi.com</Typography>
                            </Box>
                            
                            <Box className={ classes.flex }>
                                <SvgPhone />
                                <Typography variant="body1"> 8-800-100-03-82</Typography>
                            </Box>                            
                        </Stack>
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}