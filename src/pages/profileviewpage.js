import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getUserById} from '../redux/actions/authActions';
import Courses from "../components/courses.component";

const ProfileViewPage = ({loading,  match, dispatchGetSingleUserByIdAction, single_user}) => {
    let {userId} = match.params;

    useEffect(() => {
        dispatchGetSingleUserByIdAction(userId, (res) => {
            console.log(res)
        });
    }, []);

    return single_user ? (

        <div className='right_wrapper'>
            <div className='main_content'>
                <div className="single_page">
                    <div className="page_header">
                        <center>
                            <img
                                src={single_user.pic ? single_user.pic : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'}
                                className="org_logo"/>
                            <h3 className="media-heading">{single_user.name}</h3>
                            {
                                <a target='_blank' href={single_user.cv} className='btn btn-primary'> Cv
                                    Of {single_user.name}</a>
                            }
                        </center>
                    </div>
                    <div className="course_media row">

                    </div>
                    <div className="page_body">
                        <div className="row">
                            <div className="col-4 p-3">
                                <div className="card-body">
                                    <div className="single_card_elem">
                                        <div className="person_meta">
                                            <div className="name">
                                                {single_user.phone}
                                            </div>
                                            <div className="name">
                                                {single_user.email}
                                            </div>
                                            <div className="name">
                                                {single_user.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 p-3">
                                <div className="card-body">
                                    <div dangerouslySetInnerHTML={{__html: single_user.bio}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        single_user.Roles[0].name === 'Trainer' && single_user.TrainerCourses && single_user.TrainerCourses > 0 ? (
                            <div className="page_cards">
                                <div className='orgs_list'>
                                    <div className="card-group row ">
                                        <div className="page_cards mt-5">
                                            <h4 className='page_title'>Courses Provided By This User</h4>
                                            {
                                                single_user.TrainerCourses && single_user.TrainerCourses > 0 ? (
                                                    <Courses courses={single_user.TrainerCourses}
                                                             user={single_user}/>) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>) : ''
                    }
                </div>
            </div>
        </div>
    ) : 'Loading'
}

const mapStateToProps = (state ) => (
console.log(),
    {
        loading: state.loading,
        single_user:  state.users.single_user
    });

const mapDispatchToProps = dispatch => ({
    dispatchGetSingleUserByIdAction: (userId, onSuccess) =>
        dispatch(getUserById(userId, onSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileViewPage)

