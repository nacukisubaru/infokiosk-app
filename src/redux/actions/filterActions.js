import { SET_FILTER_BY_DATE_IN_WORK, SET_TAG_FILTERED, WAS_DISABLED_FILTER } from "../reducers/filterReducer"

export const setDisableFilter = (bool) => dispatch => {
    dispatch({
        type: WAS_DISABLED_FILTER,
        payload: bool
    })
}

export const setFilterByDateInWork = (isWorking) => dispatch => {
    dispatch({
        type: SET_FILTER_BY_DATE_IN_WORK,
        payload: isWorking
    })
}

export const setTagFiltered = (bool) => dispatch => {
    dispatch({
        type: SET_TAG_FILTERED,
        payload: bool
    })
}