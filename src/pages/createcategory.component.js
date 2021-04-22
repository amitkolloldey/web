import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getCourseById, traineeRequest} from "../redux/actions/courseAction";
import Select from "react-select";
import {fetchAllUsers} from "../redux/actions/userAction";
import {createCategory, fetchAllCategories} from "../redux/actions/categoryAction";
import {createOrg} from "../redux/actions/orgAction";

const CreateCategoryPage = ({loading, categories, dispatchFetchAllCategoriesAction, dispatchCreateCategoryAction}) => {
    const [options, setOptions] = useState([]);
    const [parent, setParent] = useState('');

    if (categories.length > 0) {
        const cat_values = categories.map(item => {
            return {
                label: item.name,
                value: item.id
            };
        })
        if (!options.length > 0) {
            setOptions(cat_values);
        }
    }

    useEffect(() => {
        dispatchFetchAllCategoriesAction()
    }, []);

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        dispatchCreateCategoryAction(data.name, data.description, (response) => {
            if (response) {
                setTimeout(() => window.location.replace('/categories'), 300)
            }
            toast.success('Category Created Successfully!');
        }, (message) => toast.error(message))
        return false;
    }

    // const handleChange = (parent) => {
    //     if (parent){
    //         setParent(parent.value)
    //     }
    // };

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>Create Category </h2>
            <div className='main_content'>
                <div className="request_form">
                    <form noValidate className="p-4" onSubmit={handleSubmit(onSubmit)}>
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="parentId" className="form-label">Select Parent Category</label>*/}
                        {/*    {*/}
                        {/*        options.length > 0 ? (*/}
                        {/*            <Select options={options} onChange={handleChange} />) : ''*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            <label htmlFor="name">Category name</label>
                            <input type="text" className="form-control" name='name' id="name" placeholder="Enter Category name"
                                   ref={register({required: true})}/>
                            {errors.name && (<p className='error'>Category name is required*</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Short Description</label>
                            <textarea name="description" id="description" cols="30" rows="3" ref={register({required: true})} className='form-control'/>
                            {errors.description && (<p className='error'>Description is required*</p>)}
                        </div>
                        <button type="submit" className="btn btn-primary">Create Category</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllCategoriesAction: () => dispatch(fetchAllCategories()),
    dispatchCreateCategoryAction: (name, description, onSuccess, onError) =>
        dispatch(createCategory({name, description}, onSuccess, onError)),
})

const mapStateToProps = (state) => ({
    categories: state.categories,
    loading: state.loading
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryPage)

