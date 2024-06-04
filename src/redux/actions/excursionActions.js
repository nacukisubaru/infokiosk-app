import {
    SET_EXCURSION_DATA,
    SET_EXCURSION_GROUP,
    SET_EXCURSION_GATHERING_ID,
    SET_EXCURSION_LIST,
    SET_EXCURSION_LIST_PROMO,
    SET_EXCURSION_PRICE,
    SET_TOTAL_PRICE,
    SET_ADULT_PRICE,
    SET_CHILD_PRICE,
    SET_COUNT_PAGES,
    NO_RESULT_POPUP,
    SET_COUNT_PAGES_SEARCH,
    SET_CLICK_FILTER,
    UNSET_CLICK_FILTER,
    SEARCH,
    LOADING,
    SET_EXCURSION_DATE_LIST,
    SET_COUNT_PAGES_DATE,
    SET_SEARCH_CLICK,
    POLICY_POPUP,
    POLICY_POPUP_OPTIONS,
    CLOSE_SEARCH,
    SET_PAGE_IMAGE,
    SET_PAGE_SLOGAN,
    SET_PAGE_HEADER,
    SET_RESERV_SUCCESS_BANNER,
    SET_RESERV_SUCCESS_SLOGAN,
    SET_HISTORY_BACK,
    SET_AVALIABLE_GROUPS,
    SET_RESERV_SUCCESS_HEADER,
    TOGGLE_DATA_RESERVATION_IS_LOADING,
    SEARCH_BTN,
    TABS_VALUE
} from "../reducers/excursionReducer";

export const setExcursionData = (data) => {
    return { type: SET_EXCURSION_DATA, payload: data };
};

export const setGroup = (id) => {
    return { type: SET_EXCURSION_GROUP, payload: id };
};

export const setGatheringId = (id) => {
    return { type: SET_EXCURSION_GATHERING_ID, payload: id };
};

export const setExcursionList = (list) => {
    return {type: SET_EXCURSION_LIST, payload: list};
}

export const setExcursionListPromo = (list) => {
    return {type: SET_EXCURSION_LIST_PROMO, payload: list};
}

export const setExcursionPrice = (data) => {
    return {type:SET_EXCURSION_PRICE, payload: data};
}

export const setTotalPrice = (price) => {
    return {type: SET_TOTAL_PRICE, payload: price};
}

export const setAdultPrice = (price) => {
    return {type:SET_ADULT_PRICE, payload: price};
}

export const setChildPrice = (price) => {
    return {type:SET_CHILD_PRICE, payload: price};
}

export const setCountPage = (page) => {
    return {type:SET_COUNT_PAGES, payload: page}
} 

export const setCountPageSearch = (page) => {
    return {type:SET_COUNT_PAGES_SEARCH, payload: page}
} 

export const toggleNoResultPopup = (value) => dispatch => {    
    dispatch ({
        type: NO_RESULT_POPUP,
        payload: value
    });
}

export const setClickFilter = () => {
    return {type: SET_CLICK_FILTER}
}

export const unsetClickFilter = () => {
    return {type: UNSET_CLICK_FILTER}
}

export const setSearch = (value) => {
    return {
        type: SEARCH,
        payload: value
    }
}

export const setSearchBtn = (value) => {
    return {
        type: SEARCH_BTN,
        payload: value
    }
}

export const toggleLoading = (value) => dispatch => {    
    dispatch ({
        type: LOADING,
        payload: value
    });
}

export const setExcursionDateList = (list) => {
    return {type: SET_EXCURSION_DATE_LIST, payload: list};
}

export const setCountPageDate = (page) => {
    return {type:SET_COUNT_PAGES_DATE, payload: page}
}

export const setSearchClick = (bool) => {
    return {type: SET_SEARCH_CLICK, payload: bool}
}

export const togglePolicyPopup = (bool) => {
    return {type: POLICY_POPUP, payload: bool}
}

export const setPolicyPopupOptions = (obj) => {
    return {type: POLICY_POPUP_OPTIONS, payload: obj}
}

export const closeSearch = () => {
    return {type: CLOSE_SEARCH}
}

export const setPageImage = (image) => {
    return {
        type: SET_PAGE_IMAGE,
        payload: image
    }
}

export const setPageSlogan = (slogan) => {
    return {
        type: SET_PAGE_SLOGAN,
        payload: slogan
    }
}

export const setHeader = (name) => {
    return {
        type: SET_PAGE_HEADER,
        payload: name
    }
}

export const setReservSuccessBanner = (name) => {
    return {
        type: SET_RESERV_SUCCESS_BANNER,
        payload: name
    }
}

export const setReservSuccessSlogan = (name) => {
    return {
        type: SET_RESERV_SUCCESS_SLOGAN,
        payload: name
    }
}

export const setReservSuccessHeader = (name) => {
    return {
        type: SET_RESERV_SUCCESS_HEADER,
        payload: name
    }
}

export const setHistoryBack = (value) => {
    return {
        type: SET_HISTORY_BACK,
        payload: value
    }
}

export const setAvaliableGroups = (value) => {
    return {
        type: SET_AVALIABLE_GROUPS,
        payload: value
    }
}

export const toggleLoadingDataReservation = (value) => {
    return {
        type: TOGGLE_DATA_RESERVATION_IS_LOADING,
        payload: value
    }
}

export const setTabsValue = (value) => {
    return {
        type: TABS_VALUE,
        payload: value
    }
}