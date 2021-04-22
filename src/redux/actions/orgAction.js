import * as constants from '../constants'
import * as otpGenerator from "otp-generator";

export const createOrg = (data, onSuccess, onError) => {
    console.log(data)
    data['user']['password'] = otpGenerator.generate(6, {upperCase: false, specialChars: false});

    let formData = new FormData();

    if (data.key_people) {
        data.key_people = JSON.stringify(data.key_people)
    }

    if (data.user) {
        data.user = JSON.stringify(data.user)
    }

    if (data.logo) {
        data.logo = data.logo[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });

    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'orgs',
            data: formData,
            success: (org) => (addOrg(org.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const updateOrg = (orgId, data, onSuccess, onError) => {

    let formData = new FormData();

    if (data.key_people) {
        data.key_people = JSON.stringify(data.key_people)
    }

    if (data.user) {
        data.user = JSON.stringify(data.user)
    }

    if (data.logo) {
        data.logo = data.logo[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });

    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: 'orgs/'+parseInt(orgId),
            data: formData,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const addOrg = (org) => (
    {
        type: constants.ADD_ORG,
        payload: org
    }
);

export const fetchAllOrgs = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: 'orgs',
        data,
        success: (response) => (setAllOrgs(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setAllOrgs = (data) => {
    return {
        type: constants.SET_ALL_ORGS,
        payload: data
    }
}

export const getOrgById = (orgId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `orgs/${orgId}`,
        success: (response) => (setSingleOrg(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const setSingleOrg = (data) => {
    return {
        type: constants.SET_SINGLE_ORG,
        payload: data
    }
}

export const trainerRequest = (data, onSuccess) => {
    data['content']['title'] = 'Trainer Request By ' + data['content']['user_name'] + ' to the organization named '+ data['content']['entity_name'];
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `requests`,
            data,
            postProcessSuccess: onSuccess
        }
    }
};

export const trainerInvite = (data, onSuccess) => {
    data['content']['title'] = 'Invite to Join ' + data['content']['name'];
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `requests`,
            data,
            postProcessSuccess: onSuccess
        }
    }
};

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