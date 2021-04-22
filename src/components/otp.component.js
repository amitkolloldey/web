import React from 'react'
import {otpUser} from "../redux/actions/authActions";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const Otp = ({dispatchOtpAction}) => {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        dispatchOtpAction(data.otp, (response) => {
            console.log(response)
            if (response.data && response.data.request && response.data.request.courseId) {
                setTimeout(() => window.location.replace('/courses/' + response.data.request.courseId), 300)
            } else if (response.data && response.data.request && response.data.request.orgId) {
                setTimeout(() => window.location.replace('/orgs/'+ response.data.request.orgId), 300)
            } else {
                setTimeout(() => window.location.replace('/'), 300)
            }
            toast.success('Successfully Validated!');
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
                <button type="submit" className="btn btn-primary">Validate</button>
            </form>
            <div className="form_bottom_link">
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                <Link to='/enteremail'>Reset Password</Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchOtpAction: (otp, onSuccess, onError) => dispatch(otpUser({
        otp
    }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Otp)