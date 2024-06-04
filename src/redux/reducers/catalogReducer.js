import { arrayUniqueByKey } from "../../helpers/arrayHelper";

export const WHERE_TO_GO_LIST = "CATALOG/WHERE_TO_GO_LIST";
export const SET_COUNT_PAGE = "CATALOG/SET_COUNT_PAGE";
export const SET_WHERE_TO_GO = "CATALOG/SET_WHERE_TO_GO";
export const WHERE_TO_GO_LIST_PROMO = "CATALOG/WHERE_TO_GO_LIST_PROMO";
export const RESET_WHERE_TO_GO_LIST = "CATALOG/RESET_WHERE_TO_GO_LIST";
export const SET_CATEGORY_ID = "CATALOG/SET_CATEGORY_ID";
export const SET_EVENT_LIST = "CATALOG/SET_EVENT_LIST";
export const SET_EVENT_LIST_PROMO = "CATALOG/SET_EVENT_LIST_PROMO";
export const RESET_EVENT_LIST = "CATALOG/RESET_EVENT_LIST";

export const EVENTS_LIST = "CATALOG/EVENTS_LIST";
export const SET_COUNT_PAGE_EVENTS = "CATALOG/SET_COUNT_PAGE_EVENTS";
export const SET_EVENT = "CATALOG/SET_EVENT";
export const EVENTS_LIST_PROMO = "CATALOG/EVENTS_LIST_PROMO";
export const RESET_EVENTS_LIST = "CATALOG/RESET_EVENTS_LIST";
export const SET_COUNT_PAGE_SEARCH = "SET_COUNT_PAGE_SEARCH";
export const WHERE_TO_GO_BANNER = "WHERE_TO_GO_BANNER";
export const WHERE_TO_GO_SLOGAN = "WHERE_TO_GO_SLOGAN";
export const WHERE_TO_GO_HEADER = "WHERE_TO_GO_HEADER";
export const EVENT_BANNER = "EVENT_BANNER";
export const EVENT_SLOGAN = "EVENT_SLOGAN";
export const EVENT_HEADER = "EVENT_HEADER";

const initialState = {
    categoryId: 0,
    whereToGoList: [],
    whereToGoListPromo: [],
    eventList: [],
    eventListPromo: [],
    whereToGo: {},
    countPage: 1,
    countPageSearch: 1,
    event: {},
    whereToGoBanner: "",
    whereToGoSlogan: "",
    whereToGoHeader: "",
    eventBanner: "",
    eventSlogan: "",
    eventHeader: "",
}

export const catalogReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_EVENT_LIST_PROMO:
            return {...state, eventListPromo: action.payload};
        case SET_EVENT_LIST:
            if(action.isSearch) {
                return {...state, eventList: action.payload};
            }
            return {...state, eventList: arrayUniqueByKey(state.eventList.concat(action.payload))};
        case SET_CATEGORY_ID:
            return {...state, categoryId: action.payload};
        case WHERE_TO_GO_LIST:
            if(action.isSearch) {
                return {...state, whereToGoList: action.payload};
            }
            return {...state, whereToGoList: arrayUniqueByKey(state.whereToGoList.concat(action.payload))};
        case SET_COUNT_PAGE:
            return {...state, countPage: action.payload}
        case SET_COUNT_PAGE_SEARCH:
            return {...state, countPageSearch: action.payload}
        case SET_WHERE_TO_GO:
            return {...state, whereToGo: action.payload}
        case WHERE_TO_GO_LIST_PROMO:
            return {...state, whereToGoListPromo: action.payload}
        case RESET_WHERE_TO_GO_LIST:
            return {...state, whereToGoList: []}
        case RESET_EVENT_LIST:
            return {...state, eventList: []}
        case SET_EVENT:
            return {...state, event: action.payload}
        case WHERE_TO_GO_BANNER:
            return {...state, whereToGoBanner: action.payload}
        case WHERE_TO_GO_SLOGAN:
            return {...state, whereToGoSlogan: action.payload}
        case WHERE_TO_GO_HEADER:
            return {...state, whereToGoHeader: action.payload}
        case EVENT_BANNER:
            return {...state, eventBanner: action.payload}
        case EVENT_SLOGAN:
            return {...state, eventSlogan: action.payload}
        case EVENT_HEADER:
            return {...state, eventHeader: action.payload}
        default: return state;
    }
}
