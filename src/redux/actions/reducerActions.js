import { SET_MESSAGE, SET_SNACK } from "../reducers/appReducer";

export const setMessage = (message) => {
    return {type: SET_MESSAGE, payload: message};
}

export const setSnack = (isShow) => {
    return {type: SET_SNACK, payload: isShow};
} 