import React, {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {Link} from "react-router-dom";
import NotFound from "../../../components/notfound.component";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {traineeRemove} from "../../../redux/actions/userAction";

function CourseTrainees({course, user, dispatchDeleteTraineeAction}) {
    let [selectedTraineeId, setSelectedTraineeId] = useState();

    const handleOnDelete = () => {
        dispatchDeleteTraineeAction(course.id, selectedTraineeId, () => {
            setTimeout(() => window.location.replace('/#/course_builder/edit/' + course.id + '/6'), 300)
            toast.success('Trainee deleted Successfully!');
        }, (message) => {
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, traineeId) => {
        event.preventDefault();
        setSelectedTraineeId(traineeId);
        window.$('#confirmationTraineeModal').modal('show');
    };

    return (
        <>
            {
                user && user.role === 'Trainer' ? (
                    <div className="text-right  pt-3">
                        <Link to={'/trainee_assign/' + course.id} className='join_link view_btn'><i
                            className="fas fa-plus"/> Assign Trainee</Link>
                    </div>
                ) : ''
            }

            <h2 className='form_heading'>
                All Trainees For {course.title}
            </h2>
            {
                course.Trainees.length ? (
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
                                    course.Trainees.map(function (item) {
                                        return (
                                            <tr>
                                                <td>
                                                    {
                                                        item.pic ? (<img src={item.pic} height='100px' width='100px'
                                                                         className='img-circle'/>) : (
                                                            <i className='fas fa-user'/>)
                                                    }
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <a href={`/profile_view/${item.id}`}
                                                              className='btn btn-dark tbl_btn'>View Profile</a>
                                                        {
                                                            user && user.role === 'Trainer' ? (
                                                                <Link to={`#`}
                                                                      className='btn btn-danger tbl_btn ml-2'
                                                                      onClick={(e) => showConfirmationModal(e, item.id)}>Delete</Link>
                                                            ) : ''
                                                        }
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
            <ModalTraineeDelete handleOnDelete={handleOnDelete} />
        </>
    );
}

const mapStateToProps = (state) => (

    {
    loading: state.loading,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchDeleteTraineeAction: (courseId, traineeId, onSuccess, onError) =>
        dispatch(traineeRemove(courseId,{traineeId}, onSuccess, onError))
})


export default connect(mapStateToProps, mapDispatchToProps)(CourseTrainees)


const ModalTraineeDelete = ({handleOnDelete}) => (
    <div className="modal" id="confirmationTraineeModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to remove this trainee?</p>
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