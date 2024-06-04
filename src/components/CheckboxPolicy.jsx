/*REACT*/
import React from 'react';

/*REDUX*/
import { useSelector, useDispatch } from 'react-redux';
import { checkBoxPolicy, disableBtnReservation, enableBtnReservation } from '../redux/actions';
import { setPolicyPopupOptions, togglePolicyPopup } from '../redux/actions/excursionActions';

/*MUI*/
import { makeStyles } from '@mui/styles';
import { Checkbox, FormGroup, Typography } from '@mui/material';

/*COMPONENTS*/
import PopupPolicy from './PopupPolicy';

export const useStyles = makeStyles((theme) => ({
    linkCheckbox: {
        color: '#7348FF',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}));

export default function CheckboxPolicy() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const checked = useSelector(state => state.app.checkBoxPolicy);
    const {showErrorTel, showErrorEmail, inputEmail, inputTel} = useSelector(state => state.keyboard);
    const popupOptions = useSelector(state => state.excursionManager.policyPopupOptions);

    const handlerToggleCheckBox = (e) => {        
        // const checked = e.target.checked;
        // if(checked === false) {
        //     dispatch(disableBtnReservation());
        // } else if(!showErrorTel && !showErrorEmail && inputEmail && inputTel) {
        //     dispatch(enableBtnReservation());
        // }
        // dispatch(checkBoxPolicy(checked));  

        !e.target.checked ? dispatch(checkBoxPolicy(true)) : dispatch(checkBoxPolicy(false));

        if(!showErrorTel && !showErrorEmail && inputEmail && inputTel && !checked) {
            dispatch(enableBtnReservation());
        } else {
            dispatch(disableBtnReservation());
        }   
    }     

    const handleOpenPopup = (obj) => {
        dispatch(togglePolicyPopup(true));
        dispatch(setPolicyPopupOptions(obj));
    }

    return (
        <>
            <FormGroup row={true} sx={{flexWrap: 'nowrap', alignItems: 'flex-start', marginBottom: '25px'}}>
                <Checkbox 
                    checked={checked}
                    onClick={handlerToggleCheckBox}                    
                />
                <Typography variant="body2" component="span">
                    Согласен с правилами обработки персональных, указанных в <span className={ classes.linkCheckbox } onClick={ () => handleOpenPopup({ privacy: true }) }>Согласии на обработку персональных данных</span> и <span className={ classes.linkCheckbox } onClick={ () => handleOpenPopup({ policy: true }) }>Политике конфиденциальности</span>, а также  с условиями <span className={ classes.linkCheckbox } onClick={ () => handleOpenPopup({ oferta: true }) }>Договора публичной оферты на оказание экскурсионных услуг  и условиями отмены бронирования</span>
                </Typography>
            </FormGroup>
            <PopupPolicy options={ popupOptions } />
        </>
    )    
};