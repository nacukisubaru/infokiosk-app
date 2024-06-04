export const SET_RESERVATION_EMAIL = "SET_RESERVATION_EMAIL";
export const SET_RESERVATION_PHONE = "SET_RESERVATION_PHONE";

const initialState = {    
    email: 'cool.kasper3@yandex.ru',
    phone: '+79005774894'
}

export const reservationReducer = (state = initialState, action) => {
    switch(action.type){        
        case SET_RESERVATION_EMAIL:
            return {...state, email: state.email.concat(action.payload)}
        case SET_RESERVATION_PHONE:
            return {...state, phone: state.phone.concat(action.payload)}
        default: return state;
    }
}