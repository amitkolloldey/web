import React, {useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import TrainerRegistrationPage from "./pages/trainerregistrationpage.component";
import OrgsPage from "./pages/orgspage.component";
import DashboardPage from "./pages/dashboard.component";
import ResetPage from "./pages/resetpage.component";
import EnterResetPage from "./pages/enterresetemailpage.component";
import OtpPage from "./pages/otppage.component";
import RegisterPage from "./pages/registerpage.component";
import LoginPage from "./pages/loginpage.component";
import OrgSinglePage from "./pages/orgsinglepage.component";
import RequestsPage from "./pages/requestspage.component";
import ProfilePage from "./pages/profilepage.component";
import CoursePage from "./pages/coursepage.component";
import TraineeRegistrationPage from "./pages/traineeregistrationpage.component";
import CourseSinglePage from "./pages/coursesinglepage.component";
import CreateTraineeInvitePage from "./pages/createtraineeinvitepage.component";
import CreateTrainerInvitePage from "./pages/createtrainerinvitepage.component";
import CreateOrgPage from "./pages/createorgpage.component";
import CreateCoursePage from "./pages/course/create_coursepage.component";
import CreateCategoryPage from "./pages/createcategory.component";
import UpdateCoursePage from "./pages/course/update/update_coursepage.component";
import AssignCategoryPage from "./pages/course/update/assign_categorypage.component";
import CategoriesPage from "./pages/categoriespage";
import ProfileViewPage from "./pages/profileviewpage";
import ChapterSinglePage from "./pages/singlechapterpage";
import ExamSubmission from "./pages/exam_submissionpage";
import MyAccountPage from "./pages/myaccountpage";
import ExamAllSubmissions from "./pages/submissionspage";
import MyCoursesPage from "./pages/mycoursespage.component";
import MyOrgsPage from "./pages/myorgspage.component";
import EditOrgPage from "./pages/editorgpage.component";
import AssignTrainerPage from "./pages/assign_trainerpage.component";
import AssignTraineePage from "./pages/assign_traineepage.component";


const Routes = ({user }) => {

    return <>
        {
            !user ? (
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/register' component={RegisterPage}/>
                    <Route exact path='/otp' component={OtpPage}/>
                    <Route exact path='/reset' component={ResetPage}/>
                    <Route exact path='/enteremail' component={EnterResetPage}/>
                    <Redirect to='/login'/>
                </Switch>
            ) : (
                <Switch>

                    <Route exact path='/' component={DashboardPage}/>

                    <Route exact path='/orgs'
                           component={OrgsPage}/>

                    <Route exact path={'/myorgs/' + user.userId} component={MyOrgsPage}/>

                    <Route exact path='/courses' component={CoursePage}/>

                    <Route exact path={'/mycourses/' + user.userId} component={MyCoursesPage}/>

                    <Route exact path='/orgs/:orgId' component={OrgSinglePage}  />

                    <Route exact path='/create_org/' component={CreateOrgPage}/>
                    <Route exact path='/edit_org/:orgId' component={EditOrgPage}/>

                    <Route exact path='/courses/:courseId' component={CourseSinglePage} />

                    <Route exact path='/requests' component={RequestsPage}/>

                    <Route exact path='/trainer_registration/:orgId' component={TrainerRegistrationPage}/>

                    <Route exact path='/trainee_registration/:courseId' component={TraineeRegistrationPage}/>

                    <Route exact path={'/chapters/:courseId/:chapterId'} component={ChapterSinglePage}/>

                    <Route exact path={'/course_builder/edit/:courseId/:activeTab?'} component={UpdateCoursePage}/>

                    <Route exact path={'/trainee_invite/:courseId'} component={CreateTraineeInvitePage}/>

                    <Route exact path={'/assign_category/:courseId'} component={AssignCategoryPage}/>

                    <Route exact path='/trainer_invite/:orgId' component={CreateTrainerInvitePage}/>

                    <Route exact path='/trainer_assign/:orgId/:courseId' component={AssignTrainerPage}/>
                    <Route exact path='/trainee_assign/:courseId' component={AssignTraineePage}/>

                    <Route exact path='/course_builder/:orgId' component={CreateCoursePage}/>

                    <Route exact path='/exam_submission/:examId/:preview?' component={ExamSubmission}/>

                    <Route exact path={'/profilepage/' + user.userId} component={ProfilePage}/>

                    <Route exact path='/otp' component={OtpPage}/>

                    <Route exact path='/reset' component={ResetPage}/>

                    <Route exact path='/enteremail' component={EnterResetPage}/>

                    <Route exact path='/create_category' component={CreateCategoryPage}/>

                    <Route exact path='/categories' component={CategoriesPage}/>

                    <Route exact path='/submissions/:examId' component={ExamAllSubmissions}/>

                    <Route exact path='/my_account/:activeTab?' component={MyAccountPage}/>

                    <Route exact path='/profile_view/:userId' component={ProfileViewPage}/>

                    <Redirect to='/'/>
                </Switch>
            )

        }
    </>
}


export default Routes;