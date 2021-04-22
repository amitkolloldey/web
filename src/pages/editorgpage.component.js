import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {fetchAllOrgAdmins} from "../redux/actions/userAction";
import {getOrgById, updateOrg} from "../redux/actions/orgAction";
import NotFoundPage from "./notfoundpage";

const EditOrgPage = ({match, dispatchFetchAllOrgAdminsAction, dispatchGetOrgByIdAction, dispatchUpdateOrgAction, org}) => {

    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState();
    const [key_people, setKeyPeople] = useState( );
    const {orgId} = match.params;

    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        if (!options.length > 0) {
            dispatchFetchAllOrgAdminsAction((res) => {
                setUsers(res.data)
            })
        }
    }, []);

    useEffect(() => {
        dispatchGetOrgByIdAction(orgId, (res) => {
           setKeyPeople(res.data.key_people)
            }, (message) => toast.error(message)
        );
    }, [orgId, dispatchGetOrgByIdAction]);

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

    const onSubmit = (data) => {
        dispatchUpdateOrgAction(orgId, data.name, data.logo, data.shortDesc, data.description, data.address, key_people, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/orgs'), 300)
            }
            toast.success('Organization Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    function handleAdd() {
        const values = [...Object.values(key_people)];
        values.push({
            name: null,
            designation: null
        });
        setKeyPeople(values);
    }

    function handleRemove(i) {
        const values = [...Object.values(key_people)];
        values.splice(i, 1);
        setKeyPeople(values);
    }

    function handleChangeKPName(i, event) {
        const values = [...Object.values(key_people)];
        values[i].name = event.target.value;
        setKeyPeople(values);
    }

    function handleChangeKPDesignation(i, event) {
        const values = [...Object.values(key_people)];
        values[i].designation = event.target.value;
        setKeyPeople(values);
    }

    return org ? (
        <div className='right_wrapper'>
            <h2 className='page_title'>Edit {org.name}</h2>

            <div className='main_content'>
                <div className="request_form">
                    {/*<p className='some_info alert alert-info'>Select and existing Trainer from the select field or fill*/}
                    {/*    the name, email and phone no to invite non existing user. Trainer Will Receive An OTP. After*/}
                    {/*    Validating the OTP they will join this organization.</p>*/}


                    {
                        <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                              encType='multipart/form-data'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className='form-control' name="name"
                                       placeholder='Organization name'
                                       ref={register({required: true})} defaultValue={org.name}/>
                                {errors.name && (<p className='error'>Name is required*</p>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="logo" className="form-label">Logo</label>
                                <input className="form-control" type="file" id="logo" name='logo' ref={register}/>
                                <div className="preview">
                                    {
                                        org.logo ? (<div className="preview"><img src={org.logo}/></div>) : ''
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="shortDesc" className="form-label">Short Description</label>
                                <textarea name="shortDesc" id="shortDesc" className='form-control'
                                          placeholder='Short Description'
                                          ref={register({required: true})} defaultValue={org.shortDesc}/>
                                {errors.shortDesc && (<p className='error'>Short Desc is required*</p>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" id="description" className='form-control'
                                          placeholder='Description' ref={register({required: true})}
                                          defaultValue={org.description}/>
                                {errors.description && (<p className='error'>Description is required*</p>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea name="address" id="address" className='form-control'
                                          placeholder='Organization Address'
                                          ref={register({required: true})} defaultValue={org.address}/>
                                {errors.address && (<p className='error'>Address is required*</p>)}
                            </div>
                            {
                                key_people && Object.values(key_people).length > 0 ? Object.values(key_people).map((field, idx) => {
                                        return (
                                            <div key={`${field}-${idx}`} className='single_field_wrap'>

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
                                                           onChange={e => handleChangeKPName(idx, e)}
                                                           placeholder='Key Person Name'/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Key Person's Designation</label>
                                                    <input type="text" className='form-control'
                                                           value={field.designation || ""}
                                                           onChange={e => handleChangeKPDesignation(idx, e)}
                                                           placeholder='Key Person Designation'/>
                                                </div>
                                            </div>
                                        )
                                    }
                                ) : ''
                            }
                            <div className="mt-2 mb-5 text-right">
                                <button type="button" onClick={() => handleAdd()} className='btn btn-primary'>
                                    <i className="fas fa-plus"/> Add Another Key Person
                                </button>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    }

                </div>
            </div>
        </div>
    ) : <NotFoundPage/>
}

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllOrgAdminsAction: (onSuccess) => dispatch(fetchAllOrgAdmins(onSuccess)),
    dispatchUpdateOrgAction: (orgId, name, logo, shortDesc, description, address, key_people, onSuccess, onError) =>
        dispatch(updateOrg(orgId, {name, logo, shortDesc, description, address, key_people}, onSuccess, onError)),
    dispatchGetOrgByIdAction: (orgId, onSuccess, onError) =>
        dispatch(getOrgById(orgId, onSuccess, onError))
})

const mapStateToProps = (state) => (
    console.log(state),
    {
    loading: state.loading,
    org: state.orgs.org
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrgPage)



