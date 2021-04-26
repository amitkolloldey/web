import React from 'react'
import {resetPass} from "../redux/actions/authActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const Reset = ({dispatchResetAction}) => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        dispatchResetAction(data.otp, data.password, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/#/'), 300)
            }
            toast.success('Your Password Was Reset!');
        }, (message) => toast.error(message))
        return false
    }
    return (
        <div className='login_form'>
            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Otp</label>
                    <input type="text" className="form-control" id="otp"
                           placeholder="123456" ref={register({required: true})} name='otp'/>
                    {errors.otp && (<p className='error'>6 digit OTP code is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter New Password</label>
                    <input type="password" className="form-control" id="password" ref={register({required: true})}
                           name='password'/>
                    {errors.password && (<p className='error'>New Password is required*</p>)}
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
    dispatchResetAction: (otp, password, onSuccess, onError) => dispatch(resetPass({
        otp, password
    }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Reset)