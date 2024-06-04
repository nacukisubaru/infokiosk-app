export const OPEN_SELECT_LOCATION = 'SELECT/OPEN_SELECT_LOCATION';
export const OPEN_SELECT_GROUP = 'SELECT/OPEN_SELECT_GROUP';
export const CLOSE_SELECT_LOCATION = 'SELECT/CLOSE_SELECT_LOCATION';
export const CLOSE_SELECT_GROUP = 'SELECT/CLOSE_SELECT_GROUP';
export const SET_POPUP_DATA = 'SELECT/SET_POPUP_DATA';
export const SET_VALUE_LOCATION = 'SELECT/SET_VALUE_LOCATION';
export const SET_VALUE_GROUP = 'SELECT/SET_VALUE_GROUP';
export const SET_DATA_LOCATION = "SELECT/SET_DATA_LOCATION";
export const SET_DATA_GROUP = "SELECT/SET_DATA_GROUP";
export const ACTIVE_OPTION_LOCATION = 'SELECT/ACTIVE_OPTION_LOCATION';
export const RESET_LOCATION = 'SELECT/RESET_LOCATION';
export const ACTIVE_OPTION_GROUP = 'SELECT/ACTIVE_OPTION_GROUP';
export const SET_SELECTED_GROUP_ID = 'SELECT/SET_SELECTED_GROUP_ID';
export const SET_SELECTED_LOCATION_ID = 'SELECT/SET_SELECTED_LOCATION_ID';
export const SET_SELECTED_PLACE_ID = 'SELECT/SET_SELECTED_PLACE_ID';
export const SET_DATA_PLACES = 'SELECT/SET_DATA_PLACES';
export const ACTIVE_OPTION_PLACES = 'SELECT/ACTIVE_OPTION_PLACES';
export const SET_VALUE_PLACE = 'SELECT/SET_VALUE_PLACE';
export const CLOSE_SELECT_PLACES = 'SELECT/CLOSE_SELECT_PLACES';
export const OPEN_SELECT_PLACES = 'SELECT/OPEN_SELECT_PLACES';
export const ALL_LOCATION = 'SELECT/ALL_LOCATION';
export const SET_SELECT_FILTER_ID = "SELECT/SET_SELECT_FILTER_ID";
export const SET_LIST_PLACES = "SELECT/SET_LIST_PLACES";
export const SET_PREVIOUS_SELECT_GROUP = "SELECT/SET_PREVIOUS_SELECT_GROUP";
export const SET_PREVIOUS_SELECT_PLACE = "SELECT/SET_PREVIOUS_SELECT_PLACE";
export const CHECK_LOCATION_IDS = "SELECT/CHECK_LOCATION_IDS";
export const CHECK_ACTIVE_OPTION = "SELECT/CHECK_ACTIVE_OPTION";
export const RESET_LOCATION_IDS = "SELECT/RESET_LOCATION_IDS";

const initialState = {    
    openSelectLocation: false,
    valueSelectLocation: 'Все локации',
    allLocation: true,
    openSelectGroup: false,
    openSelectPlaces: false,
    valueSelectGroup: '',
    valueSelectPlace: '',
    previousSelectGroup: '',
    previousSelectPlace: '',
    selectGroupId: 0,
    selectLocationId: 0,
    selectPlaceId: 0,
    popupDataLocation: [],
    locationIds: [],
    listPlaces: [],
    popupDataGroup: {
        body: [ 
            {
                id: 1,
                option: '14:00 Группа из Сочи', 
                active: false
            },
            {
                id: 2,
                option: '15:00 Группа из Адлера', 
                active: false
            },  
        ]
    },
    popupDataPlaces: {
        body: []
    },
    firstSelectGroup: {},
    firstSelectPlace: {},
}

