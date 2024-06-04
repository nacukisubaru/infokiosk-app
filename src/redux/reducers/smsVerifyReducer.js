export const OPEN_MODAL_VERIFY = "OPEN_MODAL_VERIFY";
export const CLOSE_MODAL_VERIFY = "CLOSE_MODAL_VERIFY";
export const OPEN_VERIFY_KEYBOARD = "OPEN_VERIFY_KEYBOARD";
export const CLOSE_VERIFY_KEYBOARD = "CLOSE_VERIFY_KEYBOARD";
export const SET_SMS_CODE = "SET_SMS_CODE";
export const WHY_NO_SMS = "WHY_NO_SMS";
export const SET_VERIFY = "SET_VERIFY";
export const INNCORECT_CODE = "INNCORECT_CODE";
export const UNSET_VERIFY = "UNSET_VERIFY";
export const RESET_SMS_CODE = "RESET_SMS_CODE";
export const SET_SMS_SENT_PHONE = "SET_SMS_SENT_PHONE";
export const CORRECT_CODE = "CORRECT_CODE";

const initialState = {    
    openModalVerify: false,
    smscode: '',
    keyboard: false,
    whyNoSms: false,
    verifySmsCode: false,
    incorrectCode: true,
    smsSentPhone: ''
}

export const smsVerifyReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_MODAL_VERIFY:
            return {...state, openModalVerify: true}
        case CLOSE_MODAL_VERIFY:
            return {...state, openModalVerify: false}
        case OPEN_VERIFY_KEYBOARD:
            return {...state, keyboard: true}
        case CLOSE_VERIFY_KEYBOARD:
            return {...state, keyboard: false}
        case SET_SMS_CODE:
            if (action.payload.length <= 6) {
                return {...state, smscode: action.payload }
            }
            return state;
        case RESET_SMS_CODE:
            return {...state, smscode: ''}
        case WHY_NO_SMS:
            return {...state, whyNoSms: !state.whyNoSms}
        case SET_VERIFY:
            return {...state, verifySmsCode: true}
        case UNSET_VERIFY:
            return {...state, verifySmsCode: false}
        case INNCORECT_CODE:
            return {...state, incorrectCode: false}
        case CORRECT_CODE:
            return {...state, incorrectCode: true}
        case SET_SMS_SENT_PHONE:
            return {...state, smsSentPhone: action.payload}
        default: return state;
    }
}