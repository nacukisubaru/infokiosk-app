export const OPEN_MODAL_PAYMENT = "PAYMENT/OPEN_MODAL_PAYMENT";
export const CLOSE_MODAL_PAYMENT = "PAYMENT/CLOSE_MODAL_PAYMENT";
export const SET_PAYMENT_LINK = "PAYMENT/SET_PAYMENT_LINK";
export const SET_RESERVATION_ID = "PAYMENT/SET_RESERVATION_ID";
export const OPEN_MODAL_STAY = "PAYMENT/OPEN_MODAL_STAY";
export const CLOSE_MODAL_STAY = "PAYMENT/CLOSE_MODAL_STAY";
export const TOGGLE_NO_PAYMENT = "PAYMENT/TOGGLE_NO_PAYMENT";
export const SET_ORDER_ID = "PAYMENT/SET_ORDER_ID";
export const SET_PAYER_NAME = "PAYMENT/SET_PAYER_NAME";
export const SET_CARD_PAYMENT = "PAYMENT/SET_CARD_PAYMENT";
export const SET_CHOOSE_PAYMENT = "PAYMENT/SET_CHOOSE_PAYMENT";
export const SET_PAYMENT_SUM = "PAYMENT/SET_PAYMENT_SUM";
export const OPEN_POPUP_CARD_ERROR = "PAYMENT/OPEN_POPUP_CARD_ERROR";
export const CLOSE_POPUP_CARD_ERROR = "PAYMENT/CLOSE_POPUP_CARD_ERROR";
export const OPEN_POPUP_CHECK_ERROR = "PAYMENT/OPEN_POPUP_CHECK_ERROR";
export const CLOSE_POPUP_CHECK_ERROR = "PAYMENT/CLOSE_POPUP_CHECK_ERROR";

const initialState = {    
    paymentLink: '',
    reservationId: 0,
    orderId: 0,
    openPayment: false,
    openStay: false,
    popupNoPayment: false,
    popupCardErrorPayment: false,
    payerName: '',
    cardPayment: false,
    choosePayment: true,
    paymentSum: 0,
    checkError: false
}

export const paymentReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_MODAL_PAYMENT:
            return { ...state, openPayment: true }
        case CLOSE_MODAL_PAYMENT:
            return { ...state, openPayment: false }
        case SET_PAYMENT_LINK:
            return {...state, paymentLink: action.payload}
        case SET_RESERVATION_ID:
            return {...state, reservationId: action.payload}
        case OPEN_MODAL_STAY:
            return { ...state, openStay: true }
        case CLOSE_MODAL_STAY:
            return { ...state, openStay: false }
        case TOGGLE_NO_PAYMENT:
            return { ...state, popupNoPayment: !state.popupNoPayment}
        case SET_ORDER_ID:
            return {...state, orderId: action.payload}
        case SET_PAYER_NAME:
            return {...state, payerName: action.payload}
        case SET_CARD_PAYMENT:
            return {...state, cardPayment: action.payload}
        case SET_CHOOSE_PAYMENT:
            return {...state, choosePayment: action.payload}
        case SET_PAYMENT_SUM:
            return {...state, paymentSum: action.payload}
        case OPEN_POPUP_CARD_ERROR:
            return { ...state, popupCardErrorPayment: true }
        case CLOSE_POPUP_CARD_ERROR:
            return { ...state, popupCardErrorPayment: false }
        case OPEN_POPUP_CHECK_ERROR:
            return {...state, checkError: true}
        case CLOSE_POPUP_CHECK_ERROR:
            return {...state, checkError: false}
        default: return state;
    }
}