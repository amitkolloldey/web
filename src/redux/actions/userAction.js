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
            success: (response) => (setAllTrainees(response.data)),
            postProcessSuccess: onSuccess,
        }
    }
}

export const trainerAssociate = (orgId, data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'orgs/' + orgId + '/assignTrainer',
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
}

export const trainerRemove = (orgId, data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'orgs/' + orgId + '/removeTrainer',
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
}

export const traineeRemove = (courseId, data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'courses/' + courseId + '/removeTrainee',
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
}

export const traineeAssociate = (courseId, data, onSuccess, onError) => {

    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'courses/' + courseId + '/addTrainee',
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
}

export const traineeCertificate = (data, onSuccess, onError) => {
    const req = {
        "type": data.type,
        "orgId": data.orgId,
        "courseId": parseInt(data.courseId),
        "content": {
            "message": data.content
        }
    }

    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'requests',
            req,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
}

export const fetchAllTrainers = (onSuccess, onError) => {
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
            success: (response) => (setAllTrainers(response.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
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


const setAllTrainers = (data) => {
    return {
        type: constants.SET_ALL_TRAINERS,
        payload: data
    }
}

const setAllTrainees = (data) => {
    return {
        type: constants.SET_ALL_TRAINEES,
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