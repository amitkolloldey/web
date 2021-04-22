import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getUserById} from "../redux/actions/authActions";
import NotFound from "../components/notfound.component";
import {fetchAllCategories} from "../redux/actions/categoryAction";
import {fetchAllUsers} from "../redux/actions/userAction";

const UsersPage = ({loading, users, dispatchFetchAllUsersAction, user, dispatchGetSingleUserAction}) => {
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => dispatchFetchAllUsersAction(), [dispatchFetchAllUsersAction]);


    const filteredData = users.filter((val) => {
        if (searchTerm === '') {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    })

    return (
        <div className='right_wrapper'>
            <h2 className='page_title '>All User In The Platform</h2>
            <div className='main_content'>
                <div className='orgs_list'>
                    <div className="card-group row ">
                        <div className="col-12 p-3">
                            <div className="filter_section">
                                <form>
                                    <input type="search" name='search' id='search' placeholder='Enter Keyword To Search...'
                                           className='form-control' onChange={(event) => {
                                        setSearchTerm(event.target.value)
                                    }}/>
                                </form>
                            </div>
                        </div>
                        {
                            filteredData.length > 0 ? (
                                    filteredData.map(item => (
                                        <div className="col-4 p-3" key={item.id}>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.bio}</p>
                                                <p className="card-text">{item.email}</p>
                                                <p className="card-text">{item.phone}</p>
                                            </div>
                                            <div className="card-footer pub_time">
                                                <small className="text-muted">Created on {item.createdAt}</small>
                                            </div>
                                            <div className="card-footer btns">
                                                <a className='join_link btn_remove'>Delete User</a>
                                                <a className='join_link'>Block</a>
                                                <a className='join_link view_btn' href={'/profile_view/'+item.id }>View Profile</a>
                                            </div>
                                        </div>
                                    ))
                                ) :
                                (
                                    <NotFound/>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories,
    loading: state.loading,
    user: state.user,
    users: state.users.users
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers()),
    dispatchGetSingleUserAction: (userId, onSuccess) => dispatch(getUserById(userId, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)

