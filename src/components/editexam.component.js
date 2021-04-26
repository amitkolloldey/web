import {connect} from "react-redux";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {updateExam} from "../redux/actions/chapterAction";

function EditExamModal({selectedExam, dispatchUpdateExamAction, course}) {

    const {register, handleSubmit, errors} = useForm();

    const [questions, setFields] = useState(selectedExam.questions);

    function handleChangeQuestion(i, event) {
        const values = [...questions];
        values[i].question = event.target.value;
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

    function handleAnswerType(i, val) {
        const values = [...questions];
        values[i].answerType = val
        setFields(values);
    }

    const onSubmit = (data) => {
        dispatchUpdateExamAction(selectedExam.id, data.title, data.type, questions, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/4'), 300)
            window.$('#editExamModal').modal('hide');
            toast.success('Exam Updated Successfully!');
        }, (message) => {
            window.$('#editExamModal').modal('hide');
            toast.error(`Error: ${message}`);
        })
        return false;
    }

    const cancelEdit = () => {
        document.getElementById("editexamform").reset();
    }

    function handleAdd() {
        const values = [...questions];
        values.push({question: null, number: null, answerType: 'radio', answers: null, correctAnswer: null});
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...questions];
        console.log(values)
        values.splice(i, 1);
        setFields(values);
    }

    return selectedExam.questions.length ? (
        <>
            <div className="modal" id="editExamModal" tabIndex="-1" role="dialog">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelEdit}>
                                <i className="fas fa-times"/> Close</button>
                        </div>
                        <form noValidate className="p-4"
                              encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} id='editexamform'>

                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" name='title' id="title"
                                       placeholder="Enter File Title"
                                       ref={register({required: true})} defaultValue={selectedExam.title}/>
                                {errors.title && (<p className='error'>Title is required*</p>)}

                                <input type="hidden" name='type' ref={register({required: true})} value='chapter_exam'/>
                                {errors.type && (<p className='error'>Exam Type is required*</p>)}
                            </div>
                            {
                                questions  ? (
                                    questions.map((field, idx) => {
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
                                                        <select name="answerType" className='form-control'
                                                                defaultValue={questions[idx] && questions[idx].answerType ? (
                                                                    questions[idx].answerType) : field.answerType}
                                                                onClick={e => handleAnswerType(idx, e.target.value)}>
                                                            <option value="radio">Single</option>
                                                            <option value="checkbox">Multiple</option>
                                                        </select>
                                                        <small>Select Whither This Question Has Multiple Answer or Not</small>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row opt_wrapper">
                                                            <div className="col-md-12">
                                                                <label className="form-label">Option(s)</label>

                                                                <textarea
                                                                    placeholder="Enter Each option on new line" className='form-control'
                                                                    value={field.answers ? field.answers.join('\n') : ""}
                                                                    onChange={e => handleChangeQuestions(idx, e)} rows={10}
                                                                />
                                                                <small><i className="fas fa-info-circle"/> Enter Each option on new line</small>
                                                            </div>
                                                            <div className="col-md-12">
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
                                                                    placeholder="Enter correct answer. For Multiple answers, put each answer on new line"
                                                                    className='form-control'
                                                                    value={field.correctAnswer ? field.correctAnswer.join('\n') : ""}
                                                                    onChange={e => handleChangeCorrectAnswers(idx, e)} rows={10}/>
                                                                <small><i className="fas fa-info-circle"/> Enter correct answer. For Multiple
                                                                    answers, put each answer on new line</small>
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
                                        })
                                ) : 'Waiting To Load'
                            }
                            <div className="mt-2 mb-5 text-right">
                                <button type="button" onClick={() => handleAdd()} className='btn btn-primary'>
                                    <i className="fas fa-plus"/> Add Another Question
                                </button>
                            </div>
                            <div className="form-group">
                                <button type='submit' className='btn btn-primary'>Update</button>
                            </div>
                        </form>
                        <div className="modal-footer text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelEdit}>
                                <i className="fas fa-times"/> Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    ) : 'Waiting To Load'
}

const mapStateToProps = (state) => ({
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    dispatchUpdateExamAction: (examId, title, type, questions, onSuccess, onError) => dispatch(updateExam(examId, {
        examId, title, type, questions
    }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExamModal)