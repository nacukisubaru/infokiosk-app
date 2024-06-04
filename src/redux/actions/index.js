// import axios from 'axios';
import { 
    ACTIVE_FILTER, 
    OPEN_MODAL_FILTER, 
    CLOSE_MODAL_FILTER, 
    SET_FILTER_DATA, 
    RESET_FILTER, 
    SET_FILTER_ID, 
    ACTIVE_FILTER_WHERE_TO_GO, 
    SET_FILTER_WHERE_TO_GO_ID, 
    SET_ALL_FILTER_WHERE_TO_GO, 
    SET_CLIPPED_FILTERS, 
    ADD_PARENTS_FILTER_NESTED, 
    DISABLE_ALL_NESTED_FILTERS, 
    ACTIVE_PARENT_FILTER_NESTED, 
    DISABLE_PARENT_FILTER, 
    RESET_PARENTS_FILTER_NESTED,
    SET_FILTER_POPUP_ID, 
    SET_FILTER_COMMON_ID, 
    DEACTIVATE_FILTER 
} from '../reducers/filterReducer';
import { OPEN_MODAL_CALENDAR, CLOSE_MODAL_CALENDAR, SET_VALUE_CALENDAR, OPEN_MODAL_CALENDAR_LIST, CLOSE_MODAL_CALENDAR_LIST, SET_VALUE_CALENDAR_LIST, SET_CLOSEST_DATE, SET_CHOSEN_CALENDAR_LIST, SET_CHOSEN_CALENDAR } from '../reducers/calendarReducer';
import { 
    INPUT_VALUE_ADULT, 
    INPUT_VALUE_TOTAL, 
    DISABLED_MINUS_ADULT, 
    DISABLED_PLUS_ADULT, 
    INPUT_VALUE_CHILDREN, 
    DISABLED_PLUS_CHILD, 
    DISABLED_MINUS_CHILD, 
    SET_LIMIT_PEOPLE,
    SET_LIMIT_QUOTA,
    QUOTAS_MESSAGE
} from '../reducers/inputNumberReducer';
import { 
    SET_POPUP_DATA, 
    OPEN_SELECT_LOCATION, 
    CLOSE_SELECT_LOCATION, 
    OPEN_SELECT_GROUP, 
    CLOSE_SELECT_GROUP, 
    SET_VALUE_LOCATION,
    SET_VALUE_GROUP,
    ACTIVE_OPTION_LOCATION,
    ACTIVE_OPTION_GROUP,
    SET_DATA_GROUP,
    SET_DATA_LOCATION,
    SET_SELECTED_GROUP_ID,
    SET_SELECTED_LOCATION_ID,
    SET_DATA_PLACES,
    SET_SELECTED_PLACE_ID,
    ACTIVE_OPTION_PLACES,
    SET_VALUE_PLACE,
    CLOSE_SELECT_PLACES,
    OPEN_SELECT_PLACES,
    RESET_LOCATION,
    SET_SELECT_FILTER_ID,
    SET_LIST_PLACES,
    SET_PREVIOUS_SELECT_GROUP,
    SET_PREVIOUS_SELECT_PLACE,
    CHECK_LOCATION_IDS,
    CHECK_ACTIVE_OPTION,
    RESET_LOCATION_IDS
 } from '../reducers/selectReducer';
 import { CLOSE_RECOMMEND, OPEN_RECOMMEND } from '../reducers/recommendReducer';
 import { 
    OPEN_KEYBOARD, 
    CLOSE_KEYBOARD, 
    OPEN_KEYBOARD_NUMBER, 
    CLOSE_KEYBOARD_NUMBER, 
    SET_INPUT, 
    SET_LAYOUT, 
    SET_INPUT_NUMBER,
    OPEN_KEYBOARD_EMAIL,
    CLOSE_KEYBOARD_EMAIL,
    SET_INPUT_EMAIL,
    OPEN_KEYBOARD_TEL,
    CLOSE_KEYBOARD_TEL,
    SET_INPUT_TEL,
    SET_ERROR_TEL,
    SET_ERROR_EMAIL,
    OPEN_KEYBOARD_SEARCH,
    CLOSE_KEYBOARD_SEARCH,
    SET_INPUT_SEARCH,
    SET_LAYOUT_SEARCH,
    SET_LAYOUT_EMAIL,
    SET_KEYBOARD,
    SET_TOOLTIP,
    SET_ERROR_EMAIL_EXIST,
    SET_ERROR_EMAIL_MESSAGE
 } from '../reducers/keyboardReducer';
 import { 
    MAP_BALOON, 
    MAP_BALOON_CLOSE, 
    NEW_CENTER, 
    SET_FILTER_OBJECTS, 
    SET_FILTER_OBJECTS_DATA, 
    SET_FILTER_PLACES, 
    SET_FILTER_PLACES_DATA, 
    SET_PAGE_MAP_ACTIVE, 
    SET_SELECTED_POINT, 
    SET_YMAPS, 
    UNSET_FILTER_OBJECTS, 
    UNSET_FILTER_PLACES,
 } from '../reducers/mapReducer';
