import * as constants from '../constants'

export const createCategory = (data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'categories',
            data,
            success: (category) => (addCategory(category.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const addCategory = (category) => (
    {
        type: constants.ADD_CATEGORY,
        payload: category
    }
);

export const fetchAllCategories = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: 'categories',
        data,
        success: (response) => (setAllCategories(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setAllCategories = (data) => {
    return {
        type: constants.SET_ALL_CATEGORIES,
        payload: data
    }
}

export const getCategoryById = (categoryId, onSuccess) => (
    {
        type: constants.API,
        payload: {
            method: 'GET',
            url: `categoris/${categoryId}`,
            postProcessSuccess: onSuccess
        }
    });
