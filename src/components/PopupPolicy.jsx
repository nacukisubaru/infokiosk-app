/*REACT*/
import React from 'react';
import ReactHtmlParser from 'html-react-parser';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { togglePolicyPopup } from '../redux/actions/excursionActions';

/*MUI*/
import { Modal, Slide, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*ICONS*/
import SvgClose from './Icons/SvgClose';

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
        textAlign: 'left',
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
    text: {
        padding: "20px 0",
        '& a': {
            textDecoration: 'none !important',
            color: theme.palette.text.primary,
            pointerEvents: 'none'
        }
    }
}));

export default function PopupPolicy({ options }) {  
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const open = useSelector(state => state.excursionManager.policyPopup);
    const policy = useSelector(state => state.app.policy);
    const agreement = useSelector(state => state.app.agreement.text);
    const agreementEx = useSelector(state => state.app.agreementExcursion.text);

    const handleClose = () => dispatch(togglePolicyPopup(false));   
    
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
                        <div className={ classes.text }>
                            {options.policy && (                                
                                ReactHtmlParser(policy)                                
                            )}
                            {options.privacy && (
                                ReactHtmlParser(agreement)
                            )}
                            {options.oferta && (
                                ReactHtmlParser(agreementEx)
                            )}
                        </div>         
                    </Box> 
                </Box>
            </Slide>
        </Modal>    
    )
}