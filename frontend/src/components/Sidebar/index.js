import React, { Component } from 'react';
import './style.css';

import { connect } from 'react-redux';

class Sidebar extends Component {
  state = {
    hover: false
  };

  toggleHover = event => {
    event.preventDefault();
    this.setState({ hover: !this.state.hover });
  };

  render() {
    return (
      <>
        <div className='sidebar-wrapper'>
          <div className='sidebar-left'>
            <p>{ this.props.data.country.name }</p>
          </div>
          <div className='sidebar-right'>
            <p> Date: { this.props.data.country.date }</p>
            <p> Confirmed: {this.props.data.country.confirmed }</p>
            <p> Recovered: { this.props.data.country.recovered }</p>
            <p> Deaths: { this.props.data.country.deaths }</p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ sidebarDataReducer }) => {
  return {
    data: sidebarDataReducer
  };
};

export default connect(mapStateToProps)(Sidebar);
