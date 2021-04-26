import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import {connect} from "react-redux";
import {
    chapterFileCreate
} from "../../../redux/actions/chapterAction";

import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {deleteFileById, fetchAllChapters} from "../../../redux/actions/chapterAction";
import {Link} from "react-router-dom";
import NotFound from "../../../components/notfound.component";
import NotFoundPage from "../../notfoundpage";
import EditFileModal from "../../../components/editfile.component";

function CreateFiles({course, dispatchFetchAllChaptersAction, dispatchCreateFileAction, dispatchDeleteFileAction}) {
    const [options, setOptions] = useState([]);
    const {register, handleSubmit, errors} = useForm();
    const [chapter, setChapter] = useState([]);
    let [selectedFile, setSelectedFile] = useState();
    let [selectedFileId, setSelectedFileId] = useState();

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

    const onSubmit = (data) => {
        dispatchCreateFileAction(chapter, data.title, data.description, data.file, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/3'), 300)
            toast.success('Files Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const handleOnDelete = () => {
        dispatchDeleteFileAction(selectedFileId, () => {
            window.$('#confirmationModal').modal('hide');
            setTimeout(() => window.location.replace('/course_builder/edit/' + course.id + '/3'), 300)
            toast.success('File deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, fileId) => {
        event.preventDefault();
        setSelectedFileId(fileId);
        window.$('#confirmationFileModal').modal('show');
    };

    return (
        <>
            <h2 className='form_heading'>
                Add Materials / Files For Individual Chapter
            </h2>
            <form noValidate className="p-4"
                  encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="parentId" className="form-label">Select Chapter</label>
                    {
                        options.length > 0 ? (
                            <Select options={options} onChange={handleChange} />) : ''
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="title" placeholder="Enter File Title"
                           ref={register({required: true})}/>
                    {errors.title && (<p className='error'>Title is required*</p>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name='description' id="description"
                              placeholder="Enter Description"
                              ref={register({required: true})}/>
                    {errors.description && (<p className='error'>Description is required*</p>)}
                </div>
                <div className="form-group">
                    <label htmlFor="file" className="form-label">File</label>
                    <input type="file" className="form-control" name='file' id="file"
                           ref={register({required: true})}/>
                    {errors.file && (<p className='error'>File is required*</p>)}
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>

            <h2 className='form_heading'>
                { course.title}'s Chapter's Materials
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
                                        chapter.Files.length ? (
                                            <>
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>File Title</th>
                                                        <th>File Url</th>
                                                        <th>File Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        chapter.Files.map(function (file) {
                                                            return (
                                                                <tr>
                                                                    <td>{file.title}</td>
                                                                    <td><a href={file.url} target='_blank'>{file.url}</a>
                                                                    </td>
                                                                    <td>{file.type}</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <Link to={`#`}
                                                                                  className='btn btn-danger tbl_btn '
                                                                                  onClick={(e) => showConfirmationModal(e, file.id)}>Delete</Link>
                                                                            <Link to={`#`} target='_blank'
                                                                                  className='btn btn-primary tbl_btn ml-2 mr-2'
                                                                                  onClick={async function (e) {
                                                                                      e.preventDefault();
                                                                                      await setSelectedFile(file);
                                                                                      window.$('#editFileModal').modal({
                                                                                          backdrop: 'static',
                                                                                          keyboard: false,
                                                                                          show: true
                                                                                      })
                                                                                  }}>Edit</Link>
                                                                            <Link
                                                                                to={`/chapters/${course.id}/${chapter.id}`}
                                                                                target='_blank'
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

                                        ) : <NotFoundPage/>
                                    }
                                </>
                            )
                        }))
                    : (<NotFound/>)
            }
            {selectedFile ? (<EditFileModal selectedFile={selectedFile} course={course}/>) : ''}
            <ModalFileDelete handleOnDelete={handleOnDelete}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllChaptersAction: (data, onSuccess, onError) => dispatch(fetchAllChapters({}, onSuccess, onError)),
    dispatchCreateFileAction: (chapter, title, description, file, onSuccess, onError) => dispatch(chapterFileCreate({
        chapter, title, description, file
    }, onSuccess, onError)),
    dispatchDeleteFileAction: (fileId, onSuccess, onError) =>
        dispatch(deleteFileById(fileId, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateFiles)


const ModalFileDelete = ({handleOnDelete}) => (
    <div className="modal" id="confirmationFileModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this Chapter Material ?</p>
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