import { SET_TEMP_TOKEN } from '../reducers/authReducer';
import { SET_RESERVATION_PHONE, SET_RESERVATION_EMAIL } from '../reducers/reservationReducer';
import { CLOSE_MODAL_PAYMENT, CLOSE_MODAL_STAY, CLOSE_POPUP_CARD_ERROR, OPEN_MODAL_PAYMENT, OPEN_MODAL_STAY, OPEN_POPUP_CARD_ERROR, SET_CARD_PAYMENT, SET_CHOOSE_PAYMENT, SET_ORDER_ID, SET_PAYER_NAME, SET_PAYMENT_LINK, SET_PAYMENT_SUM, SET_RESERVATION_ID, TOGGLE_NO_PAYMENT, OPEN_POPUP_CHECK_ERROR, CLOSE_POPUP_CHECK_ERROR } from '../reducers/paymentReducer';
import { 
     OPEN_MODAL_VERIFY, 
     SET_SMS_CODE, 
     OPEN_VERIFY_KEYBOARD, 
     CLOSE_VERIFY_KEYBOARD, 
     CLOSE_MODAL_VERIFY, 
     WHY_NO_SMS,
     SET_VERIFY,
     INNCORECT_CODE,
     UNSET_VERIFY,
     RESET_SMS_CODE,
     SET_SMS_SENT_PHONE,
     CORRECT_CODE,
} from '../reducers/smsVerifyReducer';
import { 
    CLOSE_KEYBOARD_NUM_EXC, 
    NO_QUOT_POPUP, 
    OPEN_KEYBOARD_NUM_EXC, 
    OPEN_SEARCH_POPUP, 
    SET_INPUT_NUM_EXC, 
    SET_PHONE_REF,
    QUOTAS_AVAILABLE,
    QUOTAS_NOT_AVAILABLE,
    OPEN_NO_QUOT_POPUP,
    SET_CLOSEST_QUOTA,
    CLOSE_RESERVATION,
    OPEN_RESERVATION,
    SET_CURRENT_EX_ID,
    SET_DAYS_WEEK,
    CLOSE_NO_QUOTE,
    PAGE_NOT_FOUND,
    COUNT_EXCURSIONS,
    RESET_EXCURSION_LIST
} from '../reducers/excursionReducer';
import { SECONDS_TIMER_END, SET_MINUTES_CARD_PAY, SET_MINUTES_CODE, SET_MINUTES_PAY, SET_MINUTES_STAY, SET_SECONDS_CARD_PAY, SET_SECONDS_CODE, SET_SECONDS_PAY, SET_SECONDS_STAY, TIMER_END } from '../reducers/timerReducer';
import { COME_BACK_TO_LIST, DISABLE_BTN_RESERVATION, ENABLE_BTN_RESERVATION, POPUP_SUPPORT, SET_ACTIVE_TAB, SET_AGREEMENT, SET_AGREEMENT_EXCURSION, SET_COME_BACK_LINK, SET_POLICY, SET_TABS, TOGGLE_POLICY } from '../reducers/appReducer';
import { RESET_WHERE_TO_GO_LIST, SET_COUNT_PAGE, SET_WHERE_TO_GO, WHERE_TO_GO_LIST } from '../reducers/catalogReducer';
import { WHERE_TO_GO_LIST_PROMO } from '../reducers/catalogReducer';
import { SET_FILTER_WHERE_TO_GO } from '../reducers/filterReducer';
import { SET_MORE_BTN_ACTIVE } from '../reducers/filterReducer';


