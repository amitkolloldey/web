import React, {useState} from 'react'
import {Link} from "react-router-dom";
import NotFound from "./notfound.component";
import Moment from "react-moment";

const Orgs = ({orgs, user}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = orgs && orgs.filter((val) => {
        if (searchTerm === '') {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    })

    return (
        <div className='orgs_list'>
            <div className="card-group row">
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
                    filteredData && filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <div className="col-4 p-3" key={item.id}>
                                    <div className="card_img org_logo">
                                        <img className="card-img-top" src={item.logo}
                                             alt={item.name}/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                    </div>
                                    <div className="card-footer pub_time">
                                        <small className="text-muted">Created <Moment fromNow
                                                                                      ago>{item.createdAt}</Moment> ago</small>
                                    </div>
                                    <div className="card-footer btns">
                                        <Link to={`/orgs/${item.id}`} className='join_link view_btn'>View Details</Link>
                                        {
                                            user.role === 'Super Admin' ? (<Link to={`/edit_org/${item.id}`}
                                                                                 className='join_link '>Edit</Link>) : ''
                                        }
                                    </div>
                                </div>
                            ))) :
                        (
                            <NotFound/>
                        )
                }
            </div>
        </div>
    )
}
export default Orgs;