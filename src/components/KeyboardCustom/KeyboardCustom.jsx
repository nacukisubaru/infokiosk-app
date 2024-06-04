/*REACT*/
import React, { useEffect, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';
import { closeSearch, setClickFilter, setCountPage, unsetClickFilter } from '../../redux/actions/excursionActions';
import { setInputKeyboardSearch, setOpenRecommend, toggleSearchPopup } from '../../redux/actions';
import { useValidateEmail } from '../../hooks/authHooks';

/*MUI*/
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

/*STYLES*/
import 'react-simple-keyboard/build/css/index.css';
import "./index.css";

export const useStyles = makeStyles((theme) => ({
    keyboardWrap: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 40,
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

export default function KeyboardCustom({ props, activeUserCallback = ()=>{} }) {
    const keyboard = props.keyboardRef;
    const layout = props.layout;  
    const el = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const validateEmail = useValidateEmail();
    const inputEmail = useSelector(state => state.keyboard.inputEmail);
    const inputSearch = useSelector(state => state.keyboard.inputSearch); 
    
    useEffect(() => {
        const onClick = e => {
            if (el.current) {
                if (!(el.current.contains(e.target) || e.target.getAttribute('type') === 'text')) {
                    dispatch(props.closeHandler());
                }
            }            
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const handlerSaveFocus = (e) => e.preventDefault();

    useEffect(() => {
        if(props.open) {
            keyboard.current.keyboardDOM.parentNode.addEventListener("mousedown", handlerSaveFocus);  
            keyboard.current.keyboardDOM.parentNode.addEventListener("touchstart", handlerSaveFocus);  
        }
    }, [props.open, keyboard]);

    const keyboardOptions = {
        layout: {
            default: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                "q w e r t y u i o p _ .",
                '- a s d f g h j k l {enter}',
                "{shiftLeft} @ z x c v b n m  {arrowleft} {arrowright}",                        
                "{langRu} {space} {close}"
            ],
            shift: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                "Q W E R T Y U I O P _ .",
                "- A S D F G H J K L {enter}",
                "{shiftLeft} @ Z X C V B N M  {arrowleft} {arrowright}",
                "{langRu} {space} {close}"
            ],
            lang: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                "й ц у к е н г ш щ з х ъ",
                'ф ы в а п р о л д ж э {enter}',
                "{shiftRight} я ч с м и т ь б ю {arrowleft} {arrowright}",
                "{lang} - {space} {close}"
            ],
            langShift: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                "Й Ц У К Е Н Г Ш Щ З Х Ъ",
                'Ф Ы В А П Р О Л Д Ж Э {enter}',
                "{shiftRight} Я Ч С М И Т Ь Б Ю {arrowleft} {arrowright}",
                "{lang} - {space} {close}"
            ]
        },
        display: {
            "{lang}": "EN",
            "{langRu}": "RU",
        }
    }

    const handleCloseKeyboard = () => dispatch(props.closeHandler());

    const handleEnter = async () => {
        if (!inputSearch) {
            await validateEmail.goValidate(inputEmail, true);
        } else {
            handleCloseKeyboard();
        }
        if (props.enterHandler) props.enterHandler();
    }

    const onChange = async (input) => {
        dispatch(props.setInputValue(input));

        if (props.hasOwnProperty('listUpd')) {
            if (input === '') {
                dispatch(toggleSearchPopup(true));
                await dispatch(setCountPage(1));
                dispatch(setClickFilter());
                dispatch(setInputKeyboardSearch(''));      
                dispatch(closeSearch());
                dispatch(setOpenRecommend()); 
                if (props.listUpd) await props.listUpd();                
                dispatch(unsetClickFilter());
                keyboard.current.clearInput("default");
                dispatch(toggleSearchPopup(false));
            }
        }        
    }

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        dispatch(props.setLayout(newLayoutName));
    };

    const handleShiftRight = () => {
        const newLayoutName = layout === "lang" ? "langShift" : "lang";
        dispatch(props.setLayout(newLayoutName));
    };

    const handleLang = () => {
        const newLayoutName = layout === "default" ? "lang" : "default";
        dispatch(props.setLayout(newLayoutName));
    };

    const handleLangRu = () => {
        const newLayoutName = (layout === "shift" || layout === "default") ? "lang" : "default";
        dispatch(props.setLayout(newLayoutName));
    };

    const handleLeft = () => {
        const input = keyboard.current.activeInputElement;
        input.setSelectionRange(input.selectionStart - 1, input.selectionEnd - 1);
    }

    const handleRight = () => {
        const input = keyboard.current.activeInputElement;
        input.setSelectionRange(input.selectionStart + 1, input.selectionEnd + 1);
    }
    
    const onKeyPress = button => {
        activeUserCallback();
        if (button === "{shiftLeft}") handleShift();
        if (button === "{shiftRight}") handleShiftRight();
        if (button === "{lang}") handleLang();
        if (button === "{langRu}") handleLangRu();
        if (button === "{close}") handleCloseKeyboard();
        if (button === "{arrowleft}") handleLeft();
        if (button === "{arrowright}") handleRight();
        if (button === "{enter}") handleEnter();
    };   
    
    return (
        <>     
            <Box className={ props.open ? classes.keyboardWrap : classes.keyboardWrapClose } ref={el}>
                <Keyboard
                    keyboardRef={ r => (keyboard.current = r) }
                    layoutName={ layout }
                    onChange={ onChange }
                    onKeyPress={ onKeyPress }
                    {...keyboardOptions}
                    theme={"hg-theme-default hg-layout-default my-keyboard"}
                />
            </Box>            
        </>
    )
}