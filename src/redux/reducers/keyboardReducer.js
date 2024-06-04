export const OPEN_KEYBOARD = 'KEYBOARD/OPEN_KEYBOARD';
export const CLOSE_KEYBOARD = 'KEYBOARD/CLOSE_KEYBOARD';
export const SET_INPUT = 'KEYBOARD/SET_INPUT';
export const SET_LAYOUT = 'KEYBOARD/SET_LAYOUT';

export const OPEN_KEYBOARD_NUMBER = 'KEYBOARD/OPEN_KEYBOARD_NUMBER';
export const CLOSE_KEYBOARD_NUMBER = 'KEYBOARD/CLOSE_KEYBOARD_NUMBER';
export const SET_INPUT_NUMBER = 'KEYBOARD/SET_INPUT_NUMBER';
export const SET_LAYOUT_NUMBER = 'KEYBOARD/SET_LAYOUT_NUMBER';

export const OPEN_KEYBOARD_EMAIL = 'KEYBOARD/OPEN_KEYBOARD_EMAIL';
export const CLOSE_KEYBOARD_EMAIL = 'KEYBOARD/CLOSE_KEYBOARD_EMAIL';
export const SET_INPUT_EMAIL = 'KEYBOARD/SET_INPUT_EMAIL';
export const SET_LAYOUT_EMAIL = 'KEYBOARD/SET_LAYOUT_EMAIL';

export const OPEN_KEYBOARD_TEL = 'KEYBOARD/OPEN_KEYBOARD_TEL';
export const CLOSE_KEYBOARD_TEL = 'KEYBOARD/CLOSE_KEYBOARD_TEL';
export const SET_INPUT_TEL = 'KEYBOARD/SET_INPUT_TEL';
export const SET_ERROR_TEL = 'KEYBOARD/SET_ERROR_TEL';
export const SET_ERROR_EMAIL = 'KEYBOARD/SET_ERROR_EMAIL';
export const SET_ERROR_EMAIL_EXIST = 'KEYBOARD/SET_ERROR_EMAIL_EXIST';
export const SET_ERROR_EMAIL_MESSAGE = 'KEYBOARD/SET_ERROR_EMAIL_MESSAGE';

export const OPEN_KEYBOARD_SEARCH = 'KEYBOARD/OPEN_KEYBOARD_SEARCH';
export const CLOSE_KEYBOARD_SEARCH = 'KEYBOARD/CLOSE_KEYBOARD_SEARCH';
export const SET_INPUT_SEARCH = 'KEYBOARD/SET_INPUT_SEARCH';
export const SET_LAYOUT_SEARCH = 'KEYBOARD/SET_LAYOUT_SEARCH';
export const SET_KEYBOARD = 'KEYBOARD/SET_KEYBOARD';
export const SET_TOOLTIP = 'KEYBOARD/SET_TOOLTIP';

const initialState = {    
    openKeyboard: false,
    input: '',
    layout: 'default',
    openKeyboardNumber: false,
    inputNumber: '',
    layoutNumber: 'default',
    openKeyboardEmail: false,
    inputEmail: '',
    layoutEmail: 'default',
    openKeyboardTel: false,
    inputTel: '',
    errorTel: 'Некорректный номер телефона',
    errorEmail: 'Некорректный адрес электронной почты',
    errorEmailExist: false,
    showErrorTel: false,
    showErrorEmail: false,
    openKeyboardSearch: false,
    inputSearch: '',
    layoutSearch: 'lang',
    keyboard: {},
    tooltip: false
}

export const keyboardReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_KEYBOARD:
            return { ...state, openKeyboard: true }
        case CLOSE_KEYBOARD:
            return { ...state, openKeyboard: false }
        case SET_INPUT:
            return { ...state, input: action.payload }
        case SET_LAYOUT:
            return { ...state, layout: action.payload }
        case OPEN_KEYBOARD_NUMBER:
            return { ...state, openKeyboardNumber: true }
        case CLOSE_KEYBOARD_NUMBER:
            return { ...state, openKeyboardNumber: false }
        case SET_INPUT_NUMBER:
            return { ...state, inputNumber: action.payload }
        case OPEN_KEYBOARD_EMAIL:
            return { ...state, openKeyboardEmail: true }
        case CLOSE_KEYBOARD_EMAIL:
            return { ...state, openKeyboardEmail: false }
        case SET_INPUT_EMAIL:
            return { ...state, inputEmail: action.payload }
        case SET_LAYOUT_EMAIL:
            return { ...state, layoutEmail: action.payload }
        case OPEN_KEYBOARD_TEL:
            return { ...state, openKeyboardTel: true }
        case CLOSE_KEYBOARD_TEL:
            return { ...state, openKeyboardTel: false }
        case SET_INPUT_TEL:
            if(action.payload.length <= 12) {
                if(action.payload.indexOf("+7") > -1) {
                    return { ...state, inputTel: action.payload }
                }
                return { ...state, inputTel: "+7" + action.payload }
            }
            return state;
        case SET_ERROR_TEL:
            return { ...state, showErrorTel: action.payload}
        case SET_ERROR_EMAIL:
            return { ...state, showErrorEmail: action.payload }
        case SET_ERROR_EMAIL_EXIST:
            return { ...state, errorEmailExist: action.payload }
        case OPEN_KEYBOARD_SEARCH:
            return { ...state, openKeyboardSearch: true }
        case CLOSE_KEYBOARD_SEARCH:
            return { ...state, openKeyboardSearch: false }
        case SET_INPUT_SEARCH:
            return { ...state, inputSearch: action.payload }
        case SET_LAYOUT_SEARCH:
            return { ...state, layoutSearch: action.payload }
        case SET_KEYBOARD: 
            return {...state, keyboard: action.payload}
        case SET_TOOLTIP:
            return { ...state, tooltip: action.payload }
        case SET_ERROR_EMAIL_MESSAGE:
            const message = state.errorEmailExist ? 'Пользователь с таким email уже существует' : 'Некорректный адрес электронной почты';
            return { ...state, errorEmail: message }
        default: return state;
    }
}