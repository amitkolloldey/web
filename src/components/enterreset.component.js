import React from 'react'
import {enterResetEmail} from "../redux/actions/authActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const Reset = ({dispatchEnterResetAction}) => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        dispatchEnterResetAction(data.email, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/#/reset'), 300)
            }
            toast.success('Otp Sent to Your Email!');
        }, (message) => toast.error(message))
        return false
    }
    return (
        <div className='login_form'>
            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"
                           placeholder="Your Email" ref={register({required: true})} name='email'/>
                    {errors.email && (<p className='error'>Email is required*</p>)}
                </div>
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>
            <div className="form_bottom_link">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link to='/otp'>Enter Otp</Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchEnterResetAction: (email, onSuccess, onError) => dispatch(enterResetEmail({
        email
    }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Reset)