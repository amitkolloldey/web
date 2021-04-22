import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {fetchAllChapters, getChapterById} from "../redux/actions/chapterAction";
import ReactPlayer from "react-player";
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {toast} from "react-toastify";
import {getCurrentUser} from "../redux/actions/authActions";
import NotFoundPage from "./notfoundpage";

const ChapterSinglePage = ({match, dispatchGetChapterByIdAction, chapter, chapters, user, dispatchFetchAllChaptersAction, loading, dispatchFetchCurrentUserAction, TrainerCoursesList, TraineeCoursesList}) => {

    let {chapterId, courseId} = match.params;

    useEffect(() => {
        dispatchGetChapterByIdAction(chapterId)
    }, [dispatchGetChapterByIdAction])

    useEffect(() => {
        dispatchFetchAllChaptersAction()
    }, [dispatchFetchAllChaptersAction])

    useEffect(() => {
        dispatchFetchCurrentUserAction(user.userId, (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchCurrentUserAction, user.userId]);
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
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Chapters
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {chapters && chapters.filter(item => (
                                        item.courseId == chapter.courseId
                                    )).map(chapter => {
                                        return <a key={chapter.id} className="dropdown-item"
                                                  href={"/chapters/" + courseId + "/" + chapter.id}>{chapter.title}</a>
                                    })}
                                </div>
                            </li>

                        </ul>
                        <h2 className='chapter_title'>
                            {chapter.title}
                        </h2>
                        <a className='back_to_main_course btn view_btn join_link mr-2' href={'/courses/' + chapter.courseId}>
                            Back to Course Details
                        </a>
                        {
                            chapter.Exams && chapter.Exams.length ? (
                                <a className='back_to_main_course btn  join_link' href={'/exam_submission/' + chapter.Exams[0].id}> Take Exam </a>
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
                                <h3 className="media-heading">Instructions</h3>
                                <div className="single_card_elem">
                                    <div className="desc_block">
                                        <div dangerouslySetInnerHTML={{__html: chapter.instructions}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-3 description_single_course">
                            <div className="card-body">
                                <h3 className="media-heading">Comments</h3>
                                <div className="single_card_elem">
                                    <div className="comments">
                                        <div className="single_person comment_single">
                                            <div className="parent_comment">
                                                <div className="person_meta">
                                                    <div className="image">
                                                        <img
                                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                                            alt='ghgh'/>
                                                    </div>
                                                    <div className="name">
                                                        John Doe
                                                        <span>
                                                        2 days ago
                                                    </span>
                                                    </div>
                                                    <div className="designation">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                                        labore modi molestias, natus nobis nostrum optio provident qui
                                                        repellat repudiandae rerum saepe velit, voluptate.
                                                        <a href={'/profile_view/'}>Reply</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single_person comment_single">
                                                <div className="person_meta">
                                                    <div className="image">
                                                        <img
                                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                                            alt='ghgh'/>
                                                    </div>
                                                    <div className="name">
                                                        John Doe
                                                        <span>
                                                        2 days ago
                                                    </span>
                                                    </div>
                                                    <div className="designation">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                                        labore modi molestias, natus nobis nostrum optio provident qui
                                                        repellat repudiandae rerum saepe velit, voluptate.
                                                        <a href={'/profile_view/'}>Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single_person comment_single">
                                            <div className="parent_comment">
                                                <div className="person_meta">
                                                    <div className="image">
                                                        <img
                                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                                            alt='ghgh'/>
                                                    </div>
                                                    <div className="name">
                                                        John Doe
                                                        <span>
                                                        2 days ago
                                                    </span>
                                                    </div>
                                                    <div className="designation">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                                        labore modi molestias, natus nobis nostrum optio provident qui
                                                        repellat repudiandae rerum saepe velit, voluptate.
                                                        <a href={'/profile_view/'}>Reply</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single_person comment_single">

                                                <div className="person_meta">
                                                    <div className="image">
                                                        <img
                                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                                            alt='ghgh'/>
                                                    </div>
                                                    <div className="name">
                                                        John Doe
                                                        <span>
                                                        2 days ago
                                                    </span>
                                                    </div>
                                                    <div className="designation">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                                        labore modi molestias, natus nobis nostrum optio provident qui
                                                        repellat repudiandae rerum saepe velit, voluptate.
                                                        <a href={'/profile_view/'}>Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
})

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user,
    chapters: state.chapters.chapters,
    chapter: state.chapters.chapter,
    TrainerCoursesList: state.users.TrainerCoursesList,
    TraineeCoursesList: state.users.TraineeCoursesList
});


export default connect(mapStateToProps, mapDispatchToProps)(ChapterSinglePage)