/*filterReducer*/
export const setActiveFilter = (id) => dispatch => {    
    dispatch ({
        type: ACTIVE_FILTER,
        payload: id
    });    
}

export const deactivateFilter = (idArr) => dispatch => {    
    dispatch ({
        type: DEACTIVATE_FILTER,
        payload: idArr
    });    
}

export const setFilterId = (id) => dispatch => {    
    dispatch ({
        type: SET_FILTER_ID,
        payload: id
    });
}

export const setFilterPopupId = (id) => dispatch => {    
    dispatch ({
        type: SET_FILTER_POPUP_ID,
        payload: id
    });
}

export const setFilterCommonId = () => dispatch => {    
    dispatch ({
        type: SET_FILTER_COMMON_ID
    });
}

export const resetFilter = () => dispatch => {    
    dispatch ({
        type: RESET_FILTER
    });
}

export const openModalFilter = () => dispatch => {    
    dispatch ({
        type: OPEN_MODAL_FILTER,
    });
}

export const closeModalFilter = () => dispatch => {   
    dispatch ({
        type: CLOSE_MODAL_FILTER,
    }); 
}

export const setFilterList = (list) => dispatch => {
    dispatch ({
        type: SET_FILTER_DATA,
        payload: list
    }); 
}

/*calendarReducer*/
export const openModalCalendar = () => dispatch => {    
    dispatch ({
        type: OPEN_MODAL_CALENDAR,
    });
}

export const closeModalCalendar = () => dispatch => {    
    dispatch ({
        type: CLOSE_MODAL_CALENDAR,
    });
}

export const setCalendarValue = (value) => dispatch => {    
    dispatch ({
        type: SET_VALUE_CALENDAR,
        payload: value
    });
}

export const openModalCalendarList = () => dispatch => {    
    dispatch ({
        type: OPEN_MODAL_CALENDAR_LIST,
    });
}

export const closeModalCalendarList = () => dispatch => {    
    dispatch ({
        type: CLOSE_MODAL_CALENDAR_LIST,
    });
}

export const setCalendarValueList = (value) => dispatch => {    
    dispatch ({
        type: SET_VALUE_CALENDAR_LIST,
        payload: value
    });
}
export const setChosenCalendarValue = (value) => dispatch => {    
    dispatch ({
        type: SET_CHOSEN_CALENDAR,
        payload: value
    });
}

export const setChosenCalendarValueList = (value) => dispatch => {    
    dispatch ({
        type: SET_CHOSEN_CALENDAR_LIST,
        payload: value
    });
}

/*inputNumberReducer*/
export const setInputNumberValueAdult = (value) => dispatch => {    
    dispatch ({
        type: INPUT_VALUE_ADULT,
        payload: value
    });
}

export const setInputNumberValueChildren = (value) => dispatch => {    
    dispatch ({
        type: INPUT_VALUE_CHILDREN,
        payload: value
    });
}

export const setInputNumberValueTotal = () => dispatch => {
    dispatch ({
        type: INPUT_VALUE_TOTAL,
    });
}

export const setDisabledBtnMinusAdult = (bool) => dispatch => {    
    dispatch ({
        type: DISABLED_MINUS_ADULT,
        payload: bool
    });
}

export const setDisabledBtnPlusAdult = (bool) => dispatch => {    
    dispatch ({
        type: DISABLED_PLUS_ADULT,
        payload: bool
    });
}

export const setDisabledBtnPlusChild = (bool) => dispatch => {    
    dispatch ({
        type: DISABLED_PLUS_CHILD,
        payload: bool
    });
}

export const setDisabledBtnMinusChild = (bool) => dispatch => {    
    dispatch ({
        type: DISABLED_MINUS_CHILD,
        payload: bool
    });
}

export const setQuotasMessage = (bool) => dispatch => {    
    dispatch ({
        type: QUOTAS_MESSAGE,
        payload: bool
    });
}

/*selectReducer*/
export const setSelectData = (data) => dispatch => {    
    dispatch ({
        type: SET_POPUP_DATA,
        payload: data
    });
}

