/*REACT*/
import React, { useEffect, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';

/*MUI*/
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*STYLES*/
import 'react-simple-keyboard/build/css/index.css';
import "../KeyboardCustom/index.css";
import { useValidatePhone } from '../../hooks/authHooks';

export const useStyles = makeStyles((theme) => ({
    keyboardWrap: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 80,
        width: '100%',
        height: 565,
        background: theme.palette.background.keyboard,
        borderRadius: '50px 50px 0 0',
        position: 'fixed',        
        bottom: 0,
        left: 0,
        zIndex: 100,
        transition: 'bottom 0.5s ease',
        '&.close': {
            bottom: '-100%'
        }
    },
    keyboardWrapClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 565,
        background: theme.palette.background.keyboard,
        borderRadius: '50px 50px 0 0',
        position: 'fixed',        
        bottom: '-100%',
        left: 0,
        zIndex: 100,
        transition: 'bottom 0.5s ease',
    },
}));

export default function KeyboardNumber({ props, activeUserCallback = ()=>{} }) {
    const keyboard = useRef();
    const rootEl = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const defaultLayout = useSelector(state => state.keyboard.layoutNumber);
    const layout = props.arrows ? defaultLayout : 'disArrows';
    const inputTel = useSelector(state => state.keyboard.inputTel);
    const validatePhone = useValidatePhone(true);

    useEffect(() => {
        const onClick = e => {
            if (rootEl.current) {
                if (!(rootEl.current.contains(e.target) || e.target.getAttribute('type') === 'tel' || e.target.getAttribute('name') === 'code' ||  e.target.innerText === 'ИЗМЕНИТЬ НОМЕР ТЕЛЕФОНА')) {
                    dispatch(props.closeHandler());
                }
            }
   
            if(e.target.innerText === 'ИЗМЕНИТЬ НОМЕР ТЕЛЕФОНА') {
                props.hasOwnProperty('setFocus') && props.setFocus();
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        if(props.open) {
            keyboard.current.keyboardDOM.parentNode.addEventListener("mousedown", (e) => {
                e.preventDefault();
            }); 
            keyboard.current.keyboardDOM.parentNode.addEventListener("touchstart", (e) => {
                e.preventDefault();
            }); 
        }
    }, [props.open, keyboard]);

    const handleCloseKeyboard = () => dispatch(props.closeHandler());

    const onChange = (input, e) => {  
        //перемещение курсора при вводе
        let $wrap, $input
        if (props.inputRef) {
            $wrap = props.inputRef.current.children[1];
            $input = $wrap.querySelector('input[name="phone"]'); 
        }

        if(props.hasOwnProperty("isSmsCode")) {
            if(props.isSmsCode && input.length === 6) {
                keyboard.current.setInput("");
            }
        } else {
            if (input.indexOf('+7') === -1) { //добавляем +7 для удобного счета
                input = '+7' + input;
            }
            setTimeout(() => {            
                if ((input.length >= 5) && (input.length < 7)) {                
                    $input.setSelectionRange(input.length + 4, input.length + 4);
                } else if ((input.length >= 7) && (input.length < 9)) {                
                    $input.setSelectionRange(input.length + 5, input.length + 5);
                } else if ((input.length >= 9) && (input.length < 13)) {
                    $input.setSelectionRange(input.length + 6, input.length + 6);
                } else {                
                    $input.setSelectionRange(input.length + 2, input.length + 2);
                }
                // setIndex($input.selectionStart);             
            });  
        }            
        
        dispatch(props.setInputValue(input));          
    } 

    const onBackspaceHandler = (inputNumber) => { 
        // const arr = inputNumber.split('');
   
        // if (inputNumber.length > 5 && inputNumber.length < 8) {
        //     arr.splice(index - 5, 1);
        // } else if (inputNumber.length > 7 && inputNumber.length < 10) {
        //     arr.splice(index - 6, 1);
        // } else if (inputNumber.length > 9 && inputNumber.length < 13) {
        //     arr.splice(index - 7, 1);
        // } else {
        //     arr.splice(index - 3, 1);
        // }

        // const newValue = arr.join('');
        const newValue = inputNumber.slice(0, -1);
        dispatch(props.setInputValue(newValue)); 
        keyboard.current.setInput(newValue);
    }  

    //пока оставить эти обработчики
    // const [index, setIndex] = useState(0);
    // const handleLeft = () => {
    //     const wrap = props.inputRef.current.children[1];
    //     const $input = wrap.querySelector('input[name="phone"]');
    //     $input.setSelectionRange($input.selectionStart - 1, $input.selectionEnd - 1);
    //     // setIndex($input.selectionStart);
    // }

    // const handleRight = () => {
    //     const wrap = props.inputRef.current.children[1];
    //     const $input = wrap.querySelector('input[name="phone"]');
    //     $input.setSelectionRange($input.selectionStart + 1, $input.selectionEnd + 1);
    //     // setIndex($input.selectionStart);
    // }

    const handleEnter = () => {
        if (inputTel) validatePhone.refetch();
    }

    const onKeyPress = (button) => {
        activeUserCallback();
        if (button === "{close}") handleCloseKeyboard();
        if (button === "{bksp}") onBackspaceHandler(props.input);
        if (button === "{enter}") handleEnter();
        // if(!props.hasOwnProperty("arrows")) {
        //     if (button === "{arrowleft}") handleLeft();
        //     if (button === "{arrowright}") handleRight();
        // }        
    };

    return (
        <>     
            <Box className={ props.open ? classes.keyboardWrap : classes.keyboardWrapClose } ref={rootEl}>
                <Keyboard
                    keyboardRef={ r => (keyboard.current = r) }
                    layoutName={ layout }
                    onChange={ (e, input) => onChange(e, input) }
                    onKeyPress={ onKeyPress }
                    layout={{
                        default: [
                            "1 2 3 {bksp}",
                            "4 5 6 {enter}",
                            "7 8 9 {numpadadd}",
                            "{arrowleft} 0 {arrowright} {close}"
                        ],
                        disArrows: [
                            "1 2 3 {bksp}",
                            "4 5 6 {enter}",
                            "7 8 9 {numpadadd}",
                            "{arrowleft} 0 {arrowright} {close}"
                        ]
                    }}
                    theme={"hg-theme-default hg-layout-default my-keyboard my-keyboard-number"}
                />
            </Box>            
        </>
    )
}