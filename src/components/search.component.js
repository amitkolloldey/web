import React, {useState} from 'react';

const SearchBar = ({collection, result, keys}) => {

    const [searchTerm, setSearchTerm] = useState('');

    result(collection.filter(datum => (keys.map(key => datum[key].includes(searchTerm)))));

    return (
        <div className="filter_section">
            <form>
                <input type="search" name='search' id='search' placeholder='Enter Keyword To Search...'
                       className='form-control' onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}/>
            </form>
        </div>
    )


}
export default SearchBar