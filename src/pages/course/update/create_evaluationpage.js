import React, { useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {connect} from "react-redux";

import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import NotFoundPage from "../../notfoundpage";
import EditEvaluationModal from "../../../components/editevaluation.component";
import {courseEvaluationCreate} from "../../../redux/actions/courseAction";
import {deleteExamById} from "../../../redux/actions/chapterAction";

function CreateEvaluation({course, user, dispatchCreateEvaluationAction, dispatchDeleteEvaluationAction}) {

    const {register, handleSubmit, errors} = useForm();

    let [selectedExamId, setSelectedExamId] = useState();

    const [questions, setFields] = useState([{
        question: null,
        number: null,
        answerType: 'radio',
        answers: null,
        correctAnswer: null
    }]);

    let [selectedEvaluation, setSelectedExam] = useState();


    function handleChangeQuestion(i, event) {
        const values = [...questions];
        values[i].question = event.target.value;
        values[i].number = i;
        setFields(values);
    }

    function handleChangeQuestions(i, event) {
        const values = [...questions];
        values[i].answers = event.target.value;
        values[i].answers = values[i].answers.split("\n")
        setFields(values);
    }

    function handleChangeCorrectAnswers(i, event) {
        const values = [...questions];
        values[i].correctAnswer = event.target.value;
        values[i].correctAnswer = values[i].correctAnswer.split("\n")
        setFields(values);
    }

    function handleAnswerType(i, event) {
        const values = [...questions];
        values[i].answerType = event.target.value;
        setFields(values);
    }

    const onSubmit = (data) => {
        dispatchCreateEvaluationAction(course.id, user.userId, data.title, data.type, questions, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/5'), 300)
            toast.success('Evaluation Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const handleOnDelete = () => {
        dispatchDeleteEvaluationAction(selectedExamId, () => {
            window.$('#confirmationModal').modal('hide');
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/5'), 300)
            toast.success('Evaluation deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, examId) => {
        event.preventDefault();
        setSelectedExamId(examId);
        window.$('#confirmationEvaluationModal').modal('show');
    };

    function handleAdd() {
        const values = [...questions];
        values.push({question: null, number: null, answerType: 'radio', answers: null, correctAnswer: null});
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...questions];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <>
            <h2 className='form_heading'>
                Create Evaluation For {course.title}
            </h2>
            <form noValidate className="p-4"
                  encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="title" placeholder="Enter File Title"
                           ref={register({required: true})}/>
                    {errors.title && (<p className='error'>Title is required*</p>)}

                    <input type="hidden" name='type' ref={register({required: true})} value='course_exam'/>
                    {errors.type && (<p className='error'>Exam Type is required*</p>)}
                </div>

                {questions.map((field, idx) => {
                    return (

                        <div key={`${field}-${idx}`} className='single_field_wrap'>

                            <div className="form-group question_heading text-center">
                                <strong>
                                    <h6>Question #{idx + 1}</h6>
                                </strong>
                            </div>

                            {
                                idx !== 0 ? (<div className="text-right">
                                    <button type="button" onClick={() => handleRemove(idx)} className='btn btn-danger'>
                                        <i className="fas fa-times"/>
                                    </button>
                                </div>) : ''
                            }

                            <div className="mb-3">
                                <label className="form-label">Question</label>
                                <input
                                    type="text"
                                    placeholder="Enter Question" className='form-control'
                                    value={field.question || ""}
                                    onChange={e => handleChangeQuestion(idx, e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Answer Type</label>
                                <select name="answerType" className='form-control' value={field.answerType || "radio"}
                                        onChange={e => handleAnswerType(idx, e)}>
                                    <option value="radio">Single</option>
                                    <option value="checkbox">Multiple</option>
                                </select>
                                <small>Select Whither This Question Has Multiple Answer or Not</small>
                            </div>
                            <div className="mb-3">
                                <div className="row opt_wrapper">
                                    <div className="col-md-8">
                                        <label className="form-label">Option(s)</label>
                                        <textarea
                                            placeholder="Enter Each option on new line" className='form-control'
                                            value={field.answers ? field.answers.join('\n') : ""}
                                            onChange={e => handleChangeQuestions(idx, e)} rows={10}
                                        />
                                        <small><i className="fas fa-info-circle"/> Enter Each option on new line</small>
                                    </div>
                                    <div className="col-md-4">
                                        <span>Options Preview </span>
                                        {
                                            field.answers && (
                                                <>
                                                    <div className="preview_option">
                                                        {field.answers.length ? field.answers.map((elem, idx) => {
                                                            return (<p>Option {idx + 1}) {elem}</p>)
                                                        }) : field.answers}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row opt_wrapper">
                                    <div className="col-md-8">
                                        <label className="form-label">Correct Option(s)</label>
                                        <textarea
                                            placeholder="Enter correct answer. For Multiple correct answer, put each answer on new line"
                                            className='form-control'
                                            value={field.correctAnswer ? field.correctAnswer.join('\n') : ""}
                                            onChange={e => handleChangeCorrectAnswers(idx, e)} rows={10}
                                        />
                                        <small><i className="fas fa-info-circle"/> Enter correct answer. For Multiple answers, put each answer on new line</small>
                                    </div>
                                    <div className="col-md-4">
                                        <span>Options Preview </span>
                                        {
                                            field.correctAnswer && (
                                                <>
                                                    <div className="preview_option">
                                                        {field.correctAnswer.length ? field.correctAnswer.map((elem, idx) => {
                                                            return (<p>Answer {idx + 1}) {elem}</p>)
                                                        }) : field.correctAnswer}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="mt-2 mb-5 text-right">
                    <button type="button" onClick={() => handleAdd()} className='btn btn-primary'>
                        <i className="fas fa-plus"/> Add Another Question
                    </button>
                </div>


                <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>

            <h2 className='form_heading'>
                {course.title}'s Evaluations
            </h2>
            {
                course.Exams.length ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Exam Title</th>
                                    <th>Question(s)</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {course.Exams.map(function (exam) {
                                    return (

                                        <tr>
                                            <td>{exam.title}</td>
                                            <td>{exam.questions.length} Question(s)</td>

                                            <td>
                                                <div className="d-flex">
                                                    <Link to={`#`}
                                                          className='btn btn-danger tbl_btn '
                                                          onClick={(e) => showConfirmationModal(e, exam.id)}>Delete</Link>
                                                    <Link to={`#`} target='_blank'
                                                          className='btn btn-primary tbl_btn ml-2 mr-2'
                                                          onClick={async function (e) {
                                                              e.preventDefault();
                                                              await setSelectedExam(exam);
                                                              window.$('#editEvaluationModal').modal({
                                                                  backdrop: 'static',
                                                                  keyboard: false,
                                                                  show: true
                                                              })
                                                          }}>Edit</Link>
                                                    <Link
                                                        to={`/exam_submission/${exam.id}/preview`}
                                                        target='_blank'
                                                        className='btn btn-dark tbl_btn'>Preview</Link>
                                                    <Link
                                                        to={`/submissions/${exam.id}`}
                                                        target='_blank'
                                                        className='btn btn-success tbl_btn ml-2'>All Submissions</Link>
                                                </div>

                                            </td>
                                        </tr>
                                    )

                                })}
                                </tbody>
                            </table>
                        </>
                    )
                    : (<NotFoundPage/>)
            }
            {selectedEvaluation ? (<EditEvaluationModal selectedEvaluation={selectedEvaluation} course={course}/>) : ''}
            <ModalEvaluationDelete handleOnDelete={handleOnDelete}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchCreateEvaluationAction: (courseId, creatorId, title, type, questions, onSuccess, onError) => dispatch(courseEvaluationCreate({
        courseId, creatorId, title, type, questions
    }, onSuccess, onError)),
    dispatchDeleteEvaluationAction: (examId, onSuccess, onError) =>
        dispatch(deleteExamById(examId, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvaluation)


const ModalEvaluationDelete = ({handleOnDelete}) => (
    <div className="modal" id="confirmationEvaluationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this Course Evaluation?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);