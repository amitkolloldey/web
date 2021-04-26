import React from 'react'
import {loginUser} from "../redux/actions/authActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const Login = ({dispatchLoginAction}) => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        dispatchLoginAction(data.phone, data.password, (response) => {
            if (response) {
                setTimeout(() => window.location.reload(), 300)
            }
            toast.success('You are logged in');
        }, (message) => toast.error(message))

        return false;
    }

    return (
        <div className='login_form'>
            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name='phone'
                           placeholder="0173...." ref={register({required: true})} />
                    {errors.phone && (<p className='error'>Phone is required*</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'
                           placeholder="Password" ref={register({required: true})}/>
                    {errors.password && (<p className='error'>Password is required*</p>)}
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
            <div className="form_bottom_link">
                <Link to='/register'>Register</Link>
                <Link to='/otp'>Enter Otp</Link>
                <Link to='/enteremail'>Reset Password</Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (phone, password, onSuccess, onError) => dispatch(loginUser({
        phone, password
    }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Login)