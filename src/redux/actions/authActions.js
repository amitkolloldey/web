import * as constants from '../constants'

export const registerUser = (data, onSuccess, onError) => {
    let formData = new FormData();

    if (data.pic) {
        data.pic = data.pic[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });

    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'auth/register',
            data: formData,
            success: (response) => (accountCreated(response)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: 'auth/login',
        data,
        success: (response) => (setUserInfo(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const otpUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: 'requests/process',
        data,
        success: (response) => (setUserInfo(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const resetPass = (data, onSuccess, onError) => (
    {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'requests/process',
            data,
            success: (response) => (setUserInfo(response.data) ),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    })

export const enterResetEmail = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: 'auth/forgot',
        data,
        success: (response) => (accountCreated(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const logOut = (data, onSuccess, onError) => {
    localStorage.removeItem('CURRENT_USER');
    return {
        type: constants.RESET_USER_INFO
    }
}

const setUserInfo = (data) => {
    setCurrentUser(data.id, data)

    const userInfo = {
        userId: data.id,
        name: data.name,
        pic: data.pic,
        cv: data.cv,
        token: data.token,
        role: data.Roles[0].name,
        isloggedin: true,
        verifiedAt: data.verifiedAt,
        blocked: data.blocked,
        phone: data.phone,
        email: data.email,
        bio: data.bio,
        address: data.address
    }

    localStorage.setItem('CURRENT_USER', JSON.stringify(userInfo))

    return {
        type: constants.SET_USER_INFO,
        payload: userInfo
    }
}

export const getUserById = (userId, onSuccess) => {
    return {
        type: constants.API,
        payload: {
            method: 'GET',
            url: `users/${userId}`,
            success: (response) => (setSingleUser(userId, response.data)),
            postProcessSuccess: onSuccess
        }
    }
};

export const getCurrentUser = (userId, onSuccess) => {
    return {
        type: constants.API,
        payload: {
            method: 'GET',
            url: `users/${parseInt(userId)}`,
            success: (response) => (setCurrentUser(userId, response.data)),
            postProcessSuccess: onSuccess
        }
    }
};

const setCurrentUser = (userId, data) => {
    return {
        type: constants.SET_CURRENT_USER,
        payload: {userId, data}
    }
}

const setSingleUser = (userId, data) => {
    return {
        type: constants.SET_SINGLE_USER,
        payload: {userId, data}
    }
}

const accountCreated = (data) => {
    const message = {
        success: 'Success!'
    }

    return {
        type: constants.ACCOUNT_CREATED,
        payload: message
    }
}

export const updateCurrentUser = (data, onSuccess, onError) => {
    let formData = new FormData();

    if (data.pic) {
        data.pic = data.pic[0]
    }

    if (data.cv) {
        data.cv = data.cv[0]
    }
    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });

    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: `users/${data.userId}`,
            data: formData,
            success: (response) => (setUserInfo(response.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};