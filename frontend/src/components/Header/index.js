import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import companyLogo from '../../assets/images/coronavirus.svg';

class Header extends Component {
  render() {
    return (
      <div className="header-main">
        <div className="header-company">
        <img className="header-company-logo" src={companyLogo} alt="company logo"/>
          <p className="header-company-name">Clinical Trials</p>
        </div>
        {/* choosing between dark and light */}
        <ToggleSwitch />
      </div>
    );
  }
}

export default withRouter(Header);
