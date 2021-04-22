import * as constants from "../constants";


export const getExamById = (examId, onSuccess) => (
    {
        type: constants.API,
        payload: {
            method: 'GET',
            url: `exams/${parseInt(examId)}`,
            postProcessSuccess: onSuccess
        }
    });


export const getExamSubmissions = (examId, onSuccess) => {
    const data = {
        examId: examId
    }
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `submissions/filtered`,
            data,
            postProcessSuccess: onSuccess
        }
    }
};

export const exam_submission = (data, onSuccess) => {

    data.answers = data.answers.length && data.answers.map(elm => {
        return {
            'number': parseInt(elm.number),
            'answer': elm.answer
        }
    })
    return {
        type: constants.API,
        payload: {
            method: 'POST',
            url: `submissions`,
            data,
            postProcessSuccess: onSuccess
        }
    }
};