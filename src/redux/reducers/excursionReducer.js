import { arrayUniqueByKey } from "../../helpers/arrayHelper";

export const SET_EXCURSION_DATA = "EXCURSIONS/SET_EXCURSION_DATA";
export const SET_EXCURSION_GROUP = "EXCURSIONS/SET_EXCURSION_GROUP";
export const SET_EXCURSION_GATHERING_ID = "EXCURSIONS/SET_EXCURSION_GATHERING_ID";
export const SET_EXCURSION_LIST = "EXCURSIONS/SET_EXCURSION_LIST";
export const SET_EXCURSION_DATE_LIST = "EXCURSIONS/SET_EXCURSION_DATE_LIST";
export const SET_EXCURSION_LIST_PROMO = "EXCURSIONS/SET_EXCURSION_LIST_PROMO";
export const SET_EXCURSION_PRICE = "PRICE/SET_EXCURSION_PRICE";
export const SET_TOTAL_PRICE = "PRICE/SET_TOTAL_PRICE";
export const SET_ADULT_PRICE = "PRICE/SET_ADULT_PRICE";
export const SET_CHILD_PRICE = "PRICE/SET_CHILD_PRICE";
export const SET_COUNT_PAGES = "PAGES/SET_COUNT_PAGES";
export const SET_COUNT_PAGES_DATE = "PAGES/SET_COUNT_PAGES_DATE";
export const SET_COUNT_PAGES_SEARCH = "PAGES/SET_COUNT_PAGES_SEARCH";
export const SET_PHONE_REF = "EXCURSIONS/SET_PHONE_REF";
export const NO_RESULT_POPUP = 'EXCURSIONS/NO_RESULT_POPUP';
export const OPEN_KEYBOARD_NUM_EXC = 'EXCURSIONS/OPEN_KEYBOARD_NUM_EXC';
export const CLOSE_KEYBOARD_NUM_EXC = 'EXCURSIONS/CLOSE_KEYBOARD_NUM_EXC';
export const SET_INPUT_NUM_EXC = 'EXCURSIONS/SET_INPUT_NUM_EXC';
export const OPEN_SEARCH_POPUP = 'EXCURSIONS/OPEN_SEARCH_POPUP';
export const NO_QUOT_POPUP = 'EXCURSIONS/NO_QUOT_POPUP';
export const QUOTAS_NOT_AVAILABLE = "EXCURSIONS/QUOTAS_NOT_AVAILABLE";
export const QUOTAS_AVAILABLE = "EXCURSIONS/QUOTAS_AVAILABLE";
export const SET_CLICK_FILTER = "EXCURSIONS/SET_CLICK_FILTER";
export const UNSET_CLICK_FILTER = "EXCURSIONS/UNSET_CLICK_FILTER";
export const SEARCH = "EXCURSIONS/SEARCH";
export const SEARCH_BTN = "EXCURSIONS/SEARCH_BTN";
export const LOADING = "EXCURSIONS/LOADING";
export const OPEN_NO_QUOT_POPUP = "EXCURSIONS/OPEN_NO_QUOT_POPUP";
export const SET_CLOSEST_QUOTA = "EXCURSIONS/SET_CLOSEST_QUOTA";
export const OPEN_RESERVATION = "EXCURSIONS/OPEN_RESERVATION";
export const CLOSE_RESERVATION = "EXCURSIONS/CLOSE_RESERVATION";
export const SET_CURRENT_EX_ID = "EXCURSIONS/SET_CURRENT_EX_ID";
export const SET_DAYS_WEEK = "EXCURSIONS/SET_DAYS_WEEK";
export const CLOSE_NO_QUOTE = "EXCURSIONS/CLOSE_NO_QUOTE";
export const PAGE_NOT_FOUND = "EXCURSIONS/PAGE_NOT_FOUND";
export const COUNT_EXCURSIONS = "EXCURSIONS/COUNT_EXCURSIONS";
export const RESET_EXCURSION_LIST = "EXCURSIONS/RESET_EXCURSION_LIST";
export const SET_SEARCH_CLICK = "EXCURSIONS/SET_SEARCH_CLICK";
export const POLICY_POPUP = "EXCURSIONS/POLICY_POPUP";
export const POLICY_POPUP_OPTIONS = "EXCURSIONS/POLICY_POPUP_OPTIONS";
export const CLOSE_SEARCH = "CLOSE_SEARCH";
export const SET_PAGE_IMAGE = "SET_PAGE_IMAGE";
export const SET_PAGE_SLOGAN = "SET_PAGE_SLOGAN";
export const SET_PAGE_HEADER = "SET_PAGE_HEADER";
export const SET_RESERV_SUCCESS_BANNER = "SET_RESERV_SUCCESS_BANNER";
export const SET_RESERV_SUCCESS_SLOGAN = "SET_RESERV_SUCCESS_SLOGAN";
export const SET_RESERV_SUCCESS_HEADER = "SET_RESERV_SUCCESS_HEADER";
export const SET_HISTORY_BACK = "SET_HISTORY_BACK";
export const SET_AVALIABLE_GROUPS = "SET_AVALIABLE_GROUPS";
export const TOGGLE_DATA_RESERVATION_IS_LOADING = "TOGGLE_DATA_RESERVATION_IS_LOADING";
export const TABS_VALUE = "EXCURSIONS/TABS_VALUE";