export const openSelectLocation = () => dispatch => {    
    dispatch ({
        type: OPEN_SELECT_LOCATION,
    });
}

export const closeSelectLocation = () => dispatch => {    
    dispatch ({
        type: CLOSE_SELECT_LOCATION,
    });
}

export const openSelectPlaces = () => dispatch => {    
    dispatch ({
        type: OPEN_SELECT_PLACES,
    });
}

export const closeSelectPlaces = () => dispatch => {    
    dispatch ({
        type: CLOSE_SELECT_PLACES,
    });
}

export const setValueSelectPlace = (value) => dispatch => { 
    dispatch ({
        type: SET_VALUE_PLACE,
        payload: value
    });
}

export const openSelectGroup = () => dispatch => {    
    dispatch ({
        type: OPEN_SELECT_GROUP,
    });
}

export const closeSelectGroup = () => dispatch => {    
    dispatch ({
        type: CLOSE_SELECT_GROUP,
    });
}

export const setValueSelectLocation = (value) => dispatch => { 
    dispatch ({
        type: SET_VALUE_LOCATION,
        payload: value
    });
}

export const setValueSelectGroup = (value) => dispatch => {   
    dispatch ({
        type: SET_VALUE_GROUP,
        payload: value
    });
}

export const setActiveOptionLocation = (id) => dispatch => {    
    dispatch ({
        type: ACTIVE_OPTION_LOCATION,
        payload: id
    });
    // dispatch ({
    //     type: SET_SELECT_FILTER_ID
    // });
}

export const setSelectFilterId = () => dispatch => {    
    dispatch ({
        type: SET_SELECT_FILTER_ID
    });
}

export const resetLocation = () => dispatch => {    
    dispatch ({
        type: RESET_LOCATION
    });
}

export const resetLocationIds = () => dispatch => {    
    dispatch ({
        type: RESET_LOCATION_IDS
    });
}

export const checkLocationIds = () => dispatch => {    
    dispatch ({
        type: CHECK_LOCATION_IDS
    });
}

export const checkActiveOption = () => dispatch => {    
    dispatch ({
        type: CHECK_ACTIVE_OPTION
    });
}

export const setActiveOptionGroup = (id) => dispatch => {    
    dispatch ({
        type: ACTIVE_OPTION_GROUP,
        payload: id
    });
}

export const setActiveOptionPlace = (id) => dispatch => {    
    dispatch ({
        type: ACTIVE_OPTION_PLACES,
        payload: id
    });
}

export function setDataGroup(data) {
    return {
        type: SET_DATA_GROUP,
        payload: data
    }
}

export function setDataLocation(data) {
    return {
        type: SET_DATA_LOCATION,
        payload: data
    }
}

export function setDataPlaces(data) {
    return {
        type: SET_DATA_PLACES,
        payload: data
    }
}

export const setSelectedGroupId = (id) => dispatch => {
    dispatch({
        type: SET_SELECTED_GROUP_ID,
        payload: id
    })
}

export const setSelectedLocationId = (id) => dispatch => {
    dispatch({
        type: SET_SELECTED_LOCATION_ID,
        payload: id
    })
}

export const setSelectedPlaceId = (id) => dispatch => {
    dispatch({
        type: SET_SELECTED_PLACE_ID,
        payload: id
    })
}

/*recommendReducer*/
export const setOpenRecommend = () => dispatch => {    
    dispatch ({
        type: OPEN_RECOMMEND,
    });
}

export const setCloseRecommend = () => dispatch => {    
    dispatch ({
        type: CLOSE_RECOMMEND,
    });
}

/*keyboardReducer*/
export const setOpenKeyboard = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD,
    });
}

export const setCloseKeyboard = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD,
    });
}

export const setInputKeyboard = (value) => dispatch => {    
    dispatch ({
        type: SET_INPUT,
        payload: value
    });
}

export const setLayoutKeyboard = (value) => dispatch => {    
    dispatch ({
        type: SET_LAYOUT,
        payload: value
    });
}

export const setOpenKeyboardNumber = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD_NUMBER,
    });
}

export const setCloseKeyboardNumber = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD_NUMBER,
    });
}

export const setInputKeyboardNumber = (value) => dispatch => {    
    dispatch ({
        type: SET_INPUT_NUMBER,
        payload: value
    });
}

