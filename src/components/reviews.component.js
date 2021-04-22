import React, {useState} from 'react';

const Reviews = () => {

    return (
        <div className="col-12 p-3 description_single_course">
            <div className="card-body">
                <h3 className="media-heading">Reviews</h3>
                <div className="single_card_elem">
                    <div className="comments">
                        <div className="single_person comment_single">
                            <div className="parent_comment">

                                <div className="person_meta">
                                    <div className="image">
                                        <img src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                            alt='ghgh'/>
                                    </div>
                                    <div className="name">
                                        John Doe
                                        <span>
                                           2 days ago
                                        </span>
                                    </div>
                                    <div className="designation">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                        labore modi molestias, natus nobis nostrum optio provident qui
                                        repellat repudiandae rerum saepe velit, voluptate.
                                        <a href={'/profile_view/'}>Reply</a>
                                    </div>
                                </div>
                            </div>

                            <div className="single_person comment_single">

                                <div className="person_meta">
                                    <div className="image">
                                        <img
                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                            alt='ghgh'/>
                                    </div>
                                    <div className="name">
                                        John Doe
                                        <span>
                                                        2 days ago
                                                    </span>
                                    </div>
                                    <div className="designation">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                        labore modi molestias, natus nobis nostrum optio provident qui
                                        repellat repudiandae rerum saepe velit, voluptate.
                                        <a href={'/profile_view/'}>Reply</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="single_person comment_single">
                            <div className="parent_comment">
                                <div className="person_meta">
                                    <div className="image">
                                        <img
                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                            alt='ghgh'/>
                                    </div>
                                    <div className="name">
                                        John Doe
                                        <span>
                                                        2 days ago
                                                    </span>
                                    </div>
                                    <div className="designation">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                        labore modi molestias, natus nobis nostrum optio provident qui
                                        repellat repudiandae rerum saepe velit, voluptate.
                                        <a href={'/profile_view/'}>Reply</a>
                                    </div>
                                </div>
                            </div>

                            <div className="single_person comment_single">

                                <div className="person_meta">
                                    <div className="image">
                                        <img
                                            src='https://stitch-api-storage-prod.s3.ap-south-1.amazonaws.com/1616589205883.png'
                                            alt='ghgh'/>
                                    </div>
                                    <div className="name">
                                        John Doe
                                        <span>
                                                        2 days ago
                                                    </span>
                                    </div>
                                    <div className="designation">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Adipisci architecto consequatur consequuntur delectus hic, iste
                                        labore modi molestias, natus nobis nostrum optio provident qui
                                        repellat repudiandae rerum saepe velit, voluptate.
                                        <a href={'/profile_view/'}>Reply</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}
export default Reviews