const initialState = {
    group: 0,
    gatheringId: 0,
    currentExcursionId: 0,
    excursionData: {},
    excursionList: [],
    excursionSearchList: [],
    excursionListPromo: [],
    excursionDateList: [],
    excursionGroupsSelect: [],
    excursionPrice: [],
    closestQuota: [],
    daysWeek: [],
    avaliableGroups: [],
    totalPrice: 0,
    adultPrice: 0,
    childPrice: 0,
    countPage: 1,
    countPageDate: 1,
    countPageSearch: 1,
    countExcursions: 0,
    phoneRef: false,
    openKeyboard: false, 
    input: '',
    openSearchPopup: false,
    noQuotPopup: false,
    noResultPopup: false,
    quotasAvailable: true, 
    clickFilter: false,
    search: false,
    searchBtn: false,
    loading: true,
    reservationEnable: true,
    pageNotFound: false,
    searchClick: false,
    policyPopup: false,
    policyPopupOptions: {},
    pageImage: '',
    pageSlogan: '',
    header: '',
    reservSuccessBanner: '',
    reservSuccessSlogan: '',
    reservSuccessHeader: '',
    historyBack: false,
    isLoadingDataForReservation: true,
    tabsValue: 0
};

export const excursionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXCURSION_DATA:
            return { ...state, excursionData: action.payload, };
        case SET_EXCURSION_GATHERING_ID:
            return { ...state, gatheringId: action.payload }
        case SET_EXCURSION_GROUP: 
            return { ...state, group: action.payload }
        case SET_EXCURSION_LIST:
            //if (state.clickFilter) state.excursionList = [];
            //if (state.searchClick) state.excursionList = [];
            let arrayList = [
                ...state.excursionList,
                ...action.payload
            ];
            
            return { 
                ...state,
                excursionList: arrayUniqueByKey(arrayList)
            }   
        case SET_SEARCH_CLICK:
            return { ...state, searchClick: action.payload }  
        case SET_EXCURSION_LIST_PROMO:
            return { ...state, excursionListPromo: action.payload }
        case SET_EXCURSION_DATE_LIST:
            return { ...state, excursionDateList: state.excursionDateList.concat(action.payload) }
        case SET_EXCURSION_PRICE: 
            return { ...state, excursionPrice: action.payload }
        case SET_TOTAL_PRICE:
            return { ...state, totalPrice: action.payload }
        case SET_ADULT_PRICE:
            return { ...state, adultPrice: action.payload }
        case SET_CHILD_PRICE:
            return { ...state, childPrice: action.payload }
        case SET_COUNT_PAGES: 
            return { ...state, countPage: action.payload }
        case SET_COUNT_PAGES_DATE: 
            return { ...state, countPageDate: action.payload }
        case SET_COUNT_PAGES_SEARCH: 
            return { ...state, countPageSearch: action.payload }
        case SET_PHONE_REF:
            return { ...state, phoneRef: true }
        case OPEN_KEYBOARD_NUM_EXC:
            return { ...state, openKeyboard: true }
        case CLOSE_KEYBOARD_NUM_EXC:
            return { ...state, openKeyboard: false }
        case SET_INPUT_NUM_EXC:
            return { ...state, input: action.payload }
        case OPEN_SEARCH_POPUP:
            return { ...state, openSearchPopup: action.payload }
        case NO_QUOT_POPUP:
            return { ...state, noQuotPopup: !state.noQuotPopup, excursionDateList: [], countPageDate: 1 }
        case CLOSE_NO_QUOTE:
            return { ...state, noQuotPopup: false }
        case OPEN_NO_QUOT_POPUP:
            return { ...state, noQuotPopup: true }
        case NO_RESULT_POPUP:
            return { ...state, noResultPopup: action.payload }   
        case QUOTAS_NOT_AVAILABLE:
            return { ...state, quotasAvailable: false }
        case QUOTAS_AVAILABLE:
            return { ...state, quotasAvailable: true }
        case SET_CLICK_FILTER:
            return { ...state, clickFilter: true }
        case UNSET_CLICK_FILTER:
            return { ...state, clickFilter: false }
        case SEARCH:
            return { ...state, search: action.payload }
        case SEARCH_BTN:
            return { ...state, searchBtn: action.payload }
        case CLOSE_SEARCH:
            return { ...state, search: false }
        case LOADING:
            return { ...state, loading: action.payload }
        case SET_CLOSEST_QUOTA:
            return {...state, closestQuota: action.payload }
        case CLOSE_RESERVATION:
            return {...state, reservationEnable: false}
        case OPEN_RESERVATION:
            return {...state, reservationEnable: true }
        case SET_CURRENT_EX_ID:
            return {...state, currentExcursionId: action.payload}
        case SET_DAYS_WEEK:
            return {...state, daysWeek: action.payload}
        case PAGE_NOT_FOUND:
            return {...state, pageNotFound: action.payload}
        case COUNT_EXCURSIONS:
            return {...state, countExcursions: state.countExcursions + action.payload}
        case RESET_EXCURSION_LIST:
            return {...state, excursionList: []}
        case POLICY_POPUP:
            return { ...state, policyPopup: action.payload } 
        case POLICY_POPUP_OPTIONS:
            return { ...state, policyPopupOptions: action.payload }
        case SET_PAGE_IMAGE:
            return {...state, pageImage: action.payload}
        case SET_PAGE_SLOGAN:
            return {...state, pageSlogan: action.payload}
        case SET_PAGE_HEADER:
            return {...state, header: action.payload}
        case SET_RESERV_SUCCESS_BANNER: 
            return {...state, reservSuccessBanner: action.payload}
        case SET_RESERV_SUCCESS_SLOGAN:
            return {...state, reservSuccessSlogan: action.payload}
        case SET_RESERV_SUCCESS_HEADER:
            return {...state, reservSuccessHeader: action.payload}
        case SET_HISTORY_BACK:
            return {...state, historyBack: action.payload}
        case SET_AVALIABLE_GROUPS:
            return {...state, avaliableGroups: action.payload}
        case TOGGLE_DATA_RESERVATION_IS_LOADING:
            return {...state, isLoadingDataForReservation: action.payload}
        case TABS_VALUE: 
            return {...state, tabsValue: action.payload}
        default:
            return state;
    }
};
