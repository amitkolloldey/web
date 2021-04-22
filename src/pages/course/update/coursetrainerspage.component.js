import React from 'react';
import 'react-quill/dist/quill.snow.css';
import {Link} from "react-router-dom";
import NotFound from "../../../components/notfound.component";

function CourseTrainers({course}) {

    return (
        <>
            <h2 className='form_heading'>
                All Trainers For {course.title}
            </h2>
            {
                course.Trainers.length ? (
                        <>
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    course.Trainers.map(function (item) {
                                        return (
                                            <tr>
                                                <td>
                                                    {
                                                        item.pic ? (<img src={item.pic} height='100px' width='100px' className='img-circle'/>) : ( <i className='fas fa-user'/>)
                                                    }
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link to={`/profile_view/${item.id}`} target='_blank'
                                                              className='btn btn-dark tbl_btn'>View Profile</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </>
                    )
                    : (<NotFound/>)
            }
        </>
    );
}

export default CourseTrainers