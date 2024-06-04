export const SET_TEMP_TOKEN = "SET_TEMP_TOKEN";

const initialState = {
    userId: 505,
    token: 'y7o79zyngbdk5qlp',
    tmpToken: ''
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TEMP_TOKEN:
            return {...state, tmpToken: action.payload};
        default: return state;
    }
}
