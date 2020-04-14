import React from 'react';
import { connect } from 'react-redux';
import { buttonThemeStateAction } from '../../store/actions/buttonThemeStateAction';
import './style.css';

function ToggleSwitch(props) {
    const toggleTheme = (event) => {
        if(event.target.checked) {
            toogleThemeTransition();
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            toogleThemeTransition();
            document.documentElement.setAttribute('data-theme', 'light');
        }
        props.dispatch(buttonThemeStateAction(!props.checked))
    }

    const toogleThemeTransition = () => {
        document.documentElement.classList.add('transition');
        setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000);
    }

    return (
        <>
            <input onChange={toggleTheme} type="checkbox" id="themeButtonSwitch" name="theme" />
            <label htmlFor="themeButtonSwitch">Toggle</label>
        </>
    )
}

const mapStateToProps = ({ buttonThemeStateReducer }) => {
    return {
      checked: buttonThemeStateReducer.checked
    };
  };
  
export default connect(mapStateToProps)(ToggleSwitch);

