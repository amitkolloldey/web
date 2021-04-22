import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Select from 'react-select'
import {fetchAllOrgAdmins} from "../redux/actions/userAction";
import {createOrg } from "../redux/actions/orgAction";

const CreateOrgPage = ({ dispatchCreateOrgAction, dispatchFetchAllOrgAdminsAction}) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addnew, setAddNew] = useState(false);
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState();

    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        if (!options.length > 0) {
            dispatchFetchAllOrgAdminsAction((res) => {
                setUsers(res.data)
            })
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

    const handleAddNew = (e) => {
        setAddNew(!addnew)
    };

    const onSubmit = (data) => {
        console.log(data)
        dispatchCreateOrgAction(data.name, data.logo, data.shortDesc, data.description, data.user, data.address, key_people, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/orgs'), 300)
            }
            toast.success('Organization Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }


    const [key_people, setKeyPeople] = useState([{
        name: null,
        designation: null
    }]);

    function handleAdd() {
        const values = [...key_people];
        values.push({
            name: null,
            designation: null
        });
        setKeyPeople(values);
    }

    function handleRemove(i) {
        const values = [...key_people];
        values.splice(i, 1);
        setKeyPeople(values);
    }

    function handleChangeKPName(i, event) {
        const values = [...key_people];
        values[i].name = event.target.value;
        setKeyPeople(values);
    }

    function handleChangeKPDesignation(i, event) {
        const values = [...key_people];
        values[i].designation = event.target.value;
        setKeyPeople(values);
    }

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Create Organization</h2>

            <div className='main_content'>
                <div className="request_form">
                    {/*<p className='some_info alert alert-info'>Select and existing Trainer from the select field or fill*/}
                    {/*    the name, email and phone no to invite non existing user. Trainer Will Receive An OTP. After*/}
                    {/*    Validating the OTP they will join this organization.</p>*/}

                    <button onClick={handleAddNew}
                            className='btn btn-success mb-3 pull-right'>{!addnew ? ('Add With New Org Admin') : 'Send Request To Existing Org Admin'}</button>

                    {
                        addnew ? (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                                  encType='multipart/form-data'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className='form-control' name="name"
                                           placeholder='Organization name'
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
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea name="address" id="address" className='form-control'
                                              placeholder='Organization Address'
                                              ref={register({required: true})}/>
                                    {errors.address && (<p className='error'>Address is required*</p>)}
                                </div>

                                {
                                    key_people.map((field, idx) => {
                                            return (
                                                <div  key={`${field}-${idx}`} className='single_field_wrap'>

                                                    <div className="form-group question_heading text-center">
                                                        <strong>
                                                            <h6>Key Person #{idx + 1}</h6>
                                                        </strong>
                                                    </div>
                                                    {
                                                        idx !== 0 ? (<div className="text-right">
                                                            <button type="button" onClick={() => handleRemove(idx)}
                                                                    className='btn btn-danger'>
                                                                <i className="fas fa-times"/>
                                                            </button>
                                                        </div>) : ''
                                                    }
                                                    <div className="mb-3">
                                                        <label className="form-label">Key Person's Name</label>
                                                        <input type="text" className='form-control' value={field.name || ""}
                                                               onChange={e => handleChangeKPName(idx, e)} placeholder='Key Person Name'/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Key Person's Designation</label>
                                                        <input type="text" className='form-control' value={field.designation || ""}
                                                               onChange={e => handleChangeKPDesignation(idx, e)} placeholder='Key Person Designation'/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }

                                <div className="mt-2 mb-5 text-right">
                                    <button type="button" onClick={() => handleAdd()} className='btn btn-primary'>
                                        <i className="fas fa-plus"/> Add Another Key Person
                                    </button>
                                </div>

                                <div className="org_admin_wrapper p-3">
                                    <strong className='m-2'>Add Organization Admin</strong>
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
                                </div>

                                <button type="submit" className="btn btn-primary">Create</button>
                            </form>
                        ) : (
                            <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                                  encType='multipart/form-data'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className='form-control' name="name"
                                           placeholder='Organization name'
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
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea name="address" id="address" className='form-control'
                                              placeholder='Organization Address'
                                              ref={register({required: true})}/>
                                    {errors.address && (<p className='error'>Address is required*</p>)}
                                </div>
                                {
                                    key_people.map((field, idx) => {
                                            return (
                                                <div  key={`${field}-${idx}`} className='single_field_wrap'>

                                                    <div className="form-group question_heading text-center">
                                                        <strong>
                                                            <h6>Key Person #{idx + 1}</h6>
                                                        </strong>
                                                    </div>
                                                    {
                                                        idx !== 0 ? (<div className="text-right">
                                                            <button type="button" onClick={() => handleRemove(idx)}
                                                                    className='btn btn-danger'>
                                                                <i className="fas fa-times"/>
                                                            </button>
                                                        </div>) : ''
                                                    }
                                                    <div className="mb-3">
                                                        <label className="form-label">Key Person's Name</label>
                                                        <input type="text" className='form-control' value={field.name || ""}
                                                               onChange={e => handleChangeKPName(idx, e)} placeholder='Key Person Name'/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Key Person's Designation</label>
                                                        <input type="text" className='form-control' value={field.designation || ""}
                                                               onChange={e => handleChangeKPDesignation(idx, e)} placeholder='Key Person Designation'/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                <div className="mt-2 mb-5 text-right">
                                    <button type="button" onClick={() => handleAdd()} className='btn btn-primary'>
                                        <i className="fas fa-plus"/> Add Another Key Person
                                    </button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="user" className="form-label">Select Admin</label>
                                    {
                                        options.length > 0 ? (
                                            <Select options={options} onChange={handleChange}/>) : ''
                                    }
                                </div>
                                <div className="org_admin_wrapper p-3">
                                    <strong className='m-2'>Add Organization Admin</strong>
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
                                </div>

                                <button type="submit" className="btn btn-primary">Create</button>
                            </form>
                        )

                    }

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllOrgAdminsAction: (onSuccess) => dispatch(fetchAllOrgAdmins(onSuccess)),
    dispatchCreateOrgAction: (name, logo, shortDesc, description, user, address,key_people, onSuccess, onError) =>
        dispatch(createOrg({name, logo, shortDesc, description, user, address, key_people }, onSuccess, onError)),
})

const mapStateToProps = (state) => ({
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrgPage)



