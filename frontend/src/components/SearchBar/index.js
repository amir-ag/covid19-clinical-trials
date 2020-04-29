import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchDataAction } from '../../store/actions/searchDataAction';

import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    const [search, setSearch] = useState('');

    const onChangeHandler = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    }

    const onclickHandler = async (event) => {
        event.preventDefault();
        document.body.classList.add('waiting');
        await props.dispatch(searchDataAction(search));
        document.body.classList.remove('waiting');

    }
    return (
        <div className="search-container">
           <input onChange={onChangeHandler} type="text" placeholder="Search..."></input>
           <button onClick={onclickHandler} ><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    )
}

const mapStateToProps = ({ buttonThemeStateReducer, mapDataReducer: { data } }) => {
    return {
      checked: buttonThemeStateReducer.checked,
      data: data
    };
  };
  
export default connect(mapStateToProps)(SearchBar);

