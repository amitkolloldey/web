import React from 'react'
import {deleteReqById} from "../redux/actions/requestAction";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

// Status = [ 'pending', 'approved', 'denied']

const Invites = ({invites, user, dispatchDeleteAction}) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchDeleteAction(data.reqId, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/invites'), 300)
            }
            toast.success('Deleted Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    const trainee_invites = invites.filter(e => (e.fromId === user.userId && e.type === 'trainee_invite'))
    const trainer_invites = invites.filter(e => (e.fromId === user.userId && e.type === 'trainer_invite'))

    return (
        <div className='orgs_list'>
            <div className="card-group row request_list">
                <h4 className='page_title'>
                    My Invites
                </h4>

                {
                    trainee_invites.length > 0 ? (
                        trainee_invites.map(item => (
                            <div className="col-md-6" key={item.id}>
                                <div className="card-body">
                                    <p className="card-text status">{item.status}</p>
                                    <h5 className="card-title">{item.content.title}</h5>
                                    <p className="card-text">{item.content.message}</p>

                                    <div className="card-footer btns req_btns">
                                        <form noValidate className="p-4" >
                                            <input type="hidden" name='reqId' defaultValue={item.id}  />
                                            <input type="hidden" name='denied' defaultValue='denied'  />
                                            <button type='submit' className="btn join_link btn_remove">Delete</button>
                                        </form>
                                        {
                                            user.role === 'Trainer' ? (<a href={'/orgs/'+item.orgId } className="btn join_link view_btn ">View Organization</a>) : (<a href={'/courses/'+item.courseId } className="btn join_link view_btn ">View Course</a>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        ''
                    )
                }
                {
                    trainer_invites.length > 0 ? (
                        trainer_invites.map(item => (
                            <div className="col-md-6" key={item.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{item.content.title}</h5>
                                    <p className="card-text">{item.content.message}</p>
                                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}  >
                                        <input type="hidden" name='reqId' defaultValue={item.id} ref={register}/>
                                        <button type='submit' className="btn btn-danger">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        ))
                    ) : (
                        ''
                    )
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (reqId, onSuccess, onError) =>
        dispatch(deleteReqById({reqId}, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(Invites) ;