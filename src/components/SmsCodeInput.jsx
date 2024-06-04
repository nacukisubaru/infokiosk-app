/*REACT*/
import React, { useRef, useEffect } from "react";

/*REDUX*/
import { useDispatch, useSelector } from "react-redux";
import { openVerifyKeyboard, closeVerifyKeyboard, setSmsCode } from "../redux/actions";

/*HOOKS*/
import { useAuthUserByPhoneWithVerifyRequestStepTwo } from "../hooks/authHooks";

/*MUI*/
import { makeStyles } from "@mui/styles";
import { TextField, Stack, Typography, Box } from '@mui/material';

/*COMPONENTS*/
import KeyboardNumber from "./KeyboardNumber/KeyboardNumber";

export const useStyles = makeStyles((theme) => ({
    codeWrap: {
        position: 'relative'
    },
    input: {
        maxWidth: 115,
        "& input": {
            height: 115,
            boxSizing: 'border-box',
            textAlign: 'center',
            fontSize: "40px",
            fontWeight: 700,
            color: theme.palette.primary.main,
            borderRadius: 30
        },
        "& input:focus": {
            '-webkit-box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
            '-moz-box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
            'box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)'
        }
    },
    inputError: {
        maxWidth: 115,
        "& .MuiInput-root": {
            borderColor: theme.palette.primary.red
        },
        "& input": {
            height: 115,
            boxSizing: 'border-box',
            textAlign: 'center',
            fontSize: "40px",
            fontWeight: 700,
            color: theme.palette.primary.red,
            borderRadius: 30
        },
        "& input:focus": {
            '-webkit-box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
            '-moz-box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)',
            'box-shadow': '0px 4px 10px rgba(115, 72, 255, 0.5)'
        }
    },
    error: {
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: theme.palette.primary.red,
    }
}));

export default function SmsCodeInput() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const firstInput = useRef();
    const authStepTwo = useAuthUserByPhoneWithVerifyRequestStepTwo().refetch;

    const input = useSelector(state => state.smsVerify.smscode);
    const isCorrectCode = useSelector(state => state.smsVerify.incorrectCode);
    
    const inputValue1 = input.slice(0, 1);
    const inputValue2 = input.slice(1, 2);
    const inputValue3 = input.slice(2, 3);
    const inputValue4 = input.slice(3, 4);
    const inputValue5 = input.slice(4, 5);
    const inputValue6 = input.slice(5, 6);
    
    const handleOpenKeyboardNumber = () => {
        dispatch(openVerifyKeyboard());
        firstInput.current.focus();
    }
    
    useEffect(()=>{
        if(input.length === 6) {
            authStepTwo();
        }
    }, [input, authStepTwo])
    
    const keyboard = {
        input: input,
        open: useSelector(state => state.smsVerify.keyboard),
        closeHandler: closeVerifyKeyboard,
        setInputValue: setSmsCode,
        isSmsCode: true
    }

    return (
        <Box className={ classes.codeWrap }>
            {!isCorrectCode && <Typography variant="body1" className={ classes.error }>Неверный код подтверждения</Typography>}
            <Stack 
                spacing={5} 
                direction="row" 
                justifyContent="center"
                alignItems="center"
            >
                <input name="smscode" value={ input } type="hidden" />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"                    
                    onClick={ handleOpenKeyboardNumber }                    
                    value={ inputValue1 }
                    inputRef={ firstInput }
                    name='code'
                />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"
                    onClick={ handleOpenKeyboardNumber }
                    value={ inputValue2 }
                    name='code'
                />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"
                    onClick={ handleOpenKeyboardNumber }
                    value={ inputValue3 }
                    name='code'
                />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"
                    onClick={ handleOpenKeyboardNumber }
                    value={ inputValue4 }
                    name='code'
                />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"
                    onClick={ handleOpenKeyboardNumber }
                    value={ inputValue5 }
                    name='code'
                />
                <TextField
                    className={ isCorrectCode ? classes.input : classes.inputError }
                    id="outlined"
                    variant="standard"
                    onClick={ handleOpenKeyboardNumber }
                    value={ inputValue6 }
                    name='code'
                />
            </Stack>
            <KeyboardNumber props={ keyboard } />
        </Box>
    );
}
