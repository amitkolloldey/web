import React, {useState} from 'react'
import {Link} from "react-router-dom";
import NotFound from "./notfound.component";
import Moment from "react-moment";

const Courses = ({courses}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = courses.filter((val) => {
        if (searchTerm === '') {
            return val
        } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }else{
            return []
        }
    })

    return (
        <div className='orgs_list'>
            <div className="card-group row ">
                <div className="col-12 p-3">
                    <div className="filter_section">
                        <form>
                            <input type="search" name='search' id='search' placeholder='Enter Keyword To Search...'
                                   className='form-control' onChange={(event) => {
                                setSearchTerm(event.target.value)
                            }}/>
                        </form>
                    </div>
                </div>
                {
                    filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <div className="col-4 p-3" key={item.id}>
                                    <div className="card_img">
                                        <img className="card-img-top"
                                             src={item.banner ? item.banner : 'https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'}
                                             alt={item.title}/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.shortDesc}</p>
                                    </div>
                                    <div className="card-footer pub_time">
                                        <small className="text-muted">Published <Moment fromNow
                                                                                        ago>{item.createdAt}</Moment> ago</small>
                                    </div>
                                    <div className="card-footer btns">


                                        <Link to={`/courses/${item.id}`} className='join_link view_btn'>View</Link>
                                    </div>
                                </div>
                            ))
                        ) :
                        (
                            <NotFound/>
                        )
                }
            </div>

        </div>
    )
}

export default Courses;