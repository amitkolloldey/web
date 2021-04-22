import React from 'react'
import {connect} from "react-redux";
import {updateCurrentUser} from '../redux/actions/authActions';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

const ProfilePage = ({loading, user, dispatchUpdateCurrentUserAction}) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchUpdateCurrentUserAction(data.userId, data.name, data.bio, data.address, data.pic, data.cv,(response) => {
            if (response) {
                setTimeout(() => window.location.replace('/profilepage/'+user.id), 300)
            }
            toast.success('Profile Updated Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>{user.name}'s Profile</h2>
            <div className='main_content'>
                <div className="request_form">
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Full Name" name='name' ref={register({required: true})}
                                   defaultValue={user.name}/>
                            <input type="hidden" className="form-control" id="userId" name='userId'
                                   ref={register({required: true})}
                                   defaultValue={user.userId}/>
                            {errors.name && (<p className='error'>Name is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" disabled
                                   placeholder="0173...." defaultValue={user.phone}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" disabled className="form-control" id="email" name='email'
                                   placeholder="Your email" defaultValue={user.email}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Short Bio</label>
                            <textarea name="bio" id="bio" className='form-control' placeholder='Short Bio'
                                      ref={register({required: true})} defaultValue={user.bio}/>
                            {errors.bio && (<p className='error'>Bio is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea name="address" id="address" className='form-control' placeholder='Address'
                                      ref={register({required: true})} defaultValue={user.address}/>
                            {errors.address && (<p className='error'>Address is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pic" className="form-label">Your Image</label>
                            <input className="form-control" type="file" id="pic" name='pic' ref={register}/>
                            <div className="preview">
                                {
                                    user.pic ? (<div className="preview"><img src={user.pic}/></div>) : ''
                                }
                            </div>
                        </div>
                        {
                            user.role === 'Trainer' ? (<div className="mb-3">
                                <label htmlFor="cv" className="form-label">Your CV</label>
                                <input className="form-control" type="file" id="cv" name='cv' ref={register}/>
                                {
                                    user.cv ? (<div className="preview"><a href={user.cv} className='btn btn-primary' target="_blank"><i className="fas fa-eye"/> View CV</a></div>) : ''
                                }
                            </div>) : ''
                        }

                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    dispatchUpdateCurrentUserAction: (userId, name, bio, address, pic, cv, onSuccess, onError) =>
        dispatch(updateCurrentUser({userId, name, bio, address, pic, cv}, onSuccess, onError))
})


const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

