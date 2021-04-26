import {connect} from "react-redux";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {updateChapter} from "../redux/actions/chapterAction";
import React from "react";

function EditModal({selectedChapter, dispatchEditChapterAction, course}) {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = ( data) => {

        dispatchEditChapterAction(selectedChapter.id, data.title, data.instructions, data.course_weight, course.id, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/2'), 300)
            window.$('#editModal').modal('hide');
            toast.success('Chapters Updated Successfully!');
        },(message) => {
            window.$('#editModal').modal('hide');
            toast.error(`Error: ${message}`);
        })

        return false;
    }

    const cancelEdit = () => {
        document.getElementById("editform").reset();
    }

    return   (
        <>
            <div className="modal" id="editModal" tabIndex="-1" role="dialog">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={cancelEdit}><i className="fas fa-times"/></button>
                        </div>
                        <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                              encType='multipart/form-data' id='editform'>
                            <div className='single_field_wrap'>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Title" className='form-control' name='title'
                                        defaultValue={selectedChapter.title} ref={register({required: true})}
                                    />
                                    {errors.title && (<p className='error'>Title is required*</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Instructions</label>
                                    <textarea cols="30" rows="10" name='instructions' className="form-control" ref={register({required: true})}  defaultValue={selectedChapter.instructions} placeholder='Enter Instruction'/>
                                    {errors.instructions && (<p className='error'>Instructions are required*</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Course Weight</label>
                                    <input
                                        type="number"
                                        placeholder="2" className='form-control' name='course_weight'
                                        defaultValue={selectedChapter.course_weight} ref={register({required: true})}
                                    />
                                    {errors.course_weight && (<p className='error'>Course Weight is required*</p>)}
                                    <small>
                                        Course Weight Will Be Use to calculate the percentage of course completion from
                                        this chapter. Put value from 1 - 10
                                    </small>
                                </div>
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
    dispatchEditChapterAction: (chapterId, title, instructions, course_weight, course_id, onSuccess, onError) => dispatch(updateChapter(chapterId, {
        title, instructions, course_weight, course_id }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)