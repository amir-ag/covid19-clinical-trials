import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import companyLogo from '../../assets/images/coronavirus.svg';
import PropulsionAcademyLog from '../../assets/images/propulsion_logo_horizontal_white.png'

class Header extends Component {
  render() {
    return (
      <div className="header-main">
        <div className="header-company">
        <img className="header-company-logo" src={companyLogo} alt="company logo"/>
          <p className="header-company-name">Clinical Trials</p>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <a href="https://propulsion.academy/" target="_blank" style={{ marginRight: "20px"}}>
            <img src={PropulsionAcademyLog} alt="Propulsion Academy Logo" style={{width: "170px", height: "65px"}}/>
          </a>
        {/* choosing between dark and light */}
        <ToggleSwitch />
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
