export const OPEN_MODAL_CALENDAR = 'OPEN_MODAL_CALENDAR';
export const CLOSE_MODAL_CALENDAR = 'CLOSE_MODAL_CALENDAR';
export const SET_VALUE_CALENDAR = 'SET_VALUE_CALENDAR';
export const OPEN_MODAL_CALENDAR_LIST = 'OPEN_MODAL_CALENDAR_LIST';
export const CLOSE_MODAL_CALENDAR_LIST = 'CLOSE_MODAL_CALENDAR_LIST';
export const SET_VALUE_CALENDAR_LIST = 'SET_VALUE_CALENDAR_LIST';
export const SET_CHOSEN_CALENDAR = 'SET_CHOSEN_CALENDAR';
export const SET_CHOSEN_CALENDAR_LIST = 'SET_CHOSEN_CALENDAR_LIST';
export const SET_CLOSEST_DATE = 'SET_CLOSEST_DATE';

const initialState = {    
    openCalendar: false,
    value: '',
    openCalendarList: false,
    valueList: '',
    closestDate: '',
    chosenValue: '',
    chosenValueList: ''
}

export const calendarReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_MODAL_CALENDAR:
            return { ...state, openCalendar: true }
        case CLOSE_MODAL_CALENDAR:
            return { ...state, openCalendar: false }
        case SET_VALUE_CALENDAR:
            return { ...state, value: action.payload }
        case OPEN_MODAL_CALENDAR_LIST:
            return { ...state, openCalendarList: true }
        case CLOSE_MODAL_CALENDAR_LIST:
            return { ...state, openCalendarList: false }
        case SET_VALUE_CALENDAR_LIST:
            return { ...state, valueList: action.payload }
        case SET_CHOSEN_CALENDAR:
            return { ...state, chosenValue: action.payload }
        case SET_CHOSEN_CALENDAR_LIST:
            return { ...state, chosenValueList: action.payload }
        case SET_CLOSEST_DATE:
            return {...state, closestDate: action.payload }
        default: return state;
    }
}