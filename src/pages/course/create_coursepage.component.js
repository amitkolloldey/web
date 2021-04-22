import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {connect} from "react-redux";
import {createCourse} from "../../redux/actions/courseAction";
import {getOrgById} from "../../redux/actions/orgAction";

function CreateCoursePage({props, dispatchCreateCourseAction, match, dispatchGetOrgByIdAction}) {

    const {register, handleSubmit, errors} = useForm();
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const {orgId} = match.params;
    const [name, setName] = useState('');

    const onSubmit = (data) => {
        dispatchCreateCourseAction(orgId, data.title, data.banner, data.shortDesc, description, objective, data.passing_mark, data.published, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/course_builder/edit/'+response.data.id), 300)
            }
            toast.success('Course Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    useEffect(() => {
        if (orgId) {
            dispatchGetOrgByIdAction(orgId, (response) => {
                console.log(response)
                if (!name){
                    setName(response.data.name);
                }
            });
        }
    }, [dispatchGetOrgByIdAction, match.params]);

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Course Builder For The Organization {name ? name : ''}</h2>
            <div className="multi_step_wrapper">

                <div className='main_content'>
                    <div className="request_form">
                        <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                              encType='multipart/form-data'>
                            <div className="form-group">
                                <label htmlFor="title">Course Title</label>
                                <input type="text" className="form-control" name='title' id="title" placeholder="Enter Course Title"
                                       ref={register({required: true})}/>
                                {errors.title && (<p className='error'>Title is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="banner">Course Banner</label>
                                <input type="file" className="form-control" id="banner" name='banner'
                                       ref={register({required: true})}/>
                                {errors.banner && (<p className='error'>Banner is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="shortDesc">Short Description</label>
                                <textarea className="form-control" id="shortDesc" name='shortDesc' rows="3"
                                          ref={register({required: true})}/>
                                {errors.shortDesc && (<p className='error'>Short Description is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Course Description</label>
                                <ReactQuill theme="snow" name='description' onChange={setDescription}/>
                                {!description ? 'Please Enter Some Description' : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="objective">Course Objective</label>
                                <ReactQuill theme="snow" name='objective' ref={register({required: true})} onChange={setObjective}/>
                                {!objective ? 'Please Enter Some Objective' : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="passing_mark">Passing Mark</label>
                                <input type="number" className="form-control" id="passing_mark" name='passing_mark'
                                       ref={register({required: true})}/>
                                {errors.passing_mark && (<p className='error'>Passing Mark is required*</p>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="published">Status</label>
                                <select className="form-control " name='published' ref={register({required: true})}>
                                    <option value='1'>Published</option>
                                    <option value='0'>Draft</option>
                                </select>
                                {errors.published && (<p className='error'>Status is required*</p>)}
                            </div>
                            <div className="form-group">
                                <button type='submit' className='btn btn-primary'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchCreateCourseAction: (orgId, title, banner, shortDesc, description, objective, passing_mark, published, onSuccess, onError) => dispatch(createCourse({orgId, title, banner, shortDesc, description, objective, passing_mark, published
    }, onSuccess, onError)),
    dispatchGetOrgByIdAction: (orgId, onSuccess) =>
        dispatch(getOrgById(orgId, onSuccess)),
})

export default connect(null, mapDispatchToProps)(CreateCoursePage)