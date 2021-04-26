import React from 'react'

const Footer = () => (
    <footer>
        <div className="row">
            <div className="col-md-6">
                <p className='copyright'>Developed By Redorange</p>
            </div>
            <div className="col-md-6 text-right">
                <div className="partners">
                    <img src={process.env.PUBLIC_URL + '/partners.png'}  alt='partners'/>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer