/*REACT*/
import React from 'react';
import HTMLReactParser from 'html-react-parser';

/*HELPERS*/
import { decodeHtml } from '../helpers/stringHelper';

/*MUI*/
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import PopupSelect from './PopupSelect/PopupSelect';

/*ICONS*/
import arrowDown from '../assets/images/select-down.svg';

export const useStyles = makeStyles((theme) => ({
    select: {
        position: 'relative',
        width: '100%',
        '& input': {
            padding: '16px 50px 16px 30px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
        },        
        '&::after': {
            content: '""',
            display: 'block',
            width: '13px',
            height: '8px',
            background: `url(${arrowDown}) center center no-repeat`,
            backgroundSize: 'contain',
            position: 'absolute',
            bottom: '30px',
            right: '30px',
        },
        '& .MuiInputLabel-root[data-shrink=true]+.MuiInputBase-formControl .MuiInput-input::-webkit-input-placeholder': {
            opacity: '1!important'
        }
    },
    selectSmall: {
        position: 'relative',
        width: '100%',
        '& input': {
            padding: '9px 50px 9px 30px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
        },        
        '&::after': {
            content: '""',
            display: 'block',
            width: '13px',
            height: '8px',
            background: `url(${arrowDown}) center center no-repeat`,
            backgroundSize: 'contain',
            position: 'absolute',
            bottom: '23px',
            right: '30px',
        },
        '& .MuiInputLabel-root[data-shrink=true]+.MuiInputBase-formControl .MuiInput-input::-webkit-input-placeholder': {
            opacity: '1!important'
        }
    }
}));

export default function SelectCustom({ data, userActiveCallback = () => {}, small }) {
    const classes = useStyles();
    const inputProps = { readOnly: true }

    return (
        <>
            <TextField
                label={ data.label }
                value={ HTMLReactParser(decodeHtml(data.value)) }
                variant="standard"
                placeholder={ data.placeholder }
                onClick={ data.popupData.handlerOpen }
                className={ small ? classes.selectSmall : classes.select }
                inputProps={ inputProps }
            />
            <PopupSelect data={ data.popupData } userActiveCallback={userActiveCallback}/>
        </>
        
    )    
};