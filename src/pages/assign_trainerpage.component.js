import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {fetchAllTrainers, trainerAssociate} from "../redux/actions/userAction";

function AssignTrainerPage({match,  trainers, dispatchFetchAllTrainersAction, dispatchTrainerAssociate}) {

    const [options, setOptions] = useState([]);

    const [trainer, setTrainer] = useState([]);

    const {courseId, orgId} = match.params

    if (trainers && trainers.length > 0) {
        const trainer_values = trainers.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })
        if (!options.length > 0) {
            setOptions(trainer_values);
        }
    }

    const handleChange = (trainer) => {
        if (trainer) {
            setTrainer(trainer.value)
        }
    };

    useEffect(() => {
        dispatchFetchAllTrainersAction(() => {
            console.log('Trainers Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchAllTrainersAction]);

    const onSubmit = (e) => {
        const data = {
            'courseId': parseInt(courseId),
            'trainerId': trainer
        }
        e.preventDefault()
        dispatchTrainerAssociate(parseInt(orgId), data.courseId, data.trainerId, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/'+courseId+'/7'), 300)
            toast.success('Trainer Associated Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return (
        <>

            <div className='right_wrapper'>
                <h2 className='page_title'>Assign Trainer to The Course</h2>

                <div className='main_content'>
                    <div className="request_form">
                        <form noValidate className="p-4"
                              encType='multipart/form-data' onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="parentId" className="form-label">Select Trainer</label>
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
    )
}


const mapStateToProps = (state) => (
        {
            loading: state.loading,
            trainers: state.users.trainers
        });

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllTrainersAction: (onSuccess, onError) => dispatch(fetchAllTrainers(onSuccess, onError)),
    dispatchTrainerAssociate: (orgId, courseId, trainerId, onSuccess, onError) => dispatch(trainerAssociate(orgId, {
        courseId, trainerId
    }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTrainerPage)