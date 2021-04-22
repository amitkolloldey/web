import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {connect} from "react-redux";
import {getCourseById, updateCourse} from "../../../redux/actions/courseAction";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AssignCategory from "./assign_categorypage.component";
import CreateChapter from "./create_chapterspage.component";
import CreateFiles from "./create_filespage.component";
import CreateExam from "./create_exampage";
import CreateEvaluation from "./create_evaluationpage";
import CourseTrainees from "./coursetraineespage.component";
import history from "../../../history";
import CourseTrainers from "./coursetrainerspage.component";

function UpdateCoursePage({match, dispatchUpdateCourseAction, dispatchGetCourseByIdAction, course}) {

    const {register, handleSubmit, errors} = useForm();
    const [published, setPublished] = useState('');
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const {courseId, activeTab} = match.params;

    const onSubmit = (data) => {
        dispatchUpdateCourseAction(courseId, data.title, data.banner, data.shortDesc, description, objective, data.passing_mark, data.published, () => {
            toast.success('Course Updated Successfully!');
            history.replace('/course_builder/edit/'+courseId+'/0')
        }, (message) => toast.error(message))
        return false;
    }

    useEffect(() => {
        dispatchGetCourseByIdAction(courseId, () => {
                console.log('Course Loaded')
            }, (message) => toast.error(message)
        );
    }, [courseId, dispatchGetCourseByIdAction]);

    return course ? (
        <div className='right_wrapper'>
            <h2 className='page_title'>Course Builder For The Course {course && course.title}</h2>
            <div className="multi_step_wrapper">
                <div className='main_content'>
                    <div className="request_form course_update_tabs">
                        <Tabs defaultIndex={parseInt(activeTab)}>
                            <TabList>
                                <Tab>Course Details</Tab>
                                <Tab>Assign Category</Tab>
                                <Tab>Chapters</Tab>
                                <Tab>Chapter Materials</Tab>
                                <Tab>Chapter Exam</Tab>
                                <Tab>Course Evaluation</Tab>
                                <Tab>Trainees</Tab>
                                <Tab>Trainers</Tab>
                            </TabList>
                            <TabPanel>
                                <h2 className='form_heading'>
                                    Course Details Of {course && course.title}
                                </h2>
                                <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}
                                      encType='multipart/form-data'>
                                    <div className="form-group">
                                        <label htmlFor="title">Course Title</label>
                                        <input type="text" className="form-control" name='title' id="title"
                                               placeholder="Enter Course Title" ref={register({required: true})}
                                               defaultValue={course && course.title}/>
                                        {errors.title && (<p className='error'>Title is required*</p>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="banner">Course Banner</label>
                                        <input type="file" className="form-control" id="banner" name='banner'
                                               ref={register}/>
                                        <div className="preview">
                                            {
                                                course && course.banner ? (
                                                    <div className="preview"><img src={course.banner} alt={course.name}/>
                                                    </div>) : ''
                                            }
                                        </div>
                                        {errors.banner && (<p className='error'>Banner is required*</p>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="shortDesc">Short Description</label>
                                        <textarea className="form-control" id="shortDesc" name='shortDesc' rows="3"
                                                  ref={register({required: true})}
                                                  defaultValue={course && course.shortDesc}/>
                                        {errors.shortDesc && (<p className='error'>Short Description is required*</p>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Course Description</label>
                                        <ReactQuill name='description' onChange={setDescription}
                                                    defaultValue={course ? course.description : description} />
                                        {!description ? 'Please Enter Some Description' : ''}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="objective">Course Objective</label>
                                        <ReactQuill theme="snow" name='objective'  
                                                    onChange={setObjective} defaultValue={course ? course.objective : objective} />
                                        {!objective ? 'Please Enter Some Objective' : ''}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passing_mark">Passing Mark</label>
                                        <input type="number" className="form-control" id="passing_mark"
                                               name='passing_mark'
                                               ref={register({required: true})}
                                               defaultValue={course && course.passing_mark}/>
                                        {errors.passing_mark && (<p className='error'>Passing Mark is required*</p>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="published">Status</label>
                                        <select className="form-control " name='published'
                                                ref={register({required: true})}
                                                defaultValue={course ? course.published : published}
                                                onChange={(e) => setPublished(e.target.selectedOptions[0].value)}>
                                            <option value={true}>Published</option>
                                            <option value={false}>Draft</option>
                                        </select>
                                        {errors.published && (<p className='error'>Status is required*</p>)}
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className='btn btn-primary'>Update Course Details</button>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel >
                                <AssignCategory course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CreateChapter course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CreateFiles course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CreateExam course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CreateEvaluation course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CourseTrainees course={course}/>
                            </TabPanel>
                            <TabPanel>
                                <CourseTrainers course={course}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    ) : 'Loading'
}

const mapDispatchToProps = dispatch => ({
    dispatchUpdateCourseAction: (courseId, title, banner, shortDesc, description, objective, passing_mark, published, onSuccess, onError) => dispatch(updateCourse(courseId, {
        title,
        banner,
        shortDesc,
        description,
        objective,
        passing_mark,
        published
    }, onSuccess, onError)),
    dispatchGetCourseByIdAction: (courseId, onSuccess, onError) =>
        dispatch(getCourseById(courseId, onSuccess, onError))
})

const mapStateToProps = (state) => (
        {
            loading: state.loading,
            course: state.courses.course
        });

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCoursePage)