export const setOpenKeyboardEmail = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD_EMAIL,
    });
}

export const setCloseKeyboardEmail = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD_EMAIL,
    });
}

export const setInputKeyboardEmail = (value) => dispatch => {    
    dispatch ({
        type: SET_INPUT_EMAIL,
        payload: value
    });
}

export const setLayoutKeyboardEmail = (value) => dispatch => {    
    dispatch ({
        type: SET_LAYOUT_EMAIL,
        payload: value
    });
}

export const setOpenKeyboardTel = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD_TEL,
    });
}

export const setCloseKeyboardTel = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD_TEL,
    });
}

export const setInputKeyboardTel = (value) => dispatch => {
    dispatch ({
        type: SET_INPUT_TEL,
        payload: value
    });
}

export const setOpenKeyboardSearch = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD_SEARCH,
    });
}

export const setCloseKeyboardSearch = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD_SEARCH,
    });
}

export const setInputKeyboardSearch = (value) => dispatch => {    
    dispatch ({
        type: SET_INPUT_SEARCH,
        payload: value
    });
}

export const setLayoutKeyboardSearch = (value) => dispatch => {    
    dispatch ({
        type: SET_LAYOUT_SEARCH,
        payload: value
    });
}

export const setTooltip = (bool) => dispatch => {    
    dispatch ({
        type: SET_TOOLTIP,
        payload: bool
    });
}

/*mapReducer*/
export const setSelectedPoint = (point) => dispatch => {    
    dispatch ({
        type: SET_SELECTED_POINT,
        payload: point
    });
}

export const setFilterPlaces = () => dispatch => {    
    dispatch ({
        type: SET_FILTER_PLACES
    });
}

export const unsetFilterPlaces = () => dispatch => {    
    dispatch ({
        type: UNSET_FILTER_PLACES
    });
}

export const setFilterObjects = () => dispatch => {    
    dispatch ({
        type: SET_FILTER_OBJECTS
    });
}

export const setFilterObjectsData = (data) => dispatch => {
    dispatch ({
        type: SET_FILTER_OBJECTS_DATA,
        payload: data
    });
}

export const setFilterPlacesData = (data) => dispatch => {
    dispatch ({
        type: SET_FILTER_PLACES_DATA,
        payload: data
    });
}

export const unsetFilterObjects = () => dispatch => {    
    dispatch ({
        type: UNSET_FILTER_OBJECTS
    });
}

export const toggleMapBaloon = () => dispatch => {    
    dispatch ({
        type: MAP_BALOON
    });
}

export const closeMapBaloon = () => dispatch => {    
    dispatch ({
        type: MAP_BALOON_CLOSE
    });
}

export const setNewCenter = (data) => dispatch => {    
    dispatch ({
        type: NEW_CENTER,
        payload: data
    });
}

export const setYmaps = (data) => dispatch => {    
    dispatch ({
        type: SET_YMAPS,
        payload: data
    });
}

/*smsVerifyReducer*/
export const openSmsVerifyModal = () => dispatch => {
    dispatch ({
        type: OPEN_MODAL_VERIFY
    });
}

export const closeSmsVerifyModal = () => dispatch => {
    dispatch ({
        type: CLOSE_MODAL_VERIFY
    });
}

export const setSmsCode = (code) => dispatch => {
    dispatch ({
        type: SET_SMS_CODE,
        payload: code
    });
}

export const resetSmsCode = () => dispatch => {
    dispatch({
        type: RESET_SMS_CODE,
    })
}

export const openVerifyKeyboard = () => dispatch => {
    dispatch ({
        type: OPEN_VERIFY_KEYBOARD
    });
}

export const closeVerifyKeyboard = () => dispatch => {
    dispatch ({
        type: CLOSE_VERIFY_KEYBOARD
    });
}

export const toggleWhyNoSms = () => dispatch => {
    dispatch ({
        type: WHY_NO_SMS
    });
}

/*authReducer*/
export const setTempToken = (token) => dispatch => {
    dispatch ({
        type: SET_TEMP_TOKEN,
        payload: token
    });
}

