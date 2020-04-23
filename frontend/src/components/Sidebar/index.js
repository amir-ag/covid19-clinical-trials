import React, { Component } from 'react';
import './style.css';

import { connect } from 'react-redux';

class Sidebar extends Component {
  render() {
    return (
      <>
          <div className='sidebar-wrapper'>
            <div className='sidebar-right'>
              {
                this.props.clinics.map((clinic, index) => 
                  <div key={index} className="info">
                    <p>Brief description:</p>
                    <p className="info-p info-p-p">{ clinic.BriefTitle }</p>
                    <p>Email contact:</p>
                    <div style={{marginBottom: "10px"}}>
                      { clinic.CentralContactPhone ? [...clinic.CentralContactEMail].map((contactEMail, index) => <p className="info-p-p" key={index} >{ contactEMail }</p>)  : ''}
                    </div>
                    <p>Phone contact:</p>
                    <div style={{marginBottom: "10px"}}>
                      { clinic.CentralContactPhone ? [...clinic.CentralContactPhone].map((contactPhone, index) => <p className="info-p-p" key={index} >{ contactPhone }</p>) : ''}
                    </div>
                    <p>Facility location:</p>
                    <p className="info-p info-p-p">{ clinic.LocationFacility }</p>
                    <p>Country:</p>
                    <p className="info-p info-p-p">{ clinic.LocationCountry }</p>
                    <p>City:</p>
                    <p className="info-p info-p-p">{ clinic.LocationCity }</p>
                    <div className="btn-container">
                      <a href={ clinic.visitStudy } target="_blank" ><button className="study-button">go to study</button></a> 
                    </div>
                  </div>
                )
              }
            </div>
          </div>
      </>
    );
  }
}

const mapStateToProps = ({ sidebarDataReducer: { clinics } }) => {
  return {
    clinics: clinics
  };
};

export default connect(mapStateToProps)(Sidebar);
