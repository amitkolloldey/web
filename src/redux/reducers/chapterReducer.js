import * as constants from '../constants'

export default function chapterReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_CHAPTERS:
            return {...state, chapters: action.payload};
        case constants.SET_SINGLE_CHAPTER:
            return {...state, chapter: action.payload};
        case constants.UPDATE_CHAPTER:
            return state.length ? state.map(item => {
                if (item.id === action.payload.chapterId)
                    return { ...action.payload.data };
                else
                    return item;
            }) : action.payload.data;
        case constants.RESET_USER_INFO:
            return state;
        case constants.REMOVE_COURSE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}