import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Courses from "../components/courses.component";
import {fetchAllCourses} from '../redux/actions/courseAction';
import {toast} from "react-toastify";

const CoursePage = ({ courses, dispatchFetchAllCoursesAction }) => {

    useEffect(() => {
        dispatchFetchAllCoursesAction( (response) => {
            console.log('Courses Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchAllCoursesAction]);

    return courses ? (
        <div className='right_wrapper'>
            <h2 className='page_title'>All Courses</h2>
            <div className='main_content'>
                <Courses courses={courses}/>
            </div>
        </div>
    ) : 'Loading'
}

const mapStateToProps = (state) => (console.log(state),{
    courses: state.courses.all,
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllCoursesAction: (onSuccess, onError) => dispatch(fetchAllCourses(onSuccess, onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)

