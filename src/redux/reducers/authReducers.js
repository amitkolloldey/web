import * as constants from '../constants'

const defaultState = {
    userId: null,
    phone: null,
    email: null,
    bio: null,
    address: null,
    name: null,
    pic: null,
    cv: null,
    token: null,
    role: null,
    isloggedin: false,
    verified_at: null,
    blocked: false
}

const userInfo = localStorage.getItem('CURRENT_USER')
const INITIAL_STATE = userInfo ? JSON.parse(userInfo) : defaultState

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case constants.SET_USER_INFO:
            return {
                ...state.payload
            }
        case constants.UPDATE_USER_INFO:
            return { state, ...action.payload }

        case constants.RESET_USER_INFO:
            return {
                ...defaultState
            }
        default:
            return state;
    }
}