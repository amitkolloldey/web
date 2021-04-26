import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {exam_submission, getExamById} from "../redux/actions/examAction";
import {getCurrentUser} from "../redux/actions/authActions";
import NotFoundPage from "./notfoundpage";
import {Link} from "react-router-dom";

const ExamSubmission = ({loading, match, dispatchGetExamByIdAction, dispatchExamSubmissionAction, dispatchFetchCurrentUserAction, TraineeCoursesList, user}) => {

    const [exam, setExam] = useState('');

    const {examId} = match.params;
    const {preview} = match.params;

    useEffect(() => {

        dispatchGetExamByIdAction(examId, (response) => {
            setExam(response.data);
        });

    }, []);

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchExamSubmissionAction(examId, data.answers, () => {
            setTimeout(() => window.location.reload('/#/exam_submission/' + examId), 300)
            toast.success('Your answers Submitted Successfully!');
        })
        return false;
    }

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);

    let courseId = exam && exam.courseId ? exam.courseId : null

    return (preview && preview === 'preview') || (TraineeCoursesList && TraineeCoursesList.length && courseId && TraineeCoursesList.includes(courseId)) ? (
        <div className='right_wrapper'>
            <div className="text-right">
                <Link className='back_to_main_course btn view_btn join_link mr-2' to={'/courses/' + courseId}>
                    <i className="fas fa-arrow-left"/> Back to Course Details
                </Link>
            </div>

            <h2 className='page_title'>Submission Form</h2>
            <div className='main_content'>
                <div className="request_form">
                    <p>
                        <strong>
                            {exam.title}
                        </strong>
                    </p>

                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 exam_form_wrapper">
                            {errors.answers && (<p className='alert alert-danger '>You are required to answer all the questions*</p>)}

                            {exam.questions && exam.questions.map((question, qidx) => {
                                return (
                                    <div className="single_question">
                                        <span className='question'>
                                            {question.question}
                                        </span>
                                        <input className="form-check-input" type="hidden"
                                               name={'answers[' + question.number + '][number]'} value={question.number}
                                               ref={register({required: true})}/>
                                        {question.answers && question.answers.map((option, aidx) => {
                                            return (
                                                <>
                                                    {
                                                        question.answerType == 'radio' ? (
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio"
                                                                       name={'answers[' + question.number + '][answer]'}
                                                                       id={"option-" + aidx + "-" + qidx} value={option} ref={register({required: true})}/>
                                                                <label className="form-check-label"
                                                                       htmlFor={"option-" + aidx + "-" + qidx}>
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       value={option} id={"option-" + aidx + "-" + qidx}
                                                                       name={'answers[' + question.number + '][answer]'}
                                                                       ref={register({required: true})} />
                                                                <label className="form-check-label"
                                                                       htmlFor={"option-" + aidx + "-" + qidx}>
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        {
                            preview !== 'preview' ? (<button type="submit" className="btn btn-primary">Submit</button>) : ''
                        }
                    </form>
                </div>
            </div>
        </div>
    ) : <NotFoundPage/>
}

const mapDispatchToProps = dispatch => ({
    dispatchGetExamByIdAction: (examId, onSuccess) =>
        dispatch(getExamById(examId, onSuccess)),
    dispatchExamSubmissionAction: (examId, answers, onSuccess) =>
        dispatch(exam_submission({examId, answers}, onSuccess)),
    dispatchFetchCurrentUserAction: (userId, onSuccess) => dispatch(getCurrentUser(userId, onSuccess)),
})

const mapStateToProps = (state) => ({
    loading: state.loading,
    TraineeCoursesList: state.users.TraineeCoursesList,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamSubmission)



