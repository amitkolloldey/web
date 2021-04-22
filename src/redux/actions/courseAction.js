import * as constants from '../constants'

export const fetchAllCourses = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: 'courses',
        data,
        success: (response) => (setAllCourses(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setAllCourses = (data) => {
    return {
        type: constants.SET_ALL_COURSES,
        payload: data
    }
}

const setSingleCourse = (data) => {
    return {
        type: constants.SET_SINGLE_COURSE,
        payload: data
    }
}

export const getCourseById = (courseId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `courses/${courseId}`,
        success: (response) => (setSingleCourse(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const traineeRequest = (data, onSuccess) => {
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

export const traineeInvite = (data, onSuccess) => {
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

export const createCourse = (data, onSuccess, onError) => {
    let formData = new FormData();
    data.published = (data.published === '1')
    if (data.banner) {
        data.banner = data.banner[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });

    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'courses',
            data: formData,
            success: (course) => (addCourse(course.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const categoryAssociate = (data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'categories/associate',
            data: data.category,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const addCourse = (course) => (
    {
        type: constants.ADD_COURSE,
        payload: course
    }
);

export const updateCourse = (courseId, data, onSuccess, onError) => {
    let formData = new FormData();
    if (data.banner) {
        data.banner = data.banner[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });
    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: `courses/${courseId}`,
            data: formData,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const updateCourseSet = (courseId, data) => (
    {
        type: constants.UPDATE_COURSE,
        payload: {courseId, data}
    });

export const deleteCourseById = (courseId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `courses/${courseId}`,
        // success: () => (removeCourse(courseId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const removeCourse = (courseId) => ({
    type: constants.REMOVE_COURSE,
    payload: courseId
});

export const courseEvaluationCreate = (data, onSuccess) => {
    data.questions = data.questions.map(qelm => {
        let answers = qelm.answers.map(aelm => {
            return aelm.trim()
        })
        let correctAnswer = qelm.correctAnswer.map(caelm => {
            return caelm.trim()
        })
        let answerType = qelm.answerType
        let question = qelm.question
        let number = qelm.number
        return {
            answers,
            correctAnswer,
            answerType,
            question,
            number
        }
    })
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `exams`,
            data,
            postProcessSuccess: onSuccess
        }
    }
};
