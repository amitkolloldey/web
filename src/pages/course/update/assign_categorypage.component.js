import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import {connect} from "react-redux";
import {fetchAllCategories} from "../../../redux/actions/categoryAction";
import {categoryAssociate} from "../../../redux/actions/courseAction";
import {toast} from "react-toastify";

function AssignCategory({course, categories, dispatchFetchAllCategoriesAction, dispatchCategoryAssociate}) {

    const [options, setOptions] = useState([]);
    const [cat, setCat] = useState([]);

    if (categories.length > 0) {
        const cat_values = categories.filter(function (item) {
            return item.parentId === null;
        }).map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })
        if (!options.length > 0) {
            setOptions(cat_values);
        }
    }
    const handleChange = (cat) => {
        if (cat) {
            setCat(cat.value)
        }
    };

    useEffect(() => {
        dispatchFetchAllCategoriesAction( (response) => {
            console.log('Categories Loaded')
        }, (message) => toast.error(message))
    }, [dispatchFetchAllCategoriesAction]);

    const onSubmit = (e, category) => {
        const data = {
            'entityType': 'Course',
            'entityId': parseInt(course.id),
            'categoryId': cat
        }
        e.preventDefault()
        dispatchCategoryAssociate(data, () => {
            toast.success('Category Associated To Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    return  (
        <>
            <h2 className='form_heading'>
                Assign Category To {course.title}
            </h2>
            <form noValidate className="p-4"
                  encType='multipart/form-data' onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="parentId" className="form-label">Select Category</label>
                    {
                        options.length > 0 ? (
                                <Select options={options} onChange={handleChange}
                                        defaultValue={course.Categories.length ? {
                                            label: course.Categories[0].name,
                                            value: course.Categories[0].id
                                        } : null}/>) : ''
                    }
                </div>
                <input
                    type="hidden"
                    value={course.id} name='entityId'
                />
                <input
                    type="hidden"
                    value={'Course'} name='entityType'
                />
                <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Assign</button>
                </div>
            </form>
        </>
    )
}


const mapStateToProps = (state) => ({
    loading: state.loading,
    categories: state.categories
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllCategoriesAction: (onSuccess, onError) => dispatch(fetchAllCategories(onSuccess, onError)),
    dispatchCategoryAssociate: (category, onSuccess, onError) => dispatch(categoryAssociate({
        category
    }, onSuccess, onError))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignCategory)