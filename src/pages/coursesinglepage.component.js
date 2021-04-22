import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import NotFound from "../components/notfound.component";
import {deleteCourseById, fetchAllCourses, getCourseById} from "../redux/actions/courseAction";
import Reviews from "../components/reviews.component";
import {getCurrentUser} from "../redux/actions/authActions";
import {toast} from "react-toastify";

const CourseSinglePage = ({loading, match, dispatchGetCourseByIdAction, courses, user, OrgsList, TraineeCoursesList, TrainerCoursesList, dispatchFetchCurrentUserAction}) => {

    const [title, setTitle] = useState('');
    const [exams, setExams] = useState('');
    const [banner, setBanner] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [description, setDescription] = useState('');
    const [objectives, setObjectives] = useState('');
    const [passing_mark, setPassingMark] = useState('');
    const [visitor_count, setVisitorCount] = useState('');
    const [categories, setCategories] = useState('');
    const [chapters, setChapters] = useState('');
    const [trainers, setTrainer] = useState('');
    const [comments, setComments] = useState('');
    const [org, setOrg] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [trainees, setTrainee] = useState('');

    const {courseId} = match.params;

    useEffect(() => {
        if (courseId) {
            dispatchGetCourseByIdAction(courseId, (response) => {
                setTitle(response.data.title);
                setExams(response.data.Exams);
                setTrainer(response.data.Trainers);
                setTrainee(response.data.trainees);
                setBanner(response.data.banner);
                setShortDesc(response.data.shortDesc);
                setDescription(response.data.description);
                setDescription(response.data.description);
                setPassingMark(response.data.passing_mark);
                setVisitorCount(response.data.visitor_count);
                setCategories(response.data.categories);
                setChapters(response.data.Chapters);
                setComments(response.data.Comments);
                setOrg(response.data.Org);
                setObjectives(response.data.objective);
            }, (message) => toast.error(message));
        }
    }, [dispatchGetCourseByIdAction, match.params]);

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);

    return (
        <div className='right_wrapper'>
            <div className='main_content'>
                <div className="single_page">
                    <div className="page_header course_header">
                        <center>
                            <img
                                src={banner ? banner : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'} className="org_logo"/>
                        </center>
                        <div className="row d-flex align-items-center">
                            <div className="col-6 text-left">
                                <h3 className="media-heading course_title single_course_title">{title}</h3>
                            </div>
                            <div className="col-6 text-right">
                                {
                                    user.role === 'Trainer' && TrainerCoursesList && TrainerCoursesList.length && TrainerCoursesList.includes(parseInt(courseId)) ? (
                                        <Link to={'/trainee_invite/' + courseId} className='btn btn-primary'> Invite
                                            Trainee</Link>) : ''
                                }
                                {
                                    user.role === 'Trainee' && TraineeCoursesList && TraineeCoursesList.length && TraineeCoursesList.includes(parseInt(courseId)) ?
                                                (
                                                    exams.length ?
                                                        (
                                                            <a className='back_to_main_course btn  join_link'
                                                               href={'/exam_submission/' + exams[0].id}>
                                                                Evaluate
                                                            </a>
                                                        ) : ''
                                                ) : ''
                                }
                                <button className='visitor_count mr-2'>Total Visits: {visitor_count}</button>
                            </div>
                        </div>
                    </div>
                    <div className="row single_course_body">
                        <div className="col-6 p-3">
                            <div className="card-body">
                                {shortDesc}
                            </div>
                        </div>
                        <div className="col-6 p-3">
                            <div className="card-body">
                                <div className="single_card_elem">
                                    <h4>Trainers Of This Course</h4>
                                    {
                                        trainers && trainers.length > 0 ? (
                                                trainers.map(item => (
                                                    <>
                                                        {
                                                            <div className='mb-2'>
                                                                <div className="single_person">
                                                                    <div className="image single_person_img">
                                                                        <img
                                                                            src={item.pic ? item.pic : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'}
                                                                            alt={item.name}/>
                                                                    </div>
                                                                    <div className="person_meta">
                                                                        <div className="name">
                                                                            {item.name}
                                                                        </div>
                                                                        <div className="designation">
                                                                            <a href={'/profile_view/' + item.id}>View
                                                                                Profile</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                                ))) :
                                            (
                                                <NotFound/>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-3 description_single_course">
                            <div className="card-body">
                                <h3 className="media-heading">Description</h3>
                                <div className="single_card_elem">
                                    <div className="desc_block">
                                        <div dangerouslySetInnerHTML={{__html: description}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-3 description_single_course">
                            <div className="card-body">
                                <h3 className="media-heading">Objectives</h3>
                                <div className="single_card_elem">
                                    <div className="desc_block">
                                        <div dangerouslySetInnerHTML={{__html: objectives}}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 p-3 description_single_course">
                            <div className="card-body">
                                <h3 className="media-heading">Chapters</h3>
                                {
                                    chapters && chapters.length > 0 ? (
                                        chapters.map(item => (
                                            <div className="single_card_elem">
                                                <div className="desc_block">
                                                    <div className="chap_title">
                                                        {item.title}
                                                    </div>
                                                    <div className="chap_desc">
                                                        <div dangerouslySetInnerHTML={{__html: item.instructions}}/>
                                                    </div>
                                                    {
                                                        TraineeCoursesList && TraineeCoursesList.length && TraineeCoursesList.includes(parseInt(courseId)) ?
                                                            (
                                                                <div className="link">
                                                                    <a href={'/chapters/' + courseId + '/' + item.id}
                                                                       className='view_btn join_link'>View
                                                                        Chapter</a>
                                                                </div>
                                                            ) : (
                                                                TrainerCoursesList && TrainerCoursesList.length && TrainerCoursesList.includes(parseInt(courseId)) ?
                                                                    (
                                                                        <div className="link">
                                                                            <a href={'/chapters/' + courseId + '/' + item.id}
                                                                               className='view_btn join_link'>View
                                                                                Chapter</a>
                                                                        </div>
                                                                    ) : ''
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        ))) : (<NotFound/>)
                                }
                            </div>
                        </div>
                        <Reviews/>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    dispatchGetCourseByIdAction: (courseId, onSuccess, onError) =>
        dispatch(getCourseById(courseId, onSuccess, onError)),
    dispatchFetchCurrentUserAction: (userId, onSuccess) => dispatch(getCurrentUser(userId, onSuccess)),
})

const mapStateToProps = (state) => (
    {
        courses: state.courses,
        loading: state.loading,
        user: state.user,
        TrainerCoursesList: state.users.TrainerCoursesList,
        TraineeCoursesList: state.users.TraineeCoursesList
    });

export default connect(mapStateToProps, mapDispatchToProps)(CourseSinglePage)