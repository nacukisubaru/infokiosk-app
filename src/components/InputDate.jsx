/*REACT*/
import React, { useEffect } from 'react';
import moment from 'moment';

/*REDUX*/
import { Box, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*COMPONENTS*/
import PopupCalendar from './PopupCalendar';

/*IMAGES*/
import SvgDate from '../components/Icons/SvgDate';

export const useStyles = makeStyles((theme) => ({
    inputDateWrap: {
        position: 'relative',
        minWidth: '315px',
    },
    inputDate: {
        display: 'block',
        width: '22px',
        height: '22px',
        position: 'absolute',
        bottom: '22px',
        right: '30px',
        fill: 'transparent',
        stroke: theme.palette.primary.main
    },
    inputDateSmall: {
        display: 'block',
        width: '22px',
        height: '22px',
        position: 'absolute',
        bottom: '17px',
        right: '30px',
        fill: 'transparent',
        stroke: theme.palette.primary.main
    },
    inputSmall: {
        '& input': {
            padding: '9px 30px',
        }
    }
}));

export default function InputDate({ options, disableDates = () => {}, userActiveCallback = () => {}, small }) {
    const classes = useStyles();

    let valueInput = '';
    if (options.value !== '') valueInput = moment(options.value._d).format('DD.MM.YYYY');
    
    const inputProps = { readOnly: true }
    
    useEffect(()=>{
        userActiveCallback();
    }, []);

    return (
        <>
            <Box className={ classes.inputDateWrap }>
                <TextField 
                    id="outlined" 
                    label={ options.label ? "Выберите дату" : "" }
                    value={ valueInput }
                    variant="standard" 
                    placeholder="Выберите дату" 
                    inputProps={ inputProps }
                    onClick={ options.handleOpen }
                    // onChange = { (event)=>{options.onChange(event)} }
                    name="date"
                    className={small && classes.inputSmall}
                />
                <SvgDate className={ small ? classes.inputDateSmall : classes.inputDate } />                
            </Box>
            <PopupCalendar options={{ data: options.popupData, value: options.value }} disableDates={disableDates}  userActiveCallback={userActiveCallback}/>
        </>
        
    )    
}