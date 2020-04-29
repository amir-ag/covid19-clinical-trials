import React,  { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import makeAnimated from 'react-select/animated';

import { statusDataAction } from '../../store/actions/statusDataAction';

import './style.css';

const statusOptions = [
    { value: 'Not yet recruiting', label: 'Not yet recruiting' },
    { value: 'Recruiting', label: 'Recruiting' },
    { value: 'Enrolling by invitation', label: 'Enrolling by invitation' },
    { value: 'Active, not recruiting', label: 'Active, not recruiting' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Terminated', label: 'Terminated' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Withdrawn', label: 'Withdrawn' },
    { value: 'Unknown status', label: 'Unknown status' }
  ];

const customTheme = (theme) => {
    return {
        ...theme,
        colors: {
            ...theme.color,
            primary25: '#062540',
            primary: '#062540',
        }
    }
  }

  const customStyles = {
    control: (base, state) => ({
        ...base,
        opacity: 1,
        background: "white",
        borderRadius: 0,
        borderColor: '#062540',
      
      // Removes weird border
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the border
        borderColor: '#062540'
      },
      '&:focus': {
        outline: 'none'
    }
    }),
    menu: base => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      backgroundColor: 'white',
      opacity: 1
    }),
    menuList: base => ({
      ...base,
      padding: 0,
      opacity: 1
    })
  };
  

const animatedComponents = makeAnimated();

const DropDownMenu = (props) => {

    const [selectedOption, setSelectedOption] = useState([]);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
      };

    const onclickHandler = async (event) => {
        event.preventDefault();
        document.body.classList.add('waiting');
        await props.dispatch(statusDataAction(selectedOption));
        document.body.classList.remove('waiting');
    }

    return (
        <div className="status-container">
            <div className="status-wrapper">
                <Select
                    //className="select"
                    placeholder="Filter by status..."
                    noOptionsMessage = {() => 'Study status not available'}
                    components={animatedComponents}
                    theme={customTheme}
                    styles={customStyles}
                    value={selectedOption}
                    onChange={handleChange}
                    options={statusOptions}
                    isSearchable='false'
                    autoFocus
                    isMulti
                />
            </div>
            <button onClick={onclickHandler} > Go </button>
        </div>
    )
}

export default connect()(DropDownMenu);

