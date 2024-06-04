export const ACTIVE_FILTER = 'FILTER/ACTIVE_FILTER';
export const DEACTIVATE_FILTER = 'FILTER/DEACTIVATE_FILTER';
export const RESET_FILTER = 'FILTER/RESET_FILTER';
export const OPEN_MODAL_FILTER = 'FILTER/OPEN_MODAL_FILTER';
export const CLOSE_MODAL_FILTER = 'FILTER/CLOSE_MODAL_FILTER';
export const SET_POPUP_DATA = 'FILTER/SET_POPUP_DATA';
export const SET_FILTER_DATA = "FILTER/SET_FILTER_DATA";
export const SET_FILTER_ID = "FILTER/SET_FILTER_ID";
export const SET_FILTER_POPUP_ID = "FILTER/SET_FILTER_POPUP_ID";
export const SET_FILTER_COMMON_ID = "FILTER/SET_FILTER_COMMON_ID";
export const SET_FILTER_WHERE_TO_GO = "FILTER/SET_FILTER_WHERE_TO_GO";
export const SET_FILTER_WHERE_TO_GO_ID = "FILTER/SET_FILTER_WHERE_TO_GO_ID";
export const ACTIVE_FILTER_WHERE_TO_GO = "FILTER/ACTIVE_FILTER_WHERE_TO_GO";
export const SET_ALL_FILTER_WHERE_TO_GO = "FILTER/SET_ALL_FILTER_WHERE_TO_GO";
export const SET_CLIPPED_FILTERS = "FILTER/SET_CLIPPED_FILTERS";
export const SET_MORE_BTN_ACTIVE = "FILTER/SET_MORE_BTN_ACTIVE";
export const ADD_PARENTS_FILTER_NESTED = "FILTER_NESTED/ADD_PARENTS_FILTER_NESTED";
export const DISABLE_ALL_NESTED_FILTERS = "FILTER_NESTED/DISABLE_ALL_NESTED_FILTERS";
export const ACTIVE_PARENT_FILTER_NESTED = "FILTER_NESTED/ACTIVE_PARENT_FILTER_NESTED";
export const DISABLE_PARENT_FILTER = "FILTER_NESTED/DISABLE_PARENT_FILTER";
export const RESET_PARENTS_FILTER_NESTED = "FILTER_NESTED/RESET_PARENTS_FILTER_NESTED";
export const WAS_DISABLED_FILTER = "FILTER/WAS_DISABLED_FILTER";
export const SET_FILTER_BY_DATE_IN_WORK = "FILTER/SET_FILTER_BY_DATE_IN_WORK";
export const SET_TAG_FILTERED = "FILTER/SET_TAG_FILTERED";

const initialState = {
    openFilter: false,
    filterArray: [],
    filterNestedArray: [],
    filterIds: [],
    filterPopupIds: [],
    filterNestedParentsIds: [],
    clippedFilters: [],
    allCategory: true,
    moreBtnActive: false,
    wasDisabledFilter: false,
    IsFilterByDateWorking: false,
    isTagFiltered: false
}

