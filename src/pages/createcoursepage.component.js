import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Select from 'react-select'
import {getCourseById, traineeInvite} from "../redux/actions/courseAction";
import {fetchAllUsers} from "../redux/actions/userAction";
import {createOrg, getOrgById, trainerInvite, trainerRequest} from "../redux/actions/orgAction";

const CreateCoursePage = ({loading, users, match, dispatchCreateOrgAction, dispatchFetchAllUsersAction}) => {

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
            <h2 className='page_title'>Create Course</h2>

            <div className='main_content'>
                <div className="request_form">
                    {/*<p className='some_info alert alert-info'>Select and existing Trainer from the select field or fill*/}
                    {/*    the name, email and phone no to invite non existing user. Trainer Will Receive An OTP. After*/}
                    {/*    Validating the OTP they will join this organization.</p>*/}
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

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
    users: state.users.users,
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoursePage)



