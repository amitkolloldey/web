import * as constants from '../constants'

export default function requestReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_REQUESTS:
            return action.payload;
        case constants.RESET_USER_INFO:
            return [];
        case constants.REMOVE_REQUEST:
            return action.payload.data.data === 'sentByUser' ? (
                {
                    'sentByUser': state.sentByUser.filter(function (emp) {
                        return emp.id != action.payload.reqId;
                    }),
                    'sentToUser': state.sentToUser
                }
            ) : (
                {
                    'sentToUser': state.sentToUser.filter(function (emp) {
                        return emp.id != action.payload.reqId;
                    }),
                    'sentByUser': state.sentByUser
                }
            )
        default:
            return state;
    }
}