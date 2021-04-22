import * as constants from '../constants'

export const fetchAllUsers = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: 'users',
        data,
        success: (response) => (setAllUsers(response.data)),
        postProcessError: onError
    }
})

export const fetchAllTrainees = (onSuccess) => {
    const data = {
        "role": {
            "name": "Trainee"
        }
    }
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'users/filtered',
            data,
            postProcessSuccess: onSuccess,
        }
    }
}


export const fetchAllTrainers = (onSuccess) => {
    const data = {
        "role": {
            "name": "Trainer"
        }
    }
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'users/filtered',
            data,
            postProcessSuccess: onSuccess,
        }
    }
}

export const fetchAllOrgAdmins = (onSuccess) => {
    const data = {
        "role": {
            "name": "Organization Admin"
        }
    }
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'users/filtered',
            data,
            postProcessSuccess: onSuccess,
        }
    }
}

const setAllUsers = (data) => {
    return {
        type: constants.SET_ALL_USERS,
        payload: data
    }
}


// export const updateOrgById = (orgId, data, onSuccess, onError) => ({
//     type: constants.API,
//     payload: {
//         method: 'PUT',
//         url: `orgs/${orgId}`,
//         data,
//         success: (orgId, data) => (updateOrg(orgId, data)),
//         postProcessSuccess: onSuccess,
//         postProcessError: onError
//     }
// });