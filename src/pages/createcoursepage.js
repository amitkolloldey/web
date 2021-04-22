import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Select from 'react-select'
import {getCourseById, traineeInvite} from "../redux/actions/courseAction";
import {fetchAllUsers} from "../redux/actions/userAction";
import {createOrg, getOrgById, trainerInvite, trainerRequest} from "../redux/actions/orgAction";

const CreateTrainerInvitePage = ({loading, users, match, dispatchCreateOrgAction, dispatchFetchAllUsersAction}) => {

    const [orgname, setOrgName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [options, setOptions] = useState([]);
    const {orgId} = match.params;

    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        if (!options.length > 0) {
            dispatchFetchAllUsersAction()
        }
    }, []);

    if (users.length > 0) {
        const user_values = users.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })
        if (!options.length > 0) {
            console.log(user_values)
            setOptions(user_values);
        }
    }

    const handleChange = (user) => {
        if (user) {
            users.filter(e => (e.id === user.value)).map((item) => {
                setName(item.name);
                setPhone(item.phone);
                setEmail(item.email);
            })
        } else {
            setName('');
            setPhone('');
            setEmail('');
        }
    };

    const onSubmit = (data) => {
        console.log(data)
        dispatchCreateOrgAction(data.name, data.logo, data.shortDesc, data.description, data.user, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/orgs'), 300)
            }
            toast.success('Organization Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Create Organization</h2>

            <div className='main_content'>
                <div className="request_form">
                    {/*<p className='some_info alert alert-info'>Select and existing Trainer from the select field or fill*/}
                    {/*    the name, email and phone no to invite non existing user. Trainer Will Receive An OTP. After*/}
                    {/*    Validating the OTP they will join this organization.</p>*/}
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className='form-control' name="name" placeholder='Organization name'
                                   ref={register({required: true})}/>
                            {errors.name && (<p className='error'>Name is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="logo" className="form-label">Logo</label>
                            <input className="form-control" type="file" id="logo" name='logo' ref={register}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortDesc" className="form-label">Short Description</label>
                            <textarea name="shortDesc" id="shortDesc" className='form-control'
                                      placeholder='Short Description'
                                      ref={register({required: true})}/>
                            {errors.shortDesc && (<p className='error'>Short Desc is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" id="description" className='form-control'
                                      placeholder='Description'
                                      ref={register({required: true})}/>
                            {errors.description && (<p className='error'>Description is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">Select Admin</label>
                            {
                                options.length > 0 ? (
                                    <Select options={options} onChange={handleChange} />) : ''
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user[name]" className="form-label">Name</label>
                            <input type="text" className='form-control' name="user[name]"
                                   defaultValue={name ? name : ''}
                                   ref={register({required: true})}/>
                            {errors.content && (<p className='error'>Name is required*</p>)}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="user[phone]" className="form-label">Phone</label>
                            <input type="text" name="user[phone]" className='form-control'
                                   defaultValue={phone ? phone : ''}
                                   ref={register({required: true})}/>
                            {errors.content && (<p className='error'>Phone is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user[email]" className="form-label">Email</label>
                            <input type="text" name="user[email]" className='form-control'
                                   defaultValue={email ? email : ''}
                                   ref={register({required: true})}/>
                            {errors.user && (<p className='error'>Email is required*</p>)}
                        </div>

                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers()),
    dispatchCreateOrgAction: (name, logo, shortDesc, description, user, onSuccess, onError) =>
        dispatch(createOrg({name, logo, shortDesc, description, user}, onSuccess, onError)),
})

const mapStateToProps = (state) => ({
    users: state.users,
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrainerInvitePage)



