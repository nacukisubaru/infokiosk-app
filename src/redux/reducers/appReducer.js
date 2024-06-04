export const SET_MESSAGE = "MESSAGES/SET_MESSAGE";
export const SET_SNACK = "SNACKS/SET_SNACK";
export const TOGGLE_POLICY = "TOGGLE_POLICY";
export const POPUP_SUPPORT = "POPUP_SUPPORT";
export const ENABLE_BTN_RESERVATION = "ENABLE_BTN_RESERVATION";
export const DISABLE_BTN_RESERVATION = "DISABLE_BTN_RESERVATION";
export const COME_BACK_TO_LIST = "COME_BACK_TO_LIST";
export const SET_COME_BACK_LINK = "SET_COME_BACK_LINK";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_AGREEMENT = "SET_AGREEMENT";
export const SET_AGREEMENT_EXCURSION = "SET_AGREEMENT_EXCURSION";
export const SET_POLICY = "SET_POLICY";
export const SET_TABS = "SET_TABS"

const initialState = {
    open: false,
    input: "",
    snackOpen: false,
    message: {},
    checkBoxPolicy: false,
    popupSupport: false,
    disableBtnReserv: true,
    comeBackToList: false,
    queryExecute: false,
    comeBackLink: '',
    activeTab: 0,
    tabs: [],
    agreement: {name: '', text: ''},
    agreementExcursion: {name: '', text: ''},
    policy: '',
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case SET_SNACK:
            return {
                ...state,
                snackOpen: action.payload
            }
        case TOGGLE_POLICY:
            return {
                ...state,
                checkBoxPolicy: action.payload
            }
        case POPUP_SUPPORT:
            return { ...state, popupSupport: !state.popupSupport }
        case ENABLE_BTN_RESERVATION:
            return { ...state, disableBtnReserv: false }
        case DISABLE_BTN_RESERVATION: 
            return { ...state, disableBtnReserv: true }
        case COME_BACK_TO_LIST:
            return {...state, comeBackToList: action.payload}
        case SET_COME_BACK_LINK:
            return {...state, comeBackLink: action.payload}
        case SET_ACTIVE_TAB:
            return {...state, activeTab: action.payload}
        case SET_AGREEMENT:
            return {...state, agreement: action.payload}
        case SET_AGREEMENT_EXCURSION:
            return {...state, agreementExcursion: action.payload}
        case SET_POLICY:
            return {...state, policy: action.payload}
        case SET_TABS:
            return {...state, tabs: action.payload}
        default:
            return state;
    }
};