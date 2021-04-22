import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {getCurrentUser} from "../redux/actions/authActions";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import NotFound from "../components/notfound.component";
import SearchForm from "../components/searchform";

const MyOrgsPage = ({dispatchFetchCurrentUserAction, current_user, user}) => {

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);

    const [searchTerm, setSearchTerm] = useState('');

    let filteredData = []

    if (user.role === 'Trainer' || user.role === 'Organization Admin') {
        filteredData = current_user && current_user.Orgs.length && current_user.Orgs.filter((val) => {
            if (searchTerm === '') {
                return val
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        })
    } else {
        filteredData = []
    }

    return current_user ? (
        <div className='right_wrapper'>
            <div>
                <div>
                    <h2 className='page_title'>My Organizations</h2>
                    <SearchForm onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}/>
                    <div className='main_content'>
                        {
                            filteredData.length > 0 ? (
                                    filteredData.map(item => (
                                        <div className="col-4 p-3" key={item.id}>
                                            <div className="card_img org_logo">
                                                <img className="card-img-top" src={item.logo}
                                                     alt={item.name}/>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.description}</p>
                                            </div>
                                            <div className="card-footer pub_time">
                                                <small className="text-muted">Created <Moment fromNow
                                                                                              ago>{item.createdAt}</Moment> ago</small>
                                            </div>
                                            <div className="card-footer btns">
                                                {
                                                    user.role === 'Organization Admin' ? (
                                                        <Link to={`/edit_org/${item.id}`}
                                                              className='join_link '>Edit</Link>) : ''
                                                }
                                                <Link to={`/course_builder/${item.id}`} className='join_link'>Create
                                                    Course</Link>
                                                {
                                                    user.role === 'Organization Admin' ? (
                                                        <Link to={`/trainer_invite/${item.id}`}
                                                              className='join_link invite_btn'>Invite Trainer</Link>) : ''
                                                }
                                                <Link to={`/orgs/${item.id}`} className='join_link view_btn'>View</Link>
                                            </div>
                                        </div>
                                    ))) :
                                (
                                    <NotFound/>
                                )
                        }
                    </div>
                </div>
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
    dispatchFetchCurrentUserAction: (userId, onSuccess) => dispatch(getCurrentUser(userId, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrgsPage)