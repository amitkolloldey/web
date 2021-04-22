import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import {connect} from "react-redux";
import {
    chapterExamCreate,
} from "../../../redux/actions/chapterAction";

import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {deleteExamById, fetchAllChapters} from "../../../redux/actions/chapterAction";
import {Link} from "react-router-dom";
import NotFound from "../../../components/notfound.component";
import NotFoundPage from "../../notfoundpage";
import EditExamModal from "../../../components/editexam.component";

function CreateExam({course, user, dispatchFetchAllChaptersAction, dispatchCreateExamAction, dispatchDeleteExamAction}) {
    const [options, setOptions] = useState([]);
    const {register, handleSubmit, errors} = useForm();
    const [chapter, setChapter] = useState([]);
    let [selectedExamId, setSelectedExamId] = useState();
    const [questions, setFields] = useState([{
        question: null,
        number: null,
        answerType: 'radio',
        answers: null,
        correctAnswer: null
    }]);

    let [selectedExam, setSelectedExam] = useState();

    const handleChange = (chapter) => {
        if (chapter) {
            setChapter(chapter.value)
        }
    };

    useEffect(() => {
        dispatchFetchAllChaptersAction([], ({data}) => {
            if (data && data.length > 0) {
                const chapter_values = data.filter(function (item) {
                    return (item.parentId === null && item.courseId === course.id);
                }).map(item => {
                    return {
                        label: item.title,
                        value: item.id
                    };
                })
                if (!options.length > 0) {
                    setOptions(chapter_values);
                }
            }
        }, (message) => toast.error(message));
    }, [dispatchFetchAllChaptersAction, course.id, options.length]);

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
        dispatchCreateExamAction(course.id, chapter, user.userId, data.title, data.type, questions, () => {
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/4'), 300)
            toast.success('Exam Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const handleOnDelete = () => {
        dispatchDeleteExamAction(selectedExamId, () => {
            window.$('#confirmationModal').modal('hide');
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/4'), 300)
            toast.success('Exam deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, examId) => {
        event.preventDefault();
        setSelectedExamId(examId);
        window.$('#confirmationExamModal').modal('show');
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
                Create Exam For Individual Chapter
            </h2>
            <form noValidate className="p-4"
                  encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="parentId" className="form-label">Select Chapter</label>
                    {
                        options.length > 0 ? (
                            <Select options={options} onChange={handleChange}/>) : ''
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="title" placeholder="Enter File Title"
                           ref={register({required: true})}/>
                    {errors.title && (<p className='error'>Title is required*</p>)}

                    <input type="hidden" name='type' ref={register({required: true})} value='chapter_exam'/>
                    {errors.type && (<p className='error'>Exam Type is required*</p>)}
                </div>

                {
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
                                        <button type="button" onClick={() => handleRemove(idx)}
                                                className='btn btn-danger'>
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
                                            value={field.answerType || "radio"}
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
                                            <small><i className="fas fa-info-circle"/> Enter Each option on new
                                                line</small>
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
                                                placeholder="Enter correct answer. For Multiple answers, put each answer on new line"
                                                className='form-control'
                                                value={field.correctAnswer ? field.correctAnswer.join('\n') : ""}
                                                onChange={e => handleChangeCorrectAnswers(idx, e)} rows={10}/>
                                            <small><i className="fas fa-info-circle"/> Enter correct answer. For
                                                Multiple
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
                {course.title}'s Chapter's Exams
            </h2>
            {
                course.Chapters.length ? (
                        course.Chapters.map(function (chapter) {
                            return (
                                <>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th className='text-center'>{chapter.title}</th>
                                        </tr>
                                        </thead>
                                    </table>
                                    {
                                        chapter.Exams.length ? (
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
                                                    {
                                                        chapter.Exams.map(function (exam) {
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
                                                                                      window.$('#editExamModal').modal({
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
                                                                                className='btn btn-success tbl_btn ml-2'>All
                                                                                Submissions</Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </>

                                        ) : <NotFoundPage/>
                                    }
                                </>
                            )
                        }))
                    : (<NotFound/>)
            }
            {selectedExam ? (<EditExamModal selectedExam={selectedExam} course={course}/>) : ''}
            <ModalExamDelete handleOnDelete={handleOnDelete}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllChaptersAction: (data, onSuccess, onError) => dispatch(fetchAllChapters({}, onSuccess, onError)),
    dispatchCreateExamAction: (courseId, chapterId, creatorId, title, type, questions, onSuccess, onError) => dispatch(chapterExamCreate({
        courseId, chapterId, creatorId, title, type, questions
    }, onSuccess, onError)),
    dispatchDeleteExamAction: (examId, onSuccess, onError) =>
        dispatch(deleteExamById(examId, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateExam)


const ModalExamDelete = ({handleOnDelete}) => (
    <div className="modal" id="confirmationExamModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this Chapter Exam ?</p>
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