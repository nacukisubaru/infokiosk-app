export const INPUT_VALUE_ADULT = 'INPUT_NUMBER/INPUT_VALUE_ADULT';
export const INPUT_VALUE_CHILDREN = 'INPUT_NUMBER/INPUT_VALUE_CHILDREN';
export const DISABLED_MINUS_ADULT = 'INPUT_NUMBER/DISABLED_MINUS_ADULT';
export const DISABLED_PLUS_ADULT = 'INPUT_NUMBER/DISABLED_PLUS_ADULT';
export const DISABLED_MINUS_CHILD = 'INPUT_NUMBER/DISABLED_MINUS_CHILD';
export const DISABLED_PLUS_CHILD = 'INPUT_NUMBER/DISABLED_PLUS_CHILD';
export const INPUT_VALUE_TOTAL = 'INPUT_NUMBER/INPUT_VALUE_TOTAL';
export const SET_LIMIT_PEOPLE = "INPUT_NUMBER/SET_LIMIT_PEOPLE";
export const SET_LIMIT_QUOTA = "INPUT_NUMBER/SET_LIMIT_QUOTA";
export const QUOTAS_MESSAGE = "INPUT_NUMBER/QUOTAS_MESSAGE";

const initialState = {    
    valueAdult: 1,
    valueChildren: 0,
    valueTotal: 1,
    limitPeople: 50,
    limitPeopleQuota: 0,
    disabledBtnMinusAdult: true,
    disabledBtnPlusAdult: false,
    disabledBtnMinusChildren: true,
    disabledBtnPlusChildren: false,
    lastModifiedCounter: "",
    quotasMessage: false
}

export const inputNumberReducer = (state = initialState, action) => {
    switch(action.type){        
        case INPUT_VALUE_ADULT:
            let tickets = parseInt(action.payload) + parseInt(state.valueChildren);
            if(action.payload < 1) {
                return state;
            }
            if(tickets <= parseInt(state.limitPeople) || action.payload < state.valueAdult) {
                let disablePlus = false;
                let disableMinus = true;
                if(tickets === parseInt(state.limitPeople)) {
                    disablePlus = true;
                }
                if(action.payload !== 1) {
                    disableMinus = false;
                }
                return { 
                    ...state, 
                    valueAdult: action.payload, 
                    lastModifiedCounter: "adult", 
                    disabledBtnMinusAdult: disableMinus,
                    disabledBtnPlusAdult: disablePlus, 
                    disabledBtnPlusChildren: disablePlus
                }
            }
            return {...state, disabledBtnPlusAdult: true, disabledBtnPlusChildren: true}
        case INPUT_VALUE_CHILDREN:
            let ticketsChildren = parseInt(state.valueAdult) + parseInt(action.payload);
            if(action.payload < 0) {
                return state;
            }
            if(ticketsChildren <= parseInt(state.limitPeople) || action.payload < state.valueChildren) {
                let disablePlus = false;
                let disableMinus = true;
                if(ticketsChildren === parseInt(state.limitPeople)) {
                    disablePlus = true;
                }
                if(action.payload !== 0) {
                    disableMinus = false;
                }
                return {
                    ...state, 
                    valueChildren: action.payload, 
                    lastModifiedCounter: "children",
                    disabledBtnMinusChildren: disableMinus,
                    disabledBtnPlusChildren: disablePlus, 
                    disabledBtnPlusAdult: disablePlus 
                }
            }
            return {...state, disabledBtnPlusAdult: true, disabledBtnPlusChildren: true}
        case DISABLED_MINUS_ADULT:
            return { ...state, disabledBtnMinusAdult: action.payload }
        case DISABLED_PLUS_ADULT:
            return { ...state, disabledBtnPlusAdult: action.payload }
        case DISABLED_MINUS_CHILD:
            return { ...state, disabledBtnMinusChildren: action.payload }
        case DISABLED_PLUS_CHILD:
            return { ...state, disabledBtnPlusChildren: action.payload }
        case INPUT_VALUE_TOTAL:
            return { ...state, valueTotal: parseInt(state.valueAdult) + parseInt(state.valueChildren) };
        case SET_LIMIT_PEOPLE:
            return { ...state, limitPeople: action.payload };
        case SET_LIMIT_QUOTA:
            if(parseInt(action.payload) < 1) {
                return { ...state, limitPeopleQuota: 0 };
            }
            return { ...state, limitPeopleQuota: action.payload };
        case QUOTAS_MESSAGE:
                return { ...state, quotasMessage: action.payload };
        default: return state;
    }
}