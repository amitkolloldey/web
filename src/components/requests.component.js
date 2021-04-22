import React from 'react'
import NotFound from "./notfound.component";
import {toast} from "react-toastify";
import {deleteReqById, handleReq} from "../redux/actions/requestAction";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";
import history from '../history';
// Status = [ 'pending', 'approved', 'denied']

const Requests = ({requests, user, dispatchHandleAction, dispatchDeleteAction}) => {

    let sentByUser = requests && requests.sentByUser && requests.sentByUser.length ? requests.sentByUser.filter(function (item) {
        return item.status == 'pending'
    }) : null

    let sentToUser = requests && requests.sentToUser && requests.sentToUser.length ? requests.sentToUser.filter(function (item) {
        return item.status == 'pending'
    }) : null

    const handleSubmitDeny = (e, data) => {
        e.preventDefault()
        dispatchHandleAction('denied', e.target.reqId.value, (response) => {
            if (response) {
                history.push('/requests')
            }
            toast.success('Updated Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const handleSubmitDelete = (e, data, reqId) => {
        e.preventDefault()
        reqId = parseInt(reqId)
        dispatchDeleteAction(reqId, data, (response) => {
            if (response) {
                history.replace('/requests')
            }
            toast.success('Deleted Successfully!');
        }, (message) => toast.error(message))
    }

    const handleSubmitApprove = (e) => {
        e.preventDefault()
        dispatchHandleAction('approved', e.target.reqId.value, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/requests'), 300)
            }
            toast.success('Updated Successfully!');
        }, (message) => toast.error(message))
        return false;
    }
    return (
        <div className='orgs_list'>
            {
                <div className="card-group row request_list">
                    <h4 className='page_title'>
                        Requests To Me
                    </h4>
                    {
                        sentToUser && sentToUser.length ? (
                            sentToUser.map(item => (
                                <>
                                    {
                                        <div className="col-md-6" key={item.id}>
                                            <div className="card-body">
                                                <p className="card-text status">{item.status}</p>
                                                <h5 className="card-title">{item.content.title}</h5>
                                                <p className="card-text">{item.content.message}</p>
                                                <div className="card-footer pub_time">
                                                    <small className="text-muted">Published <Moment fromNow
                                                                                                    ago>{item.createdAt}</Moment> ago</small>
                                                </div>
                                                <div className="card-footer btns req_btns">
                                                    <form noValidate className="p-4" onSubmit={handleSubmitDeny}>
                                                        <input type="hidden" name='reqId' defaultValue={item.id}/>
                                                        <input type="hidden" name='denied' defaultValue='denied'/>
                                                        <button type='submit'
                                                                className="btn join_link btn_remove">Deny
                                                        </button>
                                                    </form>
                                                    <form noValidate className="p-4" onSubmit={handleSubmitApprove}>
                                                        <input type="hidden" name='reqId' defaultValue={item.id}/>
                                                        <input type="hidden" name='approved' defaultValue='approved'/>
                                                        <button type='submit' className="btn join_link">Accept</button>
                                                    </form>
                                                    {
                                                        item.type === 'trainer_invite' ? (
                                                            <NavLink to={'/orgs/' + item.orgId}
                                                                     className="btn join_link view_btn ">View
                                                                Organization</NavLink>) : ''
                                                    }
                                                    {
                                                        item.type === 'trainee_invite' ? (
                                                            <a href={'/courses/' + item.courseId}
                                                               className="btn join_link view_btn ">View Course</a>) : ''
                                                    }
                                                    {
                                                        item.type === 'trainee_enrollment' ? (
                                                            <a href={'/profile_view/' + item.fromId}
                                                               className="btn join_link view_btn ">View
                                                                Profile</a>) : ''
                                                    }
                                                    {
                                                        item.type === 'trainer_registration' ? (
                                                            <a href={'/profile_view/' + item.fromId}
                                                               className="btn join_link view_btn ">View
                                                                Profile</a>) : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            ))
                        ) : (
                            <NotFound/>
                        )
                    }
                </div>
            }
            {
                <div className="card-group row request_list">
                    <h4 className='page_title'>
                        Requests From Me
                    </h4>
                    {
                        sentByUser && sentByUser.length ? (
                            sentByUser.map(item => (
                                <>
                                    {
                                        <div className="col-md-6" key={item.id}>
                                            <div className="card-body">
                                                <p className="card-text status">{item.status}</p>
                                                <h5 className="card-title">{item.content.title}</h5>
                                                <p className="card-text">{item.content.message}</p>
                                                <div className="card-footer pub_time">
                                                    <small className="text-muted">Requested <Moment fromNow ago>{item.createdAt}</Moment> ago</small>
                                                </div>
                                                <div className="card-footer btns req_btns">
                                                    <form noValidate className="p-4"
                                                          onSubmit={(e, data, reqId) => handleSubmitDelete(e, 'sentByUser', item.id)}>
                                                        <button type='submit'
                                                                className="btn join_link btn_remove">Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            ))
                        ) : (
                            <NotFound/>
                        )
                    }
                </div>
            }
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    dispatchHandleAction: (status, reqId, onSuccess, onError) =>
        dispatch(handleReq({status, reqId}, onSuccess, onError)),
    dispatchDeleteAction: (reqId, data, onSuccess, onError) =>
        dispatch(deleteReqById(reqId, {data}, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Requests);