/*reservationReducer*/
export const setEmail = (email) => dispatch => {
    dispatch ({
        type: SET_RESERVATION_EMAIL,
        payload: email
    });
}

export const setPhone = (phone) => dispatch => {
    dispatch ({
        type: SET_RESERVATION_PHONE,
        payload: phone
    });
}

/*paymentReducer*/
export const openModalPayment = () => dispatch => {
    dispatch({
        type: OPEN_MODAL_PAYMENT
    })
}

export const closenModalPayment = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL_PAYMENT
    })
}

export const setPaymentLink = (link) => dispatch => {
    dispatch({
        type: SET_PAYMENT_LINK,
        payload: link
    })
}

export const setReservationId = (id) => dispatch => {
    dispatch({
        type: SET_RESERVATION_ID,
        payload: id
    })
}

export const openModalStay = () => dispatch => {
    dispatch({
        type: OPEN_MODAL_STAY
    })
}

export const closenModalStay = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL_STAY
    })
}

export const setCardPayment = (bool) => dispatch => {
    dispatch({
        type: SET_CARD_PAYMENT,
        payload: bool
    })
}

export const setChoosePayment = (bool) => dispatch => {
    dispatch({
        type: SET_CHOOSE_PAYMENT,
        payload: bool
    })
}

export const setPaymentSum = (sum) => dispatch => {
    dispatch({
        type: SET_PAYMENT_SUM,
        payload: sum
    })
}

export const openPopupCardError = () => dispatch => {
    dispatch({
        type: OPEN_POPUP_CARD_ERROR
    })
}

export const openPopupCheckError = () => dispatch => {
    console.log('dsfsd')
    dispatch({
        type: OPEN_POPUP_CHECK_ERROR
    })
}

export const closePopupCheckError = () => dispatch => {
    dispatch({
        type: CLOSE_POPUP_CHECK_ERROR
    })
}

export const closePopupCardError = () => dispatch => {
    dispatch({
        type: CLOSE_POPUP_CARD_ERROR
    })
}

/*excursionReducer*/
export const setOpenKeyboardExc = () => dispatch => {    
    dispatch ({
        type: OPEN_KEYBOARD_NUM_EXC,
    });
}

export const setCloseKeyboardExc = () => dispatch => {    
    dispatch ({
        type: CLOSE_KEYBOARD_NUM_EXC,
    });
}

export const setInputKeyboardExc = (value) => dispatch => {    
    dispatch ({
        type: SET_INPUT_NUM_EXC,
        payload: value
    });
}

export const setPhoneRef = () => dispatch => {    
    dispatch ({
        type: SET_PHONE_REF,
    });
}

export const toggleSearchPopup = (value) => dispatch => {    
    dispatch ({
        type: OPEN_SEARCH_POPUP,
        payload: value
    });
}

export const toggleNoQuotPopup = () => dispatch => {    
    dispatch ({
        type: NO_QUOT_POPUP,
    });
}

/*timerReducer*/
export const setMinutesCode = (value) => dispatch => {
    dispatch({
        type: SET_MINUTES_CODE,
        payload: value
    })
}

export const setSecondsCode = (value) => dispatch => {
    dispatch({
        type: SET_SECONDS_CODE,
        payload: value
    })
}

export const setMinutesPay = (value) => dispatch => {
    dispatch({
        type: SET_MINUTES_PAY,
        payload: value
    })
}

export const setSecondsPay = (value) => dispatch => {
    dispatch({
        type: SET_SECONDS_PAY,
        payload: value
    })
}

export const setMinutesStay = (value) => dispatch => {
    dispatch({
        type: SET_MINUTES_STAY,
        payload: value
    })
}

export const setSecondsStay = (value) => dispatch => {
    dispatch({
        type: SET_SECONDS_STAY,
        payload: value
    })
}

export const setTimerEnd = (bool) => dispatch => {
    dispatch({
        type: TIMER_END,
        payload: bool
    })
}

export const setSecondsTimerEnd = (value) => dispatch => {
    dispatch({
        type: SECONDS_TIMER_END,
        payload: value
    })
}

export const setSecondsCardPay = (value) => {
    return {
        type: SET_SECONDS_CARD_PAY,
        payload: value
    }
}

export const setMinutesCardPay = (value) => {
    return {
        type: SET_MINUTES_CARD_PAY,
        payload: value
    }
}

