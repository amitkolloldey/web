import React, {useEffect} from 'react'
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import Spinner from "./components/spinner/spinner.component";
import {connect} from "react-redux";
import {ToastContainer, Slide, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getCurrentUser, logOut} from "./redux/actions/authActions";
import Sidebar from "./components/sidebar.component";
import Routes from "./Routes";

const App = ({current_user, user, dispatchLogoutAction, dispatchGetSingleUserAction }) => {
    var local_user = JSON.parse(localStorage.getItem("CURRENT_USER"));
    let userId = local_user ? local_user.userId : null
    useEffect(() => {
        dispatchGetSingleUserAction(userId, (res) => {
            console.log(res)
        });
    }, [dispatchGetSingleUserAction, userId]);

    return (
        <div className={(!local_user ? 'not_logged_in_wrapper' : '')}>
            <Sidebar user={user} dispatchLogoutAction={dispatchLogoutAction}/>
            <div className='right_content'>
                <ToastContainer position="top-right" autoClose={2000} transition={Slide}/>
                <Spinner/>
                <Header/>
                <Routes user={local_user}  />
                <Footer/>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchLogoutAction: () => {
        dispatch(logOut());
        toast.success('You are logged out!');
    },
    dispatchGetSingleUserAction: (user_id, onSuccess) => dispatch(getCurrentUser(user_id, onSuccess))
})

const mapStateToProps = (state) => (
    {
        current_user: state.users.current_user,
        user: state.user
    });

export default connect(mapStateToProps, mapDispatchToProps)(App);