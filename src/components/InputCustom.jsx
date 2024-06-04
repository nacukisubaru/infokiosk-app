/*REACT*/
import React, {useRef} from 'react';
import PropTypes from "prop-types";

/*MUI*/
import { TextField, Box } from '@mui/material';

/*COMPONENTS*/
import KeyboardCustom from '../components/KeyboardCustom/KeyboardCustom';
import InputMessage from './InputMessage';
function InputCustom({ options, activeUserCallback = () => {} }) {
    const closeHandler = options.keyboard.closeHandler;
    const inputFocus = useRef();

    const style = {
        width: '100%',
        '& .MuiInput-root': {
            borderColor: '#F15D4C',            
        }        
    }

    options.keyboard.closeHandler = () => {
        document.getElementById("standard-input-email").blur();
        return closeHandler();
    }

    const inputProps = { autoComplete: 'off' }

    return (
        <Box sx={{ position: 'relative' }}>
            <TextField 
                id={ "standard-input-" + options.name }
                label={ options.label }
                variant="standard" 
                placeholder={ options.placeholder }
                value={ options.value }
                onClick={ options.onClick }
                name={ options.name }
                sx={options.isShowError ? style : {width: "100%"}}
                onBlur={options.onBlur}
                ref={inputFocus}
                inputProps={ inputProps }
            />
            <InputMessage props={{message: options.message, isShow: options.isShowError}}></InputMessage>
            <KeyboardCustom props={ options.keyboard } activeUserCallback={activeUserCallback} />
        </Box>
        
    )    
};

InputCustom.propTypes = {
    options: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }),
};

export default InputCustom;