/*REACT*/
import React, { useRef, useEffect } from "react";
import InputMask from "react-input-mask";

/*REDUX*/
import { useSelector } from "react-redux";

/*HOOKS*/
import { useValidatePhone } from "../hooks/authHooks";

/*MUI*/
import { TextField, Box } from "@mui/material";

/*COMPONENTS*/
import KeyboardNumber from "../components/KeyboardNumber/KeyboardNumber";
import InputMessage from "./InputMessage";

export default function InputPhone({ options, activeUserCallback = ()=>{} }) {
    const closeHandler = options.keyboard.closeHandler;

    const phone = useRef(null);
    const inputFocus = useRef();
    const validatePhone = useValidatePhone();

    const phoneRef = useSelector((state) => state.excursionManager.phoneRef);
    const isShow = useSelector((state) => state.keyboard.showErrorTel);
    const message = useSelector((state) => state.keyboard.errorTel);
    
    const style = {
        width: "100%",
        "& .MuiInput-root": {
            borderColor: "#F15D4C",
        },
    };

    useEffect(() => {
        if (phoneRef) {
            phone.current.focus();
        }
    }, [phoneRef]);

    options.keyboard.inputRef = phone;

    options.keyboard.closeHandler = () => {
        inputFocus.current.getInputDOMNode().blur();
        return closeHandler();
    }

    options.keyboard.setFocus = () => {
        return inputFocus.current.getInputDOMNode().focus();
    }

    options.keyboard.arrows = false;

    const inputProps2 = { autoComplete: 'off' }

    return (
        <Box sx={{ position: "relative" }}>
            <InputMask
                mask="+7 (999) 99 99 999"
                value={options.value}
                onClick={options.onClick}
                onBlur={(e) => {
                    validatePhone.refetch();
                }}
                ref={inputFocus}
            >
                {(inputProps) => (
                    <TextField
                        {...inputProps}
                        inputProps={ inputProps2 }
                        type="tel"
                        label={options.label}
                        variant="standard"
                        placeholder={options.placeholder}
                        name={options.name}
                        sx={isShow ? style : { width: "100%" }}
                        ref={phone}
                    />
                )}
            </InputMask>
            <InputMessage props={{ message, isShow }}></InputMessage>
            <KeyboardNumber props={options.keyboard} activeUserCallback={activeUserCallback}/>
        </Box>
    );
}
