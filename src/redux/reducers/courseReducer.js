import * as constants from '../constants'

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_COURSES:
            return {all: action.payload};
        case constants.SET_SINGLE_COURSE:
            return {...state, course: action.payload };
        case constants.ADD_COURSE:
            return state.concat(action.payload);
        case constants.UPDATE_COURSE:
            return state.map(item => {
                if (item.id === action.payload.courseId)
                    return { ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_USER_INFO:
            return [];
        case constants.REMOVE_COURSE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}