export const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case WAS_DISABLED_FILTER:
            return {...state, wasDisabledFilter: action.payload};
        case DISABLE_ALL_NESTED_FILTERS:
            if(!state.wasDisabledFilter) {
                state.filterNestedArray.map((item) => {
                    item.PARAMS.map((param, key) => {                        
                        if(param.isAll) {
                            item.PARAMS[key].active = false;
                        }
                    })
                });
            }
            return {...state, wasDisabledFilter: true};
        case ADD_PARENTS_FILTER_NESTED:
            if(!state.filterNestedParentsIds.includes(action.payload)) {
                return {...state, filterNestedParentsIds: state.filterNestedParentsIds.concat(action.payload)}
            } else {
                return  {
                    ...state,
                    filterNestedParentsIds: state.filterNestedParentsIds.filter((item) => {
                        return item !== action.payload;
                    })
                }
            }
        case RESET_PARENTS_FILTER_NESTED:
            return {...state, filterNestedParentsIds: []};
        case ACTIVE_PARENT_FILTER_NESTED:
            state.filterNestedArray.map(item => {
                return item.PARAMS.map((param, key) => {
                    if(param.isAll) {                         
                        if(state.filterNestedParentsIds.includes(item.ID)) {         
                            item.PARAMS[key].active = true;
                        } else { 
                            item.PARAMS[key].active = false; 
                        }
                    }
                    // return item.PARAMS[key];
                });
            });
            return {...state}
        case DISABLE_PARENT_FILTER:
            if(action.payload) {
                if(state.filterNestedParentsIds.includes(action.payload)) {
                    return {
                        ...state, 
                        filterNestedParentsIds: state.filterNestedParentsIds.filter((parentFilterId) => {                                  
                            return parentFilterId !== action.payload;
                        })
                    };
                }
            }
            return {...state}
        case ACTIVE_FILTER_WHERE_TO_GO:
            return {
                ...state, 
                allCategory: false,
                filterNestedArray: state.filterNestedArray.map((item, keyItem) => {
                    if(item.ID === action.payload) { 
                        if (item.active) {
                             return {...item, active: false} 
                        } else {
                            item.PARAMS.forEach((obj, key) => {
                                if(!obj.isAll) {
                                    item.PARAMS[key].active = false;
                                }
                            });
                        }
                        return {...item, active: true};
                    } else {
                        if(item.PARAMS.length > 0) {
                            item.PARAMS.map((obj, key) => {
                                if(obj.ID === action.payload) {             
                                    if(!obj.isAll) {               
                                        item.PARAMS[0].active = false;
                                        if(obj.active) {
                                            item.PARAMS[key] = {...obj, active: false};    
                                        } else {
                                            item.PARAMS[key] = {...obj, active: true};
                                            state.filterNestedArray[keyItem].active = false;
                                        }                               
                                    } else {           
                                        if(!state.filterNestedParentsIds.includes(item.ID)) {
                                            state.filterNestedArray[keyItem].active = false;
                                        }
                                        if(obj.active) {
                                            item.PARAMS[0].active = false;
                                            state.filterNestedArray[keyItem].active = false;
                                            if(state.filterNestedParentsIds.includes(item.ID)) {
                                                state.filterNestedParentsIds = state.filterNestedParentsIds.filter((parentId) => {
                                                    return parentId !== item.ID;
                                                })
                                            }         
                                        } else {
                                            item.PARAMS[0].active = true;
                                            state.filterNestedArray[keyItem].active = true;
                                            if(!state.filterNestedParentsIds.includes(item.ID)) {
                                                state.filterNestedParentsIds.push(item.ID);
                                            }
                                        }
                                        item.PARAMS.map((obj, key) => {
                                            if(!obj.isAll) {
                                                item.PARAMS[key] = {...obj, active: false};
                                            }
                                            return item.PARAMS[key];
                                        })
                                    }
                                }
                                
                                if(obj.active) return {...item, active: false}
                                return { ...item }
                            });   
                        }
                        return { ...item }
                    } 
                })
            }
        case DEACTIVATE_FILTER:
            return {
                ...state, 
                allCategory: (state.filterIds.length > 0) ? false : true,
                filterArray: state.filterArray.map(item => {  
                    for (let i = 0; i < state.filterIds.length; i++) {
                        if (item.ID === state.filterIds[i]) { 
                            return { ...item, active: true }
                        }
                    } 
                    return { ...item, active: false }
                })
            }
        case ACTIVE_FILTER:
            return {
                ...state, 
                allCategory: false,
                filterArray: state.filterArray.map(item => {                        
                    if (item.ID === action.payload) { 
                        if (item.active) return { ...item, active: false }
                        return { ...item, active: true }
                    }
                    return { ...item }
                })
            }
        case SET_FILTER_ID:
            const array = state.filterArray.filter(item => item.active);
            
            return {
                ...state, 
                allCategory: (array.length > 0) ? false : true,
                filterIds: array.map(item => item.ID)
            }
        case SET_FILTER_POPUP_ID:
            const arrayPopup = state.filterArray.filter(item => item.active);

            if (action.payload === '') {
                return {
                    ...state, 
                    filterPopupIds: []
                }
            } else {
                return {
                    ...state, 
                    allCategory: (arrayPopup.length > 0) ? false : true,
                    filterIds: (arrayPopup.length === 0) ? [] : state.filterIds,
                    filterPopupIds: arrayPopup.map(item => item.ID)
                }
            }  
        case SET_FILTER_COMMON_ID:
            return {
                ...state, 
                filterIds: state.filterPopupIds
            }        
        case SET_FILTER_WHERE_TO_GO_ID:
            let arrayFilter = [];

            state.filterNestedArray.map(item => { 
                if(item.PARAMS.length > 0) {
                    item.PARAMS.map((param) => {
                        if(param.isAll && param.active) {
                            item.PARAMS.map(param => {
                                if(!param.isAll) {
                                    arrayFilter.push(param);
                                }
                            });
                            return;
                        }
                        if(param.active) {
                            arrayFilter.push(param);
                        }
                    });
                } else {
                    if(item.active) {
                        arrayFilter.push(item);
                    }
                }
                
                return { 
                    ...item, 
                    active: false 
                }
            });

            return {
                ...state, 
                allCategory: (arrayFilter.length > 0) ? false : true,
                wasDisabledFilter: (arrayFilter.length > 0) ? true : false,
                filterIds: arrayFilter.map(item => item.ID),
            }
        case SET_ALL_FILTER_WHERE_TO_GO:
            let arrayAllFilter = [];
            state.filterNestedArray.map((item, key) => {
                if(item.PARAMS.length <= 0) {
                    arrayAllFilter.push(item);
                }
                state.filterNestedArray[key].active = false;
                if(item.PARAMS.length > 0) {
                    item.PARAMS.map((param, key) => {
                        if(!param.isAll) {                            
                            item.PARAMS[key].active = false;
                            arrayAllFilter.push(param);
                        } else {                           
                            item.PARAMS[key].active = true;
                        }
                        // return item.PARAMS;
                    });
                }
            });

            return {
                ...state,
                allCategory: true,
                filterIds: arrayAllFilter.map(item => item.ID)
            }
        case RESET_FILTER:
            return {
                ...state, 
                allCategory: true,
                filterArray: state.filterArray.map(item => { 
                    if (item.active) return { ...item, active: false }
                    return { ...item }
                }),
                filterIds: []
            }
        case SET_CLIPPED_FILTERS:
            return { ...state, clippedFilters: action.payload }
        case OPEN_MODAL_FILTER:
            return { ...state, openFilter: true }
        case CLOSE_MODAL_FILTER:
            return { ...state, openFilter: false }
        case SET_POPUP_DATA:
            return { ...state, popupData: action.payload }
        case SET_FILTER_DATA:
            let arrayResult = [];

            if (state.filterIds.length > 0) {
                arrayResult = state.filterArray.map(filter => {
                    state.filterIds.forEach(id => {
                        if (filter.id === id) filter.active = true;
                    });
                    return { ...filter }
                });
            } else {
                arrayResult = action.payload; 
            }

            return { 
                ...state, 
                filterArray: arrayResult
            }
        case SET_FILTER_WHERE_TO_GO:
            let arrayResultWhere = [];

            if (state.filterNestedParentsIds.length > 0) {
                //обновление filterNestedArray при возврате с детальной старницы, если выбраны родительские категории
                arrayResultWhere = state.filterNestedArray.map(filter => {
                    state.filterNestedParentsIds.forEach(id => {
                        if (filter.ID === id) {
                            filter.active = true;
                        }
                    });
                    return { ...filter }
                });
            } else if (state.filterIds.length > 0 && state.filterNestedParentsIds.length === 0 && state.wasDisabledFilter) {
                //обновление filterNestedArray при возврате с детальной старницы, если выбраны детские категории
                arrayResultWhere = state.filterNestedArray.map(filter => {
                    if (filter.PARAMS.length > 0) {
                        filter.PARAMS.map(filterChild => {
                            state.filterIds.forEach(id => {
                                if (filterChild.ID === id) {
                                    filterChild.active = true;
                                }
                            });
                            return { ...filterChild }
                        });
                    }                    
                    return { ...filter }
                });
            } else {
                //обновление filterNestedArray при первой загрузке страницы
                arrayResultWhere = action.payload;
            }

            return {...state, filterNestedArray: arrayResultWhere }
        case SET_MORE_BTN_ACTIVE:
            return { ...state, moreBtnActive: action.payload }
        case SET_FILTER_BY_DATE_IN_WORK:
            return { ...state, IsFilterByDateWorking: action.payload }
        case SET_TAG_FILTERED:
            return { ...state, isTagFiltered: action.payload }
        default: return state;
    }
}