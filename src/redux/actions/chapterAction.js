import * as constants from '../constants'

export const getChapterById = (chapterId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `chapters/${chapterId}`,
        success: (response) => (setSingleChapter(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const fetchAllChapters = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: 'chapters',
        data,
        success: (response) => (setAllChapters(response.data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setSingleChapter = (data) => {
    return {
        type: constants.SET_SINGLE_CHAPTER,
        payload: data
    }
}

const setAllChapters = (data) => {
    return {
        type: constants.SET_ALL_CHAPTERS,
        payload: data
    }
}

export const updateChapter = (chapterId, data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: `chapters/${chapterId}`,
            data,
            success: (response) => (updateChapterSet(chapterId, response.data)),
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const updateExam = (examId, data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: `exams/${examId}`,
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

const updateChapterSet = (chapterId, data) => (
    {
        type: constants.UPDATE_CHAPTER,
        payload: {chapterId, data}
    }
);

export const deleteChapterById = (chapterId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `chapters/${chapterId}`,
        success: () => (removeChapter(chapterId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const removeChapter = (chapterId) => ({
    type: constants.REMOVE_CHAPTER,
    payload: chapterId
});

export const deleteFileById = (fileId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `files/${fileId}`,
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteExamById = (examId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `exams/${examId}`,
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const chapterCreate = (data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: 'chapters/create',
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const chapterFileCreate = (data, onSuccess, onError) => {
    let formData = new FormData();

    if (data.file) {
        data.file = data.file[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `chapters/${data.chapter}/upload`,
            data: formData,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const chapterExamCreate = (data, onSuccess, onError) => {
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `exams`,
            data,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};

export const chapterFileUpdate = (filesId, data, onSuccess, onError) => {
    let formData = new FormData();

    if (data.file) {
        data.file = data.file[0]
    }

    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });
    return {
        type: constants.API,
        payload: {
            method: 'PUT',
            url: `files/${filesId}`,
            data: formData,
            postProcessSuccess: onSuccess,
            postProcessError: onError
        }
    }
};