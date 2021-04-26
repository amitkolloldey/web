import {connect} from "react-redux";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {chapterFileUpdate} from "../redux/actions/chapterAction";
import React from "react";

function EditFileModal({selectedFile, dispatchEditFileAction, course}) {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchEditFileAction(selectedFile.id, data.title, data.description, data.file, () => {
            // console.log(res)
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/3'), 300)
            window.$('#editFileModal').modal('hide');
            toast.success('File Updated Successfully!');
        }, (message) => {
            window.$('#editFileModal').modal('hide');
            toast.error(`Error: ${message}`);
        })
        return false;
    }

    const cancelEdit = () => {
        document.getElementById("editfileform").reset();
    }

    return (
        <>
            <div className="modal" id="editFileModal" tabIndex="-1" role="dialog">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelEdit}>
                                <i className="fas fa-times"/></button>
                        </div>
                        <form noValidate className="p-4"
                              encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} id='editfileform'>

                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" name='title' id="title"
                                       placeholder="Enter File Title"
                                       ref={register({required: true})} defaultValue={selectedFile.title}/>
                                {errors.title && (<p className='error'>Title is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" name='description' id="description"
                                          placeholder="Enter Description"
                                          ref={register({required: true})} defaultValue={selectedFile.description}/>
                                {errors.description && (<p className='error'>Description is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file" className="form-label">File</label>
                                <input type="file" className="form-control" name='file' id="file"
                                       ref={register}/>
                                <strong>
                                    Uploaded File Link: <a href={selectedFile.url} target='_blank' rel='noreferrer'>{selectedFile.url}</a>
                                </strong>
                                {errors.file && (<p className='error'>File is required*</p>)}
                            </div>
                            <div className="form-group">
                                <button type='submit' className='btn btn-primary'>Update</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    dispatchEditFileAction: (fileId, title, description, file, onSuccess, onError) => dispatch(chapterFileUpdate(fileId, {
        title, description, file
    }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFileModal)