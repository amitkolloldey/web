import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {getCurrentUser} from "../redux/actions/authActions";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import NotFound from "../components/notfound.component";
import SearchForm from "../components/searchform";
import {deleteCourseById} from "../redux/actions/courseAction";

const MyCoursesPage = ({dispatchFetchCurrentUserAction, current_user, user, dispatchDeleteCourseAction}) => {

    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);

    const handleOnDelete = () => {
        dispatchDeleteCourseAction(selectedCourse, () => {
            window.$('#confirmationModal').modal('hide');
            setTimeout(() => window.location.replace('/mycourses/'+user.userId), 300)
            toast.success('Course deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const showConfirmationModal = (event, courseId) => {
        event.preventDefault();
        setSelectedCourse(courseId);
        window.$('#confirmationModal').modal('show');
    };

    const [searchTerm, setSearchTerm] = useState('');
    let filteredData = []
    if (user.role === 'Trainee') {
        filteredData = current_user && current_user.TraineeCourses.length && current_user.TraineeCourses.filter((val) => {
            if (searchTerm === '') {
                return val
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        })
    } else {
        filteredData = current_user && current_user.TrainerCourses.length && current_user.TrainerCourses.filter((val) => {
            if (searchTerm === '') {
                return val
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        })
    }

    return current_user ? (
        <div className='right_wrapper'>
            <div>
                {
                    user.role === 'Trainee' ? (
                        <div>
                            <h2 className='page_title'>My Courses</h2>
                            <SearchForm onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}/>
                            <div className='main_content row'>
                                {
                                    filteredData.length > 0 ? (
                                            filteredData.map(item => (
                                                <div className="col-4 p-3" key={item.id}>
                                                    <div className="card_img">
                                                        <img className="card-img-top"
                                                             src={item.banner ? item.banner : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'}
                                                             alt={item.title}/>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.title}</h5>
                                                        <p className="card-text">{item.shortDesc}</p>
                                                    </div>
                                                    <div className="card-footer pub_time">
                                                        <small className="text-muted">Published <Moment fromNow
                                                                                                        ago>{item.createdAt}</Moment> ago</small>
                                                    </div>
                                                    <div className="card-footer btns">
                                                        <Link to={`/course_builder/edit/${item.id}`}
                                                              className='join_link '>Edit</Link>
                                                        <Link to={`/trainee_invite/${item.id}`}
                                                              className='join_link'>Invite</Link>
                                                        <Link to={`#`}
                                                              className='join_link '
                                                              onClick={(e) => showConfirmationModal(e, item.id)}>Delete</Link>
                                                        <Link to={`/courses/${item.id}`}
                                                              className='join_link view_btn'>View</Link>
                                                    </div>
                                                    <Modal handleOnDelete={handleOnDelete}/>
                                                </div>
                                            ))
                                        ) :
                                        (
                                            <NotFound/>
                                        )
                                }
                            </div>
                        </div>
                    ) : ''
                }
                {
                    user.role === 'Trainer' || user.role === 'Organization Admin' ? (
                        <div>
                            <h2 className='page_title'>My Courses</h2>
                            <SearchForm onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}/>
                            <div className='main_content row'>
                                {
                                    filteredData.length > 0 ? (
                                            filteredData.map(item => (
                                                <div className="col-4 p-3" key={item.id}>
                                                    <div className="card_img">
                                                        <img className="card-img-top"
                                                             src={item.banner ? item.banner : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'}
                                                             alt={item.title}/>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.title}</h5>
                                                        <p className="card-text">{item.shortDesc}</p>
                                                    </div>
                                                    <div className="card-footer pub_time">
                                                        <small className="text-muted">Published <Moment fromNow
                                                                                                        ago>{item.createdAt}</Moment> ago</small>
                                                    </div>
                                                    <div className="card-footer btns">
                                                        <Link to={`/course_builder/edit/${item.id}`}
                                                              className='join_link '>Edit</Link>
                                                        <Link to={`/trainee_invite/${item.id}`}
                                                              className='join_link'>Invite</Link>
                                                        <Link to={`#`}
                                                              className='join_link '
                                                              onClick={(e) => showConfirmationModal(e, item.id)}>Delete</Link>
                                                        <Link to={`/courses/${item.id}`}
                                                              className='join_link view_btn'>View</Link>
                                                    </div>
                                                    <Modal handleOnDelete={handleOnDelete}/>
                                                </div>
                                            ))
                                        ) :
                                        (
                                            <NotFound/>
                                        )
                                }
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    ) : 'Loading'
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    current_user: state.users.current_user,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchCurrentUserAction: (userId, onSuccess) => dispatch(getCurrentUser(userId, onSuccess)),
    dispatchDeleteCourseAction: (courseId, onSuccess, onError) => dispatch(deleteCourseById(courseId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCoursesPage)

const Modal = ({handleOnDelete}) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this Course ?</p>
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
