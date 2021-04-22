import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Orgs from "../components/orgs.component";
import {fetchAllOrgs} from '../redux/actions/orgAction';
import {toast} from "react-toastify";

const OrgsPage = ({orgs, dispatchFetchAllOrgsAction, user}) => {

    useEffect(() => dispatchFetchAllOrgsAction((response) => {
        console.log('Organizations Loaded')
    }, (message) => toast.error(message)), [dispatchFetchAllOrgsAction]);

    return (
        <div className='right_wrapper'>

            <h2 className='page_title'>All Organizations</h2>
            <div className='main_content'>
                <Orgs orgs={orgs} user={user}/>
            </div>
        </div>)
}

const mapStateToProps = (state) => (
    {
        orgs: state.orgs.all,
        loading: state.loading,
        user: state.user
    });

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllOrgsAction: () => dispatch(fetchAllOrgs())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgsPage)

