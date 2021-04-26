import React, {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {Link} from "react-router-dom";
import NotFound from "../../../components/notfound.component";
import {toast} from "react-toastify";
import { trainerRemove} from "../../../redux/actions/userAction";
import {connect} from "react-redux";

function CourseTrainers({course, dispatchDeleteTrainerAction}) {

    let [selectedTrainerId, setSelectedTrainerId] = useState();

    const handleOnDelete = () => {
        dispatchDeleteTrainerAction(course.orgId, course.id, selectedTrainerId, () => {
            setTimeout(() => window.location.reload('/#/course_builder/edit/' + course.id + '/7'), 300)
            toast.success('Trainer deleted Successfully!');
        }, (message) => {
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, trainerId) => {
        event.preventDefault();
        setSelectedTrainerId(trainerId);
        window.$('#confirmationTrainerModal').modal('show');
    };

    return (
        <>
            <div className="text-right  pt-3">
                <Link to={'/trainer_assign/'+course.orgId+'/'+course.id+''} className='join_link view_btn'><i className="fas fa-plus"/> Assign Trainer</Link>
            </div>
            <h2 className='form_heading'>
                All Trainers For {course.title}
            </h2>
            {
                course.Trainers.length ? (
                        <>
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    course.Trainers.map(function (item) {
                                        return (
                                            <tr>
                                                <td>
                                                    {
                                                        item.pic ? (<img src={item.pic} alt={item.name} height='100px' width='100px' className='img-circle'/>) : ( <i className='fas fa-user'/>)
                                                    }
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`/profile_view/${item.id}`} target='_blank'
                                                              className='btn btn-dark tbl_btn'>View Profile</Link>

                                                                <Link to={`#`}
                                                                      className='btn btn-danger tbl_btn ml-2'
                                                                      onClick={(e) => showConfirmationModal(e, item.id)}>Delete</Link>

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </>
                    )
                    : (<NotFound/>)
            }
            <ModalTrainerDelete handleOnDelete={handleOnDelete} />
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchDeleteTrainerAction: (orgId, courseId,trainerId, onSuccess, onError) =>
        dispatch(trainerRemove(orgId,{courseId, trainerId}, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(CourseTrainers)


const ModalTrainerDelete = ({handleOnDelete}) => (
    <div className="modal" id="confirmationTrainerModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to remove this trainer?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);