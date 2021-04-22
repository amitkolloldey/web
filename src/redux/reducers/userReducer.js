import * as constants from '../constants'

export default function userReducer(state = [], action) {
    let OrgsList = []
    let TraineeCoursesList = []
    let TrainerCoursesList = []
    switch (action.type) {
        case constants.SET_ALL_USERS:
            return {...state, users: action.payload};
        // case constants.SET_SINGLE_USER:
        //     return {...state, single_user: action.payload};
        case constants.SET_SINGLE_USER:
            return {...state.users, single_user: action.payload.data};
        case constants.SET_CURRENT_USER:
            if (action.payload.data) {
                OrgsList = action.payload.data.Orgs.map(item => {
                    return item.id;
                })
                TraineeCoursesList = action.payload.data.TraineeCourses.map(item => {
                    return item.id;
                })
                TrainerCoursesList = action.payload.data.TrainerCourses.map(item => {
                    return item.id;
                })
            }
            return {
                ...state,
                current_user: action.payload.data,
                OrgsList: OrgsList,
                TraineeCoursesList: TraineeCoursesList,
                TrainerCoursesList: TrainerCoursesList
            };
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}