export const setVerify = () => dispatch => {
    dispatch({
        type: SET_VERIFY
    })
}

export const unsetVerify = () => dispatch => {
    dispatch({
        type: UNSET_VERIFY 
    })
}

export const inncorectCode = () => dispatch => {
    dispatch({
        type: INNCORECT_CODE
    })
}

export const correctCode = () => dispatch => {
    dispatch({
        type: CORRECT_CODE
    })
}


export const setErrorTel = (show) => dispatch => {
    dispatch({
        type: SET_ERROR_TEL,
        payload: show
    })
}

export const setErrorEmail = (show) => dispatch => {
    dispatch({
        type: SET_ERROR_EMAIL,
        payload: show
    })
}

export const setErrorEmailExist = (bool) => dispatch => {
    dispatch({
        type: SET_ERROR_EMAIL_EXIST,
        payload: bool
    })
}

export const setErrorEmailMessage = () => dispatch => {
    dispatch({
        type: SET_ERROR_EMAIL_MESSAGE
    })
}

/*appReducer*/
export const checkBoxPolicy = (checked) => dispatch => {
    dispatch({
        type: TOGGLE_POLICY,
        payload: checked
    });
}

export const togglePopupSupport = () => dispatch => {
    dispatch({
        type: POPUP_SUPPORT
    });
}

export const smsSentPhone = (phone) => dispatch => {
    dispatch({
        type: SET_SMS_SENT_PHONE,
        payload: phone
    });
}

export const enableBtnReservation = () => dispatch => {
    dispatch({
       type: ENABLE_BTN_RESERVATION
    });
}

export const disableBtnReservation = () => dispatch => {
    dispatch({
       type: DISABLE_BTN_RESERVATION
    });
}

export const quotasAvailable = () => dispatch => {
    dispatch({
        type: QUOTAS_AVAILABLE
    });
}

export const quotasNotAvailable = () => dispatch => {
    dispatch({
        type: QUOTAS_NOT_AVAILABLE
    });
}

export const setLimitPeople = (limit) => dispatch => {
    dispatch({
        type: SET_LIMIT_PEOPLE,
        payload: parseInt(limit)
    })
}

export const setLimitPeopleQuota = (limit) => dispatch => {
    dispatch({
        type: SET_LIMIT_QUOTA,
        payload: parseInt(limit)
    })
}

export const toggleNoPayment = () => dispatch => {
    dispatch({
        type: TOGGLE_NO_PAYMENT
    })
}

export const openNoQuot = () => dispatch => {
    dispatch({
        type: OPEN_NO_QUOT_POPUP
    })
}

export const setListPlaces = (list) => dispatch => {
    dispatch({
        type: SET_LIST_PLACES,
        payload: list
    })
}

export const setClosestDate = (date) => dispatch => {
    dispatch({
        type: SET_CLOSEST_DATE,
        payload: date
    })
}

export const setClosestQuota = (quota) => dispatch => {
    dispatch({
        type: SET_CLOSEST_QUOTA,
        payload: quota
    })
}

export const closeReservation = () => dispatch => {
    dispatch({
        type: CLOSE_RESERVATION
    })
}

export const openReservation = () => dispatch => {
    dispatch({
        type: OPEN_RESERVATION
    })
}

export const setOrderId = (orderId) => dispatch => {
    dispatch({
        type: SET_ORDER_ID,
        payload: orderId
    })
}

export const setCurrentExcursionId = (exId) => dispatch => {
    dispatch({
        type: SET_CURRENT_EX_ID,
        payload: exId
    })
}

export const setDaysWeek = (days) => dispatch => {
    dispatch({
        type: SET_DAYS_WEEK,
        payload: days
    })
}

export const setPrevGroup = (group) => dispatch => {
    dispatch({
        type: SET_PREVIOUS_SELECT_GROUP,
        payload: group
    })
}

export const setPrevPlace = (place) => dispatch => {
    dispatch({
        type: SET_PREVIOUS_SELECT_PLACE,
        payload: place
    })
}

export const closeNoQuoteModal = () => dispatch => {
    dispatch({
        type:CLOSE_NO_QUOTE
    })
}

