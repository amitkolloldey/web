import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {fetchAllOrgs, getOrgById} from '../redux/actions/orgAction';
import Courses from "../components/courses.component";
import NotFound from "../components/notfound.component";
import {Link} from "react-router-dom";

const OrgSinglePage = ({match, dispatchGetOrgByIdAction, user, OrgsList}) => {

    const [name, setName] = useState('');
    const [key_people, setKeyPeople] = useState('');
    const [users, setUsers] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [courses, setCourses] = useState('');

    let {orgId} = match.params;

    orgId = parseInt(orgId)

    useEffect(() => {
        if (orgId) {
            dispatchGetOrgByIdAction(orgId, (response) => {
                setName(response.data.name);
                setLogo(response.data.logo);
                setAddress(response.data.address);
                setKeyPeople(response.data.key_people);
                setDescription(response.data.description);
                setCourses(response.data.Courses);
                setUsers(response.data.Users);
            });
        }
    }, [dispatchGetOrgByIdAction, match.params]);


    return (
        <div className='right_wrapper'>
            <div className='main_content'>
                <div className="single_page">
                    <div className="text-right mb-3 ">
                        {
                            user.role === 'Trainer' && !OrgsList.includes(orgId) ? (
                                <Link to={`/trainer_registration/${orgId}`}
                                      className='join_link'>Join</Link>) : ''
                        }
                        {
                            OrgsList && user.role === 'Trainer' && OrgsList.includes(orgId) ? (
                                <Link to={`/course_builder/${orgId}`} className='join_link'>Create
                                    Course</Link>) : ''
                        }
                        {
                            OrgsList && user.role === 'Organization Admin' && OrgsList.includes(orgId) ? (
                                <Link to={`/trainer_invite/${orgId}`} className='join_link invite_btn'>Invite
                                    Trainer</Link>) : ''
                        }
                    </div>
                    <div className="page_header">

                        <h2 className='page_title'>{name}</h2>

                        <div className="row">
                            <div className="col-4 p-3">
                                <div className="card_img org_logo">
                                    <img className="card-img-top" src={logo}
                                         alt={name}/>
                                </div>
                                <div className="card-body">
                                    {description}
                                </div>
                            </div>
                            <div className="col-4 p-3">
                                <div className="card-body">
                                    <div className="single_card_elem">
                                        <h4>Address</h4>
                                        {address}
                                    </div>
                                    <div className="single_card_elem">
                                        <h4>Key People</h4>
                                        {
                                            key_people && Object.values(key_people).length > 0 ? (
                                                    Object.values(key_people).map(item => {
                                                            return (
                                                                <div className='mb-2'>
                                                                    <div className="name">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="designation">
                                                                        {item.designation}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    )) :
                                                (
                                                    <NotFound/>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 p-3">
                                <div className="card-body">
                                    <div className="single_card_elem">
                                        <h4>Trainers Of This Organization</h4>
                                        {
                                            users && users.length > 0 ? (
                                                    users.map(item => (
                                                        <div className='mb-2'>
                                                            <div className="single_person">
                                                                <div className="image">
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

                    <div className="page_cards mt-5">
                        <h4 className='page_title'>Courses Provided By This Organization</h4>
                        {
                            courses ? (<Courses courses={courses} user={user} showOnlyView={true}/>) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    dispatchGetOrgByIdAction: (orgId, onSuccess) =>
        dispatch(getOrgById(orgId, onSuccess)),
    dispatchFetchAllOrgsAction: () => dispatch(fetchAllOrgs())
})

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgSinglePage)

