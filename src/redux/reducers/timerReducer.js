export const SET_MINUTES_CODE = 'TIMER/SET_MINUTES_CODE';
export const SET_SECONDS_CODE = 'TIMER/SET_SECONDS_CODE';
export const SET_MINUTES_PAY = 'TIMER/SET_MINUTES_PAY';
export const SET_SECONDS_PAY = 'TIMER/SET_SECONDS_PAY';
export const SET_MINUTES_STAY = 'TIMER/SET_MINUTES_STAY';
export const SET_SECONDS_STAY = 'TIMER/SET_SECONDS_STAY';
export const TIMER_END = 'TIMER/TIMER_END';
export const SECONDS_TIMER_END = 'TIMER/SECONDS_TIMER_END';
export const SET_SECONDS_CARD_PAY = 'TIMER/SET_SECONDS_CARD_PAY';
export const SET_MINUTES_CARD_PAY = 'TIMER/SET_MINUTES_CARD_PAY';

const initialState = {    
    minutesCode: 0,
    secondsCode: 59,
    minutesPay: 2,
    secondsPay: 59,
    minutesCardPay: 1,
    secondsCardPay: 59,
    timerEnd: false,
    secondsTimerEnd: 173,
    minutesStay: 0,
    secondsStay: 10,
}

export const timerReducer = (state = initialState, action) => {
    switch(action.type){        
        case SET_MINUTES_CODE:
            return { ...state, minutesCode: action.payload }
        case SET_SECONDS_CODE:
            return { ...state, secondsCode: action.payload }
        case SET_MINUTES_PAY:
            return { ...state, minutesPay: action.payload }
        case SET_SECONDS_PAY:
            return { ...state, secondsPay: action.payload }
        case SET_MINUTES_STAY:
            return { ...state, minutesStay: action.payload }
        case SET_SECONDS_STAY:
            return { ...state, secondsStay: action.payload }
        case TIMER_END:
            return { ...state, timerEnd: action.payload }
        case SECONDS_TIMER_END:
            return { ...state, secondsTimerEnd: action.payload }
        case SET_SECONDS_CARD_PAY:
            return { ...state, secondsCardPay: action.payload }
        case SET_MINUTES_CARD_PAY:
            return { ...state, minutesCardPay: action.payload }
        default: return state;
    }
}