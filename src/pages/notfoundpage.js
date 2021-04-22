import React from 'react'
import NotFound from "../components/notfound.component";

const NotFoundPage = ({props}) => {

    return (
        <div className='right_wrapper'>

            <div className='main_content'>
                <div className='orgs_list my-5'>
                    <NotFound/>
                </div>
            </div>
        </div>
    )
}


export default NotFoundPage

