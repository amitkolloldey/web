import React from 'react'
import {connect} from "react-redux";
import {registerUser} from "../redux/actions/authActions";
import {Link, useHistory} from "react-router-dom";
import {toast} from 'react-toastify';
import {useForm} from "react-hook-form";

const Register = ({dispatchRegisterAction}) => {

    let history = useHistory();

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        dispatchRegisterAction(data.name, data.email, data.password, data.phone, data.bio, data.address, data.pic, data.role, () => {
            toast.success('Account Created Successfully!');
            history.push('/otp')
        }, (message) => toast.error(message))
        return false
    }

    return (
        <div className='login_form'>
            <form noValidate className=" p-4" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name"
                           placeholder="Full Name" name='name' ref={register({required: true})}/>
                    {errors.name && (<p className='error'>Name is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone"
                           placeholder="0173...." ref={register({required: true})}/>
                    {errors.phone && (<p className='error'>Phone is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email'
                           placeholder="Your email" ref={register({required: true})}/>
                    {errors.email && (<p className='error'>Email is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'
                           placeholder="Password" ref={register({required: true})}/>
                    {errors.password && (<p className='error'>Password is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Short Bio</label>
                    <textarea name="bio" id="bio" className='form-control' placeholder='Short Bio'
                              ref={register({required: true})}/>
                    {errors.bio && (<p className='error'>Bio is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea name="address" id="address" className='form-control' placeholder='Address'
                              ref={register({required: true})}/>
                    {errors.address && (<p className='error'>Address is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Registering As</label>
                    <select className="form-control" id="role" name='role' defaultValue='Trainee'
                            ref={register({required: true})}>
                        <option value='Trainee'>Trainee</option>
                        <option value='Trainer'>Trainer</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pic" className="form-label">Your Image</label>
                    <input className="form-control" type="file" id="pic" name='pic' ref={register}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <div className="form_bottom_link">
                <Link to='/login'>Login</Link>
                <Link to='/otp'>Enter Otp</Link>
                <Link to='/enteremail'>Reset Password</Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (name, email, password, phone, bio, address, pic, role, onSuccess, onError) => dispatch(registerUser({
        name, email, password, phone, bio, address, pic, role
    }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Register)