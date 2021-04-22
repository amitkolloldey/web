import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Select from 'react-select'
import {fetchAllTrainers} from "../redux/actions/userAction";
import {getOrgById, trainerInvite} from "../redux/actions/orgAction";

const CreateTrainerInvitePage = ({user, match, dispatchTrainerInviteAction, dispatchGetOrgByIdAction, dispatchFetchAllTrainersAction}) => {

    const [orgname, setOrgName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [options, setOptions] = useState([]);
    const [addnew, setAddNew] = useState(false);
    const [users, setUsers] = useState();
    const {orgId} = match.params;

    useEffect(() => {
        if (orgId) {
            dispatchGetOrgByIdAction(orgId, (response) => {
                dispatchFetchAllTrainersAction((res) => {
                    setUsers(res.data)
                })
                setOrgName(response.data.name);
            });
        }
    }, []);

    if (users && users.length > 0) {
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

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchTrainerInviteAction(data.content, data.type, data.orgId, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/requests'), 300)
            }
            toast.success('Request Sent Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const handleAddNew = (e) => {
        setAddNew(!addnew)
    };


    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Invite Trainer To {orgname} </h2>
            <div className='main_content'>
                <div className="request_form">
                    <p className='some_info alert alert-info'>Select and existing Trainer from the select field or fill
                        the name, email and phone no to invite non existing user. Trainer Will Receive An OTP. After
                        Validating the OTP they will join this organization.</p>

                    <button onClick={handleAddNew}
                            className='btn btn-success mb-3 pull-right'>{!addnew ? ('Add New') : 'Send To Existing'}</button>
                    {
                        addnew ? (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
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
                                        <input type="text" name="content[email]" className='form-control'
                                               defaultValue={email ? email : ''}
                                               ref={register({required: true})} placeholder='Email'/>
                                        {errors.content && (<p className='error'>Email is required*</p>)}
                                        <input type="hidden" name='content[entity_name]' value={name}
                                               ref={register({required: true})}/>
                                        <input type="hidden" name='content[user_name]' value={user.name}
                                               ref={register({required: true})}/>
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

                                    <input type="hidden" name='orgId' defaultValue={orgId}
                                           ref={register({required: true})}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Create & Send Invitation</button>
                            </form>
                        ) : (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="user" className="form-label">Select Trainer</label>
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
                                        <input type="text" name="content[email]"
                                               className='form-control disabledTextInput'
                                               defaultValue={email ? email : ''}
                                               ref={register({required: true})} placeholder='Email'/>
                                        {errors.content && (<p className='error'>Email is required*</p>)}
                                        <input type="hidden" name='content[entity_name]' value={name}
                                               ref={register({required: true})}/>
                                        <input type="hidden" name='content[user_name]' value={user.name}
                                               ref={register({required: true})}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cover" className="form-label">Message</label>
                                        <textarea name="content[message]" id="cover" className='form-control'
                                                  placeholder='Invitation message'
                                                  ref={register({required: true})}/>
                                        {errors.content && (<p className='error'>Invitation message is required*</p>)}
                                    </div>
                                    <input type="hidden" name='type' defaultValue='trainer_invite'
                                           ref={register({required: true})}/>

                                    <input type="hidden" name='orgId' defaultValue={orgId}
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
    dispatchFetchAllTrainersAction: (onSuccess) => dispatch(fetchAllTrainers(onSuccess)),
    dispatchGetOrgByIdAction: (orgId, onSuccess) =>
        dispatch(getOrgById(orgId, onSuccess)),
    dispatchTrainerInviteAction: (content, type, orgId, onSuccess, onError) =>
        dispatch(trainerInvite({content, type, orgId}, onSuccess, onError)),
})

const mapStateToProps = (state) => ({
    users: state.users.users,
    loading: state.loading,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrainerInvitePage)



