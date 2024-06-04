export const SET_EXCURSIONS = "SET_EXCURSIONS";
export const SET_WHERE_TO_GO = "SET_WHERE_TO_GO";
export const SET_EVENT_LIST = "SET_EVENT_LIST";
export const SET_MAIN_BANNER = "SET_MAIN_BANNER";
export const SET_MAIN_SLOGAN = "SET_MAIN_SLOGAN";

const initialState = {
    excursions: [],
    whereToGo: [],
    events: [],
    banner: "",
    slogan: ""
};

export const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXCURSIONS:
            return {
                ...state,
                excursions: action.payload
            };
        case SET_WHERE_TO_GO:
            return {
                ...state,
                whereToGo: action.payload
            };
        case  SET_EVENT_LIST:
            return {
                ...state,
                events: action.payload
            };
        case SET_MAIN_BANNER:
            return {
                ...state,
                banner: action.payload
            }
        case SET_MAIN_SLOGAN:
            return {
                ...state,
                slogan: action.payload
            }
        default:
            return state;
    }
};