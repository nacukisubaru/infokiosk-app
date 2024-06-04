export const OPEN_RECOMMEND = 'OPEN_RECOMMEND';
export const CLOSE_RECOMMEND = 'CLOSE_RECOMMEND';

const initialState = {    
    openRecommend: true,
}

export const recommendReducer = (state = initialState, action) => {
    switch(action.type){        
        case OPEN_RECOMMEND:
            return { ...state, openRecommend: true }
        case CLOSE_RECOMMEND:
            return { ...state, openRecommend: false }
        default: return state;
    }
}