import React from 'react'

function SearchForm(props) {
    return <div className="col-12 p-3">
        <div className="filter_section">
            <form>
                <input type="search" name='search' id='search' placeholder='Enter Keyword To Search...'
                       className='form-control' onChange={props.onChange}/>
            </form>
        </div>
    </div>;
}

export default SearchForm