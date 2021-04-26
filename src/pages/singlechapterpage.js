import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {fetchAllChapters, getChapterById} from "../redux/actions/chapterAction";
import ReactPlayer from "react-player";
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {toast} from "react-toastify";
import {getCurrentUser} from "../redux/actions/authActions";
import NotFoundPage from "./notfoundpage";
import {Link} from "react-router-dom";
import NotFound from "../components/notfound.component";
import {getCourseById} from "../redux/actions/courseAction";
import Comments from "../components/comments";

const ChapterSinglePage = ({match, course, dispatchGetChapterByIdAction, chapter, chapters, user, dispatchFetchAllChaptersAction, loading, dispatchFetchCurrentUserAction, TrainerCoursesList, TraineeCoursesList, dispatchGetCourseByIdAction}) => {

    let {chapterId, courseId} = match.params;

    useEffect(() => {
        dispatchGetChapterByIdAction(chapterId)
    }, [dispatchGetChapterByIdAction, chapterId])

    useEffect(() => {
        dispatchFetchAllChaptersAction()
    }, [dispatchFetchAllChaptersAction])

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, () => {
            console.log('User Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);

    useEffect(() => {
        dispatchGetCourseByIdAction(courseId, () => {
                console.log('Course Loaded')
            }, (message) => toast.error(message)
        );
    }, [courseId, dispatchGetCourseByIdAction]);

    let myCourses = TrainerCoursesList && TrainerCoursesList.concat(TraineeCoursesList)

    return (
        !loading && chapter && myCourses && myCourses.includes(parseInt(courseId)) ? <div className='right_wrapper'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="chapters_list">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Chapters
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {chapters && chapters.filter(item => (
                                        item.courseId == chapter.courseId
                                    )).map(chapter => {
                                        return <a key={chapter.id} className="dropdown-item"
                                                  href={"/#/chapters/" + courseId + "/" + chapter.id}>{chapter.title}</a>
                                    })}
                                </div>
                            </li>

                        </ul>
                        <h2 className='chapter_title'>
                            {chapter.title}
                        </h2>
                        <Link className='back_to_main_course btn view_btn join_link mr-2'
                              to={'/courses/' + chapter.courseId}>
                            <i className="fas fa-arrow-left"/> Back to Course Details
                        </Link>
                        {
                            chapter.Exams && chapter.Exams.length ? (
                                <Link className='back_to_main_course btn  join_link'
                                      to={'/exam_submission/' + chapter.Exams[0].id}><i
                                    className="fas fa-graduation-cap"/> Take Exam </Link>
                            ) : ''
                        }
                    </div>
                </nav>

                <div className='main_content'>
                    <div className="single_page">
                        <Tabs className='chapter_file_wrapper'>
                            <div className="course_media row">
                                <div className="video_player col-md-9">
                                    {
                                        chapter.Files && chapter.Files.map(file => {
                                            switch (file.type) {
                                                case 'video':
                                                    return <TabPanel><ReactPlayer url={file ? file.url : ''} controls={true}
                                                                                  width={'100%'}
                                                                                  height={'500px'}/></TabPanel>
                                                case 'audio':
                                                    return <TabPanel>
                                                        <ReactPlayer url={file ? file.url : ''} controls={true}
                                                                     width={'100%'}
                                                                     height={'500px'}/>
                                                    </TabPanel>
                                                case 'document':
                                                    return <TabPanel>
                                                        <DocViewer pluginRenderers={DocViewerRenderers}
                                                                   documents={[{uri: file.url}]}/>
                                                    </TabPanel>
                                                default:
                                                    return <TabPanel><DocViewer pluginRenderers={DocViewerRenderers}
                                                                                documents={[{uri: file.url}]}/>
                                                    </TabPanel>
                                            }
                                        })}
                                </div>
                                <div className="col-md-3">
                                    <TabList>
                                        {
                                            chapter.Files && chapter.Files.map(file => {
                                                switch (file.type) {
                                                    case 'video':
                                                        return <Tab><i className="fas fa-play"/> {file.title}</Tab>
                                                    case 'audio':
                                                        return <Tab><i className="fas fa-music"/> {file.title}</Tab>
                                                    case 'document':
                                                        return <Tab><i className="fas fa-file"/> {file.title}</Tab>
                                                    default:
                                                        return <Tab><i className="fas fa-file"/> {file.title}</Tab>
                                                }
                                            })}
                                    </TabList>
                                </div>
                            </div>
                        </Tabs>
                        <div className="col-12 p-3 description_single_course">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <h3 className="media-heading">Instructions</h3>
                                        <div className="single_card_elem">
                                            <div className="desc_block">
                                                <div dangerouslySetInnerHTML={{__html: chapter.instructions}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 p-3">
                                        <div className="card-body">
                                            <div className="single_card_elem">
                                                <h4>Trainers Of This Course</h4>
                                                {
                                                    course && course.Trainers && course.Trainers.length ? (
                                                            course.Trainers.map(item => (
                                                                <>
                                                                    {
                                                                        <div className='mb-2'>
                                                                            <div className="single_person">
                                                                                <div className="image single_person_img">
                                                                                    <img src={item.pic ? item.pic : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'} alt={item.name}/>
                                                                                </div>
                                                                                <div className="person_meta">
                                                                                    <div className="name">
                                                                                        {item.name}
                                                                                    </div>
                                                                                    <div className="designation">
                                                                                        <Link to={'/profile_view/' + item.id}><i className="fas fa-envelope"/> Message Trainer</Link>
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
                                </div>
                            </div>
                        </div>
                        <Comments chapter={chapter} dispatchGetChapterByIdAction={dispatchGetChapterByIdAction}/>
                    </div>
                </div>
            </div>
            : <NotFoundPage/>
    )
}
const mapDispatchToProps = dispatch => ({
    dispatchGetChapterByIdAction: (chapterId) => dispatch(getChapterById(chapterId)),
    dispatchFetchAllChaptersAction: () => dispatch(fetchAllChapters()),
    dispatchFetchCurrentUserAction: (userId, onSuccess) => dispatch(getCurrentUser(userId, onSuccess)),
    dispatchGetCourseByIdAction: (courseId, onSuccess, onError) =>
        dispatch(getCourseById(courseId, onSuccess, onError)),
})

const mapStateToProps = (state) => (
    console.log(state),
        {
            user: state.user,
            chapters: state.chapters.chapters,
            chapter: state.chapters.chapter,
            TrainerCoursesList: state.users.TrainerCoursesList,
            TraineeCoursesList: state.users.TraineeCoursesList,
            course: state.courses.course
        });


export default connect(mapStateToProps, mapDispatchToProps)(ChapterSinglePage)