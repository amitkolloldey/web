import React from 'react'
import {logOut} from "../redux/actions/authActions";
import {connect} from "react-redux";
import {toast} from "react-toastify";

const DashboardPage = ({user}) => (
    <div className='right_wrapper'>
        <h2 className='page_title'>Welcome To Stitch {user.name}</h2>

    </div>
)
const mapDispatchToProps = (dispatch) => ({
    dispatchLogoutAction: () => {
        dispatch(logOut());
        toast.success('You are logged out!');
    }
})
const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
