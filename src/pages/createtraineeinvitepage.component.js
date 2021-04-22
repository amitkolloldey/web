import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Select from 'react-select'
import {getCourseById, traineeInvite} from "../redux/actions/courseAction";
import {fetchAllTrainees} from "../redux/actions/userAction";

const CreateTraineeInvitePage = ({user,  match, dispatchTraineeInviteAction, dispatchGetCourseByIdAction, dispatchFetchAllTraineesAction}) => {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addnew, setAddNew] = useState(false);
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState();
    const {courseId} = match.params;

        useEffect(() => {
            dispatchGetCourseByIdAction(courseId, (response) => {
                dispatchFetchAllTraineesAction((res ) => {
                    setUsers(res.data)
                })
                setTitle(response.data.title);
            });

        }, []);

    if (users && users.length > 0) {
        const user_values = users.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })

        if (!options.length > 0) {
            setOptions(user_values);
        }
    }

    const handleChange = (user) => {
        users.filter(e => (e.id === user.value)).map((item) => {
            setName(item.name);
            setPhone(item.phone);
            setEmail(item.email);
        })
    };

    const handleAddNew = (e) => {
        setAddNew(!addnew)
    };

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchTraineeInviteAction(data.content, data.type, data.courseId, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/requests'), 300)
            }
            toast.success('Request Sent Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Invite Trainee To {title} </h2>

            <div className='main_content'>
                <div className="request_form">
                    <p className='some_info alert alert-info'>Select and existing Trainee from the select field or fill
                        the name, email and phone no to invite non existing user. Trainee Will Receive An OTP. After
                        Validating the OTP they will join this course.</p>

                    <button onClick={handleAddNew} className='btn btn-success mb-3 pull-right'>{ !addnew  ? ('Add New') : 'Send To Existing' }</button>
                    {
                        addnew  ? (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="content[name]" className="form-label">Name</label>
                                        <input type="text" className='form-control' name="content[name]"
                                               ref={register({required: true})} placeholder='Name'/>
                                        {errors.content && (<p className='error'>Name is required*</p>)}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="content[phone]" className="form-label">Phone</label>
                                        <input type="text" name="content[phone]" className='form-control'
                                               ref={register({required: true})} placeholder='Phone'/>
                                        {errors.content && (<p className='error'>Phone is required*</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="content[email]" className="form-label">Email</label>
                                        <input type="text" name="content[email]" className='form-control'
                                               ref={register({required: true})} placeholder='Email'/>
                                        {errors.content && (<p className='error'>Email is required*</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cover" className="form-label">Message</label>
                                        <textarea name="content[message]" id="cover" className='form-control'
                                                  placeholder='Invitation message'
                                                  ref={register({required: true})}/>
                                        {errors.content && (<p className='error'>Invitation message is required*</p>)}
                                    </div>
                                    <input type="hidden" name='type' defaultValue='trainee_invite'
                                           ref={register({required: true})}/>

                                    <input type="hidden" name='courseId' defaultValue={courseId}
                                           ref={register({required: true})}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Create & Send Invitation</button>
                            </form>
                        ) : (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="user" className="form-label">Select Trainee</label>
                                        {
                                            options.length > 0 ? (
                                                <Select options={options} onChange={handleChange}/>) : ''
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="content[name]" className="form-label">Name</label>
                                        <input type="text" className='form-control' name="content[name]"
                                               defaultValue={name ? name : ''}
                                               ref={register({required: true})} placeholder='Name'/>
                                        {errors.content && (<p className='error'>Name is required*</p>)}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="content[phone]" className="form-label">Phone</label>
                                        <input type="text" name="content[phone]" className='form-control'
                                               defaultValue={phone ? phone : ''}
                                               ref={register({required: true})} placeholder='Phone'/>
                                        {errors.content && (<p className='error'>Phone is required*</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="content[email]" className="form-label">Email</label>
                                        <input type="text" name="content[email]" className='form-control disabledTextInput'
                                               defaultValue={email ? email : ''}
                                               ref={register({required: true})} placeholder='Email'/>
                                        {errors.content && (<p className='error'>Email is required*</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cover" className="form-label">Message</label>
                                        <textarea name="content[message]" id="cover" className='form-control'
                                                  placeholder='Invitation message'
                                                  ref={register({required: true})}/>
                                        {errors.content && (<p className='error'>Invitation message is required*</p>)}
                                    </div>
                                    <input type="hidden" name='type' defaultValue='trainee_invite'
                                           ref={register({required: true})}/>

                                    <input type="hidden" name='courseId' defaultValue={courseId}
                                           ref={register({required: true})}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Invitation</button>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllTraineesAction: (onSuccess) => dispatch(fetchAllTrainees(onSuccess)),
    dispatchGetCourseByIdAction: (courseId, onSuccess) =>
        dispatch(getCourseById(courseId, onSuccess)),
    dispatchTraineeInviteAction: (content, type, courseId, onSuccess, onError) =>
        dispatch(traineeInvite({content, type, courseId}, onSuccess, onError)),
})

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTraineeInvitePage)



