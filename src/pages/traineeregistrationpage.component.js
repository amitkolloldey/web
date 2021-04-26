import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getCourseById, traineeRequest} from "../redux/actions/courseAction";

const TraineeRegistrationPage = ({loading, match, dispatchTraineeRequestAction, dispatchGetCourseByIdAction, user}) => {
    const [title, setTitle] = useState('');
    const {courseId} = match.params;
    useEffect(() => {
        if (courseId) {
            dispatchGetCourseByIdAction(courseId, (response) => {
                setTitle(response.data.title);
            });
        }
    }, [ ]);

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchTraineeRequestAction(data.content, data.type, data.courseId, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/#/requests'), 300)
            }
            toast.success('Request Sent Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Request To Join {title} </h2>

            <div className='main_content'>
                <div className="request_form">
                    <p className='some_info alert alert-info'>Trainer will receive your request to join this course.</p>
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="cover" className="form-label">Cover Letter</label>
                            <textarea name="content[message]" id="cover" className='form-control'
                                      placeholder='Cover Letter'
                                      ref={register({required: true})}/>
                            <input type="hidden" name='content[entity_name]' value={title}
                                   ref={register({required: true})}/>
                            <input type="hidden" name='content[user_name]' value={user.name}
                                   ref={register({required: true})}/>
                            {errors.cover && (<p className='error'>Cover Letter is required*</p>)}
                            <input type="hidden" name='type' defaultValue='trainee_enrollment'
                                   ref={register({required: true})}/>
                            <input type="hidden" name='courseId' defaultValue={courseId}
                                   ref={register({required: true})}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Request</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchTraineeRequestAction: (content, type, courseId, onSuccess, onError) =>
        dispatch(traineeRequest({content, type, courseId}, onSuccess, onError)),
    dispatchGetCourseByIdAction: (courseId, onSuccess) =>
        dispatch(getCourseById(courseId, onSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(TraineeRegistrationPage)

