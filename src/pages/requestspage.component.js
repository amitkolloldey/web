import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Requests from "../components/requests.component";
import {fetchUserRequests} from '../redux/actions/requestAction';

const RequestsPage = ({loading, requests, dispatchFetchUserRequestsAction, user}) => {
    useEffect(() => dispatchFetchUserRequestsAction(), []);
    return (
        <div className='right_wrapper'>
            <div className='main_content'>
                {
                    <Requests requests={requests} user={user}/>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        requests: state.requests,
        loading: state.loading,
        user: state.user
    });

const mapDispatchToProps = dispatch => ({
    dispatchFetchUserRequestsAction: () => dispatch(fetchUserRequests())
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage)

