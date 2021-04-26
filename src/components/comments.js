import React from 'react';
import NotFoundPage from "../pages/notfoundpage";
import Moment from "react-moment";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import history from '../history';
import {createComment} from "../redux/actions/chapterAction";
const Comments = ({chapter, dispatchCreateCommentAction, dispatchGetChapterByIdAction}) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchCreateCommentAction(data.content, parseInt(data.entityId), data.entityType, (res) => {
            dispatchGetChapterByIdAction(chapter.id)
            document.getElementById("comment_form").reset();
            history.replace('/#/chapters/'+chapter.courseId+'/'+chapter.id)
            toast.success('Your Comment Was Successfully Posted!');
        }, (message) => toast.error(message))
        return false;
    }

    return chapter ? (
        <div className="col-12 p-3 description_single_course">
            <div className="card-body">
                <h3 className="media-heading">Chapter Discussion</h3>
                <div className="comment_form">
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)} id='comment_form'>
                        <textarea className='form-control' name="content" id="" rows="2" placeholder='Post A Comment' ref={register({required: true})}/>
                        {errors.content && (<p className='error'>Comment is required*</p>)}
                        <input type="hidden" value={chapter.id} name='entityId' ref={register({required: true})}/>
                        <input type="hidden" value={'Chapter'} name='entityType' ref={register({required: true})}/>
                        <div className="text-right mb-3">
                            <button className='btn btn-primary'><i className="fas fa-comment"/> Comment</button>
                        </div>
                    </form>
                </div>

                <div className="single_card_elem">
                    <div className="comments">

                        {
                            chapter && chapter.Comments && chapter.Comments.length ? (
                                chapter.Comments.map(item => (
                                        <>
                                            <div className="single_person comment_single">
                                                <div className="parent_comment">
                                                    <div className="comment_flex">
                                                        <div className="single_comment_left">
                                                            <div className="image">
                                                                <img src={item.User && item.User.pic ? item.User.pic : (
                                                                    <i className='fas fa-user'/>)} alt={item.User ? item.User.name : ''}/>
                                                            </div>
                                                            <small>
                                                                {item.User ? item.User.name : ''}
                                                            </small>
                                                            <div className="designation">
                                                            <span>
                                                                 <Moment fromNow ago>{item.createdAt}</Moment> ago
                                                            </span>
                                                            </div>
                                                        </div>
                                                        <div className="single_comment_right">
                                                            <div className="comment_content">
                                                                <p>
                                                                    {item.content}
                                                                </p>
                                                            </div>
                                                            <div className="comment_action text-right">
                                                                <button className={'btn btn-success'}><i
                                                                    className="fas fa-reply"/> Reply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    item.Comments && item.Comments.length ? (
                                                        chapter.Comments.map(reply => (
                                                                <div className="single_person comment_single">
                                                                    <div className="comment_flex">
                                                                        <div className="single_comment_left">
                                                                            <div className="image">
                                                                                <img src={reply.User.pic ? reply.User.pic : (
                                                                                    <i className='fas fa-user'/>)}
                                                                                     alt={reply.User.name}/>
                                                                            </div>
                                                                            <small>
                                                                                {reply.User.name}
                                                                            </small>
                                                                            <div className="designation">
                                                                            <span>
                                                                                 <Moment fromNow
                                                                                         ago>{reply.createdAt}</Moment> ago
                                                                            </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="single_comment_right">
                                                                            <div className="comment_content">
                                                                                <p>
                                                                                    {reply.content}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    ) : ''
                                                }
                                            </div>
                                        </>
                                    )
                                )
                            ) : <NotFoundPage/>
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : 'Loading'
}

const mapDispatchToProps = dispatch => ({
    dispatchCreateCommentAction: (content, entityId, entityType, onSuccess, onError) =>
        dispatch(createComment({content, entityId, entityType}, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(Comments)