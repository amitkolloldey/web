import React, {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {chapterCreate} from "../../../redux/actions/chapterAction";
import NotFound from "../../../components/notfound.component";
import {Link} from "react-router-dom";
import EditModal from "../../../components/editchapter.component";
import {deleteChapterById} from "../../../redux/actions/chapterAction";

function CreateChapter({course, dispatchCreateChapterAction,  dispatchDeleteChapterAction}) {

    const [chapters, setFields] = useState([{
        title: null,
        instructions: null,
        course_weight: null,
        courseId: course.id
    }]);

    let [selectedChapter, setSelectedChapter] = useState();

    let [selectedChapterId, setSelectedChapterId] = useState();

    function handleChangeTitle(i, event) {
        const values = [...chapters];
        values[i].title = event.target.value;
        setFields(values);
    }

    function handleChangeInstructions(i, event) {
        const values = [...chapters];
        values[i].instructions = event.target.value;
        setFields(values);
    }

    function handleChangeCourseWeight(i, event) {
        const values = [...chapters];
        values[i].course_weight = event.target.value;
        setFields(values);
    }

    const onSubmit = (e, data) => {
        e.preventDefault()
        dispatchCreateChapterAction(chapters, () => {
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/2'), 300)
            toast.success('Chapters Created Successfully!');
        }, (message) => toast.error(message))

        return false;
    }

    const handleOnDelete = () => {
        dispatchDeleteChapterAction(selectedChapterId, () => {
            window.$('#confirmationModal').modal('hide');
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/2'), 300)
            toast.success('Chapter deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, chapterId) => {
        event.preventDefault();
        setSelectedChapterId(chapterId);
        window.$('#confirmationModal').modal('show');
    };

    return (
        <>
            <h2 className='form_heading'>
                Create Chapters For {course.title}
            </h2>
            <form noValidate className="p-4" onSubmit={onSubmit}
                  encType='multipart/form-data'>
                {chapters.map((field, idx) => {
                    return (
                        <div key={`${field}-${idx}`} className='single_field_wrap'>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter Title" className='form-control'
                                    value={field.title || ""}
                                    onChange={e => handleChangeTitle(idx, e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Instruction</label>
                                <textarea cols="30" rows="10" className="form-control" value={field.instructions || ""} placeholder='Enter Instruction' onChange={e => handleChangeInstructions(idx, e)}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Course Weight</label>
                                <input
                                    type="number"
                                    placeholder="2" className='form-control'
                                    value={field.course_weight || ""}
                                    onChange={e => handleChangeCourseWeight(idx, e)}
                                />
                                <small>
                                    Course Weight Will Be Use to calculate the percentage of course completion from this
                                    chapter. Put value from 1 - 10
                                </small>
                            </div>
                        </div>
                    );
                })}

                <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>

            </form>

            <h2 className='form_heading'>
                {course.title}'s Chapters
            </h2>

            {
                course.Chapters.length ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Chapter Title</th>
                                    <th>Chapter Materials</th>
                                    <th>Chapter Exams</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    course.Chapters.map(function (item) {
                                        return (
                                            <tr>
                                                <td>{item.title}</td>
                                                <td>
                                                    {
                                                        item.Files.length ? item.Files.map(function (file) {
                                                            return (
                                                                <div className="badge badge-info m-1">{file.title}</div>
                                                            )
                                                        }) : "No File"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.Exams.length ? item.Exams.map(function (exam) {
                                                            return (
                                                                <div className="badge badge-info">{exam.title}</div>
                                                            )
                                                        }) : "No Exam"
                                                    }
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`#`}
                                                              className='btn btn-danger tbl_btn '
                                                              onClick={(e) => showConfirmationModal(e, item.id)}>Delete</Link>

                                                        <Link to={`#`} target='_blank' className='btn btn-primary tbl_btn ml-2 mr-2'
                                                              onClick={async function(e) {e.preventDefault(); await setSelectedChapter(item) ;   window.$('#editModal').modal({backdrop: 'static', keyboard: false, show: true})}}>Edit</Link>
                                                        <Link to={`/chapters/${course.id}/${item.id}`} target='_blank'
                                                              className='btn btn-dark tbl_btn'>Preview</Link>
                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                        </>
                    )
                    : (<NotFound/>)
            }
            {selectedChapter ? (<EditModal selectedChapter={selectedChapter} course={course}/>) : ''}
            <Modal handleOnDelete={handleOnDelete} />
        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories,
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    dispatchCreateChapterAction: (chapters, onSuccess, onError) => dispatch(chapterCreate({
        chapters
    }, onSuccess, onError)),
    dispatchDeleteChapterAction: (chapterId, onSuccess, onError) =>
        dispatch(deleteChapterById(chapterId, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChapter)

const Modal = ({handleOnDelete}) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this Chapter ?</p>
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