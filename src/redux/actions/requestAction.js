import * as constants from '../constants'

export const fetchUserRequests = () => (

    {
        type: constants.API,
        payload: {
            method: 'GET',
            url: 'requests/user',
            success: (response) => (setAllRequests(response.data)),
        }
    })

const setAllRequests = (data) => {
    return {
        type: constants.SET_ALL_REQUESTS,
        payload: data
    }
}

export const getRequestById = (reqId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `requests/${reqId}`,
        postProcessSuccess: onSuccess
    }
});

export const deleteReqById = (reqId, data, onSuccess, onError) => (
    {
        type: constants.API,
        payload: {
            method: 'DELETE',
            url: `requests/${reqId}`,
            success: (response) => (removeReq(reqId, data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError

        }
    });

export const handleReq = (data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `requests/handle/${data.reqId}`,
            data,
            success: (response) => (response.data),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const removeReq = (reqId, data) => (
    {
        type: constants.REMOVE_REQUEST,
        payload: {reqId, data}
    }
);
