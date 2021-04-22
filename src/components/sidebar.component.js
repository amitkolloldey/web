import React from 'react';
import {Link, NavLink} from "react-router-dom";

function Sidebar({user, dispatchLogoutAction}) {

    return (
        <div className='left_sidebar'>
            <div className="user_image">
                <Link to={'/profilepage/' + user.userId}>
                    {user.pic ? (<img src={user.pic}/>) : (<i className='fas fa-user'/>)}
                    <p className='user_role'>{user.role}</p>
                    <h4 className='user_name'>{user.name}</h4>
                </Link>
            </div>
            <ul className='main_side_menu'>
                <li className='search_field_all'>
                    <input type="search" placeholder='Search'/>
                    <i className="fas fa-search"/>
                </li>
                <li>
                    <NavLink to="/orgs"><i className="fas fa-university"/> <span> All Organizations</span></NavLink>
                </li>
                {
                    user.role === 'Organization Admin' || user.role === 'Trainer' ? (
                        <li>
                            <NavLink to={"/myorgs/" + user.userId}><i className="fas fa-building"/> <span> My Organizations</span></NavLink>
                        </li>) : ''
                }
                {
                    user.role === 'Super Admin' ? (<li>
                        <NavLink to="/create_org">
                            <i className="fas fa-plus-circle"/>
                            <span> Create Organization</span>
                        </NavLink>
                    </li>) : ''
                }
                <li>
                    <NavLink to="/courses"><i className="fas fa-book"/> <span> All Courses</span></NavLink>
                </li>

                {
                    user.role === 'Super Admin' ? (<li>
                        <li>
                            <NavLink to="/categories"><i className="fas fa-cubes"/> <span> Categories</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/create_category"><i className="fas fa-plus-circle"/>
                                <span> Create Categories</span></NavLink>
                        </li>
                    </li>) : ''
                }
                {
                    user.role !== 'Super Admin' ? (
                        <>
                            <li>
                                <NavLink to="/requests"><i className="fas fa-plus-circle"/>
                                    <span> Requests</span></NavLink>
                            </li>
                            <li>
                                <NavLink to={"/mycourses/" + user.userId}><i className="fas fa-book-open"/> <span> My Courses</span></NavLink>
                            </li>
                        </>
                    ) : ''
                }
                {/*{*/}
                {/*    user.role === 'Super Admin' ? (<li>*/}
                {/*        <NavLink to="/users"><i className="fas fa-users"/> <span> Users</span></NavLink>*/}
                {/*    </li>) : ''*/}
                {/*}*/}
                {
                    user.role !== 'Super Admin' ? (
                        <>
                            <li>
                                <a href='#'><i className="fas fa-envelope"/> <span> Messages</span></a>
                            </li>
                            <li>
                                <a href='#'><i className="fas fa-globe"/> <span> Notifications</span></a>
                            </li>
                        </>
                    ) : ''
                }
            </ul>
            <ul className='bottom_sidemenu'>
                <li>
                    <a href="#"><i className="fab fa-facebook"/></a>
                    <a href="#"><i className="fab fa-twitter"/></a>
                    <a href="#"><i className="fab fa-linkedin"/></a>
                </li>
                <li className='bottom_btn'>
                    <button className='btn logout_btn' onClick={dispatchLogoutAction}><i
                        className="fas fa-sign-out-alt"/> Logout
                    </button>
                    {/*<Link className='btn logout_btn' to={'my_account'}><i*/}
                    {/*    className="fas fa-user"/> My Account*/}
                    {/*</Link>*/}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;