export const selectReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_SELECT_LOCATION:
            return { ...state, openSelectLocation: true }
        case CLOSE_SELECT_LOCATION:
            return { ...state, openSelectLocation: false }
        case OPEN_SELECT_GROUP:
            return { ...state, openSelectGroup: true }
        case CLOSE_SELECT_GROUP:
            return { ...state, openSelectGroup: false }
        case OPEN_SELECT_PLACES:
            return {...state, openSelectPlaces: true}
        case CLOSE_SELECT_PLACES:
            return { ...state, openSelectPlaces: false }
        case SET_POPUP_DATA:
            return { ...state, popupData: action.payload }
        case SET_VALUE_LOCATION:
            return { ...state, valueSelectLocation: action.payload }
        case SET_VALUE_GROUP:
            return { ...state, valueSelectGroup: action.payload }
        case SET_DATA_LOCATION:
            return {...state,  popupDataLocation: action.payload};
        case SET_DATA_GROUP: 
            return {
                ...state, 
                popupDataGroup: {body: action.payload},
                firstSelectGroup: action.payload[0]
            };
        case SET_DATA_PLACES:
            return {
                ...state, 
                popupDataPlaces: {body: action.payload},
                firstSelectPlace: action.payload[0]
            };
        case ACTIVE_OPTION_LOCATION:
            return {
                ...state, 
                allLocation: false,
                popupDataLocation: state.popupDataLocation.map(item => {
                    if (item.id === action.payload) {                     
                        return {
                            ...item, active: !item.active
                        }
                    }
                    return { ...item }
                })
            }
        case SET_SELECT_FILTER_ID:
            const array = state.popupDataLocation.filter(item => item.active);

            return {
                ...state, 
                allLocation: array.length > 0 ? false : true,
                locationIds: array.map(item => item.id)
            }
        case RESET_LOCATION:
            return {
                ...state, 
                allLocation: true,
                popupDataLocation: state.popupDataLocation.map(item => { 
                    if (item.active) return { ...item, active: false }
                    return { ...item }
                }),
            }
        case RESET_LOCATION_IDS:
            return {
                ...state, 
                locationIds: []
            }
        case CHECK_LOCATION_IDS:
            const itemsActive = state.popupDataLocation.filter(item => {
                for (let i = 0; i < state.locationIds.length; i++) {
                    if (item.id === state.locationIds[i]) {
                        return item;
                    }                       
                }
                return false; 
            });

            return {
                ...state, 
                allLocation: (state.locationIds.length === 0) && true, 
                popupDataLocation: state.popupDataLocation.map(item => {
                    if (state.locationIds.length === 0) {
                        return { ...item, active: false };                        
                    } else {
                        for (let i = 0; i < itemsActive.length; i++) {
                            if (item.id === itemsActive[i].id) {
                                return { ...item, active: true }
                            }                            
                        }
                        return { ...item, active: false }                        
                    }                  
                })
            }
        case CHECK_ACTIVE_OPTION:
            const arrayOp = state.popupDataLocation.filter(item => item.active);

            return {
                ...state, 
                allLocation: (arrayOp.length > 0) ? false : true, 
            }
        case ACTIVE_OPTION_GROUP:
            return {
                ...state, 
                popupDataGroup: {
                    ...state.popupDataGroup,
                    body: state.popupDataGroup.body.map(item => {
                            if (item.id === action.payload) {            
                                return {
                                    ...item, active: true
                                }
                            } 
                            return { ...item, active: false }
                    })
                } 
            }
        case ACTIVE_OPTION_PLACES:
            return {
                ...state, 
                popupDataPlaces: {
                    ...state.popupDataPlaces,
                    body: state.popupDataPlaces.body.map(item => {
                        if (item.id === action.payload) {            
                            return {
                                ...item, active: true
                            }
                        } 
                        return { ...item, active: false }
                    })
                } 
            }
        case SET_VALUE_PLACE:
            return {
                ...state,
                valueSelectPlace: action.payload
            }
        case SET_SELECTED_GROUP_ID: 
            return {
                ...state,
                selectGroupId: action.payload
            }
        case SET_SELECTED_LOCATION_ID: 
            return {
                ...state,
                selectLocationId: action.payload
            }
        case SET_SELECTED_PLACE_ID:
            return {
                ...state,
                selectPlaceId: action.payload
            }
        case SET_LIST_PLACES:
            return {...state, listPlaces: action.payload}
        case SET_PREVIOUS_SELECT_GROUP:
            return {...state, previousSelectGroup: action.payload}
        case SET_PREVIOUS_SELECT_PLACE:
            return {...state,  previousSelectPlace: action.payload}
        default: return state;
    }
}