export const pageNotFound = (isNotFound) => dispatch => {
    dispatch({
        type: PAGE_NOT_FOUND,
        payload: isNotFound
    })
}

export const setPayerName = (name) => dispatch => {
    dispatch({
        type: SET_PAYER_NAME,
        payload: name
    })
}

export const countExcursions = (count) => dispatch => {
    dispatch({
        type: COUNT_EXCURSIONS,
        payload: count
    })
}

export const setPageMapActive = (isActive) => dispatch => {
    dispatch({
        type: SET_PAGE_MAP_ACTIVE,  
        payload: isActive
    })
}

export const setWhereToGoList = (list, isSearch = false) => dispatch => {
    dispatch({
        type: WHERE_TO_GO_LIST,
        payload: list,
        isSearch
    })
}

export const setCatalogCountPage = (page) => dispatch => {
    dispatch({
        type: SET_COUNT_PAGE,
        payload: page
    })
}

export const setWhereToGo = (object) => dispatch => {
    dispatch({
        type: SET_WHERE_TO_GO,
        payload: object
    })
}

export const setPromoWhereToGoList = (list) => dispatch => {
    dispatch({
        type: WHERE_TO_GO_LIST_PROMO,
        payload: list
    });
}

export const setFilterNestedData = (data) => dispatch => {
    dispatch({
        type: SET_FILTER_WHERE_TO_GO,
        payload: data
    })
}

export const setActiveNestedFilter = (id) => dispatch => {
    dispatch({
        type: ACTIVE_FILTER_WHERE_TO_GO,
        payload: id
    });
    dispatch ({
        type: SET_FILTER_WHERE_TO_GO_ID
    });
}

export const setAllActiveNestedFilters = () => dispatch => {
    dispatch({
        type: SET_ALL_FILTER_WHERE_TO_GO
    })
}

export const resetWhereToGoList = () => dispatch => {
    dispatch({
        type: RESET_WHERE_TO_GO_LIST
    })
}

export const resetExList = () => dispatch => {
    dispatch({
        type: RESET_EXCURSION_LIST
    })
}

export const setClippedFilter = (filter) => dispatch => {
    dispatch({
        type: SET_CLIPPED_FILTERS,
        payload: filter
    })
}

export const activeFilterBtnMore = (isActive) => dispatch => {
    dispatch({
        type: SET_MORE_BTN_ACTIVE,
        payload: isActive
    })
}

export const setComeBackToList = (isComeBack) => dispatch => {
    dispatch({
        type: COME_BACK_TO_LIST,
        payload: isComeBack
    })
}

export const addParentFilter = (id) => dispatch => {
    dispatch({
        type: ADD_PARENTS_FILTER_NESTED,
        payload: id
    })
}

export const disableAllNestedFilters = () => dispatch => {
    dispatch({
        type: DISABLE_ALL_NESTED_FILTERS
    })
}

export const activeParentNestedFilters = () => dispatch => {
    dispatch({
        type: ACTIVE_PARENT_FILTER_NESTED
    })
}

export const disableParentFilter = (obj) => dispatch => {
    dispatch({
        type: DISABLE_PARENT_FILTER,
        payload: obj
    })
}

export const resetParentsFiltersNested = () => dispatch => {
    dispatch({
        type: RESET_PARENTS_FILTER_NESTED
    })
}

export const setKeyboard = (object) => dispatch => {
    dispatch({
        type: SET_KEYBOARD,
        payload: object
    })
}

export const setComeBackLink = (link) => dispatch => {
    dispatch({
        type: SET_COME_BACK_LINK,
        payload: link
    })
}

export const setActiveTab = (tab) => dispatch => {
    dispatch({
        type: SET_ACTIVE_TAB,
        payload: tab
    })
}

export const setAgreement = (data) => dispatch => {
    dispatch({
        type: SET_AGREEMENT,
        payload: data
    })
}

export const setAgreementEx = (data) => dispatch => {
    dispatch({
        type: SET_AGREEMENT_EXCURSION,
        payload: data
    })
}

export const setPolicy = (data) => dispatch => {
    dispatch({
        type: SET_POLICY,
        payload: data
    })
}

export const setTabs = (value) => dispatch => {
    dispatch({
        type: SET_TABS,
        payload: value
    })
}