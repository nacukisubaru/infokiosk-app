import { RESET_EVENT_LIST, SET_CATEGORY_ID, SET_EVENT_LIST, SET_EVENT_LIST_PROMO, SET_EVENT, SET_COUNT_PAGE_SEARCH, WHERE_TO_GO_BANNER, WHERE_TO_GO_SLOGAN, WHERE_TO_GO_HEADER, EVENT_BANNER, EVENT_SLOGAN, EVENT_HEADER, KASSIR_QR_LINK } from "../reducers/catalogReducer"

export const setCategoryId = (id) => dispatch => {
    dispatch({
        type: SET_CATEGORY_ID,
        payload: id
    })
}

export const setEventList = (list, isSearch = false) => dispatch => {
    dispatch({
        type: SET_EVENT_LIST,
        payload: list,
        isSearch
    })
}

export const setEventListPromo = (list) => dispatch => {
    dispatch({
        type: SET_EVENT_LIST_PROMO,
        payload: list
    })
}

export const resetEventList = () => dispatch => {
    dispatch({
        type: RESET_EVENT_LIST
    })
}

export const setEvent = (object) => dispatch => {
    dispatch({
        type: SET_EVENT,
        payload: object
    })
}

export const setCatalogCountPageSearch = (page) => dispatch => {
    dispatch({
        type: SET_COUNT_PAGE_SEARCH,
        payload: page
    })
}

export const setWhereToGoBanner = (banner) => {
    return {
        type: WHERE_TO_GO_BANNER,
        payload: banner
    }
}

export const setWhereToGoSlogan = (slogan) => {
    return {
        type: WHERE_TO_GO_SLOGAN,
        payload: slogan
    }
}

export const setWhereToGoHeader = (header) => {
    return {
        type: WHERE_TO_GO_HEADER,
        payload: header
    }
}

export const setEventBanner = (banner) => {
    return {
        type: EVENT_BANNER,
        payload: banner
    }
}

export const setEventSlogan = (slogan) => {
    return {
        type: EVENT_SLOGAN,
        payload: slogan
    }
}

export const setEventHeader = (header) => {
    return {
        type: EVENT_HEADER,
        payload: header
    }
}