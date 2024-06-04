/*REACT*/
import React from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { setSnack } from '../../redux/actions/reducerActions';

/*MUI*/
import { Modal, Slide, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*IMAGES*/
import SvgClose from '../Icons/SvgClose';

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
        padding: '0 50px 50px',
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
    }
}));

export default function PopupErrorMessage({options}) {  
    const dispatch = useDispatch();
    const classes = useStyles();
    const open = useSelector(state => state.app.snackOpen);  
    const message = useSelector(state => state.app.message.name);  

    const handleClose = () => dispatch(setSnack(false));

    return (
        <Modal
            open={ open }
            onClose={ handleClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={()=>{options.hasOwnProperty('onClickModal') && options.onClickModal()}}
        >
            <Slide direction="up" in={ open } mountOnEnter unmountOnExit>
                <Box className={ classes.modal }>
                    <Box className={ classes.modalHeader }>
                        <div className={ classes.modalClose } onClick={ handleClose }>
                            <SvgClose />
                        </div>                                    
                    </Box>
                    
                    <Box className={ classes.modalBody }>
                        <Typography variant="h4" mb={15}>{message}</Typography>
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}