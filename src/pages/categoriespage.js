import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import NotFound from "../components/notfound.component";
import {fetchAllCategories} from "../redux/actions/categoryAction";

const CategoriesPage = ({loading, categories, dispatchFetchAllCategoriesAction, user, dispatchGetSingleUserAction}) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => dispatchFetchAllCategoriesAction(), [dispatchFetchAllCategoriesAction]);


    const filteredData = categories.filter((val) => {
        if (searchTerm === '') {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    })

    return (
        <div className='right_wrapper'>
            <h2 className='page_title '>All Listed Categories</h2>
            <div className='main_content'>
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
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.description}</p>
                                            </div>
                                            <div className="card-footer pub_time">
                                                <small className="text-muted">Created on {item.createdAt}</small>
                                            </div>
                                            <div className="card-footer btns">
                                                <a className='join_link btn_remove'>Delete</a>
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categories,
    loading: state.loading,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllCategoriesAction: () => dispatch(fetchAllCategories())

});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage)

