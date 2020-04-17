import React, { useState } from 'react';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
    const [search, setSearch] = useState('');

    const onChangeHandler = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    }

    const onclickHandler = (event) => {
        event.preventDefault();
    }
    return (
        <div className="search-container">
           <input onChange={onChangeHandler} type="text" placeholder="Search.."></input>
           <button onClick={onclickHandler} ><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    )
}

export default SearchBar;
