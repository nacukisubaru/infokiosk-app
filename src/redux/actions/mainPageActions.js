
import { SET_EXCURSIONS, SET_WHERE_TO_GO, SET_EVENT_LIST, SET_MAIN_BANNER, SET_MAIN_SLOGAN } from "../reducers/mainPageReducer";

export const setMainExcursions = (value) => dispatch => {    
    dispatch ({
        type: SET_EXCURSIONS,
        payload: value
    });
}

export const setMainWhereToGo = (value) => dispatch => {    
    dispatch ({
        type: SET_WHERE_TO_GO,
        payload: value
    });
}

export const setMainEvents = (value) => dispatch => {    
    dispatch ({
        type: SET_EVENT_LIST,
        payload: value
    });
}

export const setMainBanner = (value) => dispatch => {    
    dispatch ({
        type: SET_MAIN_BANNER,
        payload: value
    });
}

export const setMainSlogan = (value) => dispatch => {    
    dispatch ({
        type: SET_MAIN_SLOGAN,
        payload: value
    });
}