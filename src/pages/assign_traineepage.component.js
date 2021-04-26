import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {fetchAllTrainees,  traineeAssociate } from "../redux/actions/userAction";
import NotFoundPage from "./notfoundpage";

function AssignTraineePage({match,  trainees, dispatchFetchAllTraineesAction, dispatchTraineeAssociate, user}) {

    const [options, setOptions] = useState([]);

    const [trainee, setTrainee] = useState([]);

    const {courseId} = match.params

    if (trainees && trainees.length > 0) {
        const trainee_values = trainees.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })
        if (!options.length > 0) {
            setOptions(trainee_values);
        }
    }

    const handleChange = (trainee) => {
        if (trainee) {
            setTrainee(trainee.value)
        }
    };

    useEffect(() => {
        dispatchFetchAllTraineesAction(() => {
            console.log('Trainees Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchAllTraineesAction]);

    const onSubmit = (e) => {
        const data = {
            'traineeId': trainee
        }
        e.preventDefault()
        dispatchTraineeAssociate( courseId, data.traineeId, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/'+courseId+'/6'), 300)
            toast.success('Trainee Associated Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return user && user.role === 'Trainer' ? (
        <>
            <div className='right_wrapper'>
                <h2 className='page_title'>Assign Trainee to The Course</h2>

                <div className='main_content'>
                    <div className="request_form">
                        <form noValidate className="p-4"
                              encType='multipart/form-data' onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="parentId" className="form-label">Select Trainee</label>
                                {
                                    options.length > 0 ? (
                                        <Select options={options} onChange={handleChange}/>) : ''
                                }
                            </div>
                            <div className="form-group">
                                <button type='submit' className='btn btn-primary'>Assign</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : <NotFoundPage/>
}


const mapStateToProps = (state) => (
        {
            loading: state.loading,
            trainees: state.users.trainees,
            user: state.user
        });

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllTraineesAction: (onSuccess, onError) => dispatch(fetchAllTrainees(onSuccess, onError)),
    dispatchTraineeAssociate: (courseId, traineeId, onSuccess, onError) => dispatch(traineeAssociate(courseId, {
        traineeId
    }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTraineePage)