import React from 'react';
import './Search.scss';

const Search = ({ onFilter }) => {

    const handleChange = event => onFilter(event.target.value);

    return (
        <div className="search">
            <input className="search-input" placeholder="Search countries" onChange={ handleChange } />
        </div>
    );
};

export default Search;
