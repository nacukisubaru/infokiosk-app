/*REACT*/
import React, { useEffect } from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { setQuotasMessage, setLimitPeopleQuota } from '../redux/actions';

/*MUI*/
import { makeStyles } from '@mui/styles';
import { TextField, Box } from '@mui/material';

/*ICONS*/
import SvgMinus from '../components/Icons/SvgMinus';
import SvgPlus from '../components/Icons/SvgPlus';

export const useStyles = makeStyles((theme) => ({
    inputNumWrap: {
        position: 'relative',
        width: '315px',
        '& .MuiInput-input': {
            textAlign: 'center'
        }
    },
    inputNumMinus: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 8,
        left: 17,
        zIndex: 1,
        border: 'none',
        background: theme.palette.background.default,
        cursor: 'pointer',
        '& svg': {
            stroke: theme.palette.primary.main
        },
        '&[disabled] svg': {
            stroke: theme.palette.text.placeholder
        }
    },
    inputNumPlus: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 8,
        right: 17,
        zIndex: 1,
        border: 'none',
        background: theme.palette.background.default,
        cursor: 'pointer',
        '& svg': {
            stroke: theme.palette.primary.main
        },
        '&[disabled] svg': {
            stroke: theme.palette.text.placeholder
        }
    }
}));

export default function InputNum({ options }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const stateLimitPeople = useSelector((state) => state.inputNumber.limitPeople);
    const limitPeopleQuota = useSelector((state) => state.inputNumber.limitPeopleQuota);
    const quotasMess = useSelector((state) => state.inputNumber.quotasMessage);
    const min = options.min;
    const max = 50;  

    useEffect(() => {
        dispatch(setLimitPeopleQuota(stateLimitPeople - 1));
    }, [stateLimitPeople, dispatch]);

    const minusHandler = (e) => {
        e.preventDefault();
        let val = parseInt(options.value);

        if (val < min) val = min;
        dispatch(options.setValue(val - 1));
        dispatch(options.setValueTotal());
        dispatch(setLimitPeopleQuota(limitPeopleQuota + 1));
        if (!quotasMess) dispatch(setQuotasMessage(true));
    }

    const plusHandler = (e) => {
        e.preventDefault();
        let val = parseInt(options.value);

        if (val > max) val = max;
        dispatch(options.setValue(val + 1));
        dispatch(options.setValueTotal());
        dispatch(setLimitPeopleQuota(limitPeopleQuota - 1));
        if (!quotasMess) dispatch(setQuotasMessage(true));
    }

    return (
        <Box className={ classes.inputNumWrap }>
            <button onClick={ minusHandler } className={ classes.inputNumMinus } disabled={ options.disabledBtnMinus }>
                <SvgMinus />
            </button>
            <TextField
                fullWidth
                type="number"
                inputProps={{ min, max }}
                value={ options.value }
                variant="standard"
                label={ options.label }
                name={ options.name }
            />
            <button onClick={ plusHandler } className={ classes.inputNumPlus } disabled={ options.disabledBtnPlus }>
                <SvgPlus />
            </button>
        </Box>
    )    
};