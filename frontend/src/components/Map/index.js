
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import mapDarkStyle from "../../assets/mapStyle/mapStyles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  { sidebarDataAction } from '../../store/actions/sidebarDataAction';
import { mapDataAction } from '../../store/actions/mapDataAction';
import './index.css';
import UserMenu from "../UserMenu";

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

function Map(props) {
  //const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 15.7077507, lng: 10.1365919 })
  const [mapZoom, setMapZoom] = useState(2.9);

  useEffect(() => { 
      const fetchData = async () => {
        await props.dispatch(mapDataAction());
    }
    fetchData();
  }, []);

  const userLocationHandler = (event) => {
    event.preventDefault();
    if (navigator.geolocation && showUserLocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition(function(position){
        setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        setUserLocation(position);
        setMapZoom(6);
      });
    }
    else {
      setMapCenter({ lat: 15.7077507, lng: 10.1365919 });
      setMapZoom(2.9);
    }
    setShowUserLocation(!showUserLocation)
  }

  const toggleSideBar = () => {
    document.getElementsByClassName('sidebar-wrapper')[0].classList.toggle('active');
  }

  const showClinicInfo = (clinic) => {
    console.log("clinic ", clinic)

    if(clinic.clinics.length === 1 ) setSelectedClinic(clinic.clinics[0]);
    else setSelectedClinic({...clinic, BriefTitle: `${clinic.clinics.length} studies are available.`});
    props.dispatch(sidebarDataAction(clinic.clinics));
  }

  const hideClinicInfo = () => {
    setSelectedClinic(null);
  }

  const customMapStyle = () => {
    const themeButtonSwitch = props.checked;
    //if theme button is checked (dark mode), otherwise light mode
    if(themeButtonSwitch) return mapDarkStyle;
    else return '';
  }

  return (
    <GoogleMap 
    defaultZoom={ 2.9 } 
    defaultCenter={{ lat: 15.7077507, lng: 10.1365919 }} 
    defaultOptions={{ 
                      styles: '',
                      zoomControlOptions: { position: 8 },
                      streetViewControl:false,
                      fullscreenControl:false,
                      mapTypeControl: false,
                      minZoom: 2.7
                    }} 
    zoom={ mapZoom }
    center={ mapCenter }
    options={{
      styles: customMapStyle(),
      zoomControlOptions: { position: 8, right: "10px"},
      streetViewControl:false,
      fullscreenControl:false,
      mapTypeControl: false,
      minZoom: 2.7,
    }}
    >
    
    <UserMenu />

    {/* rendering user position button */}
    {
      <button className="btn-location" onClick={userLocationHandler}>
        <FontAwesomeIcon icon={faCrosshairs} style={ showUserLocation ? { width: "20px", height: "20px", color: "#666666" } : { width: "20px", height: "20px", color: "#399DD5" } }/>
      </button>
    }

    {/* rendering user position */}  
    { userLocation && !showUserLocation && (
      <Marker
        position={{
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude
        }}
        icon={{
          url: `/userLocationIcon.gif`,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />
    )}

    {console.log("Markers: ", props)}
    {/* rendering the clinics position */}
      {
        props.data.map((clinic, index) => {
          if(clinic.Latitude && clinic.Longitude){
            return (
              <Marker 
                key={index} 
                position={{ lat: clinic.Latitude, lng: clinic.Longitude }}
                icon={{
                  url: `/locationMarker.svg`,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={toggleSideBar}
                onMouseOut={hideClinicInfo}
                onMouseOver={() => { showClinicInfo(clinic) }}
              >
              </Marker>
            )
          }
        })
      }

    {/* rendering the onMouseOver clinic info */}
    { selectedClinic && (
      <InfoWindow 
        position={{
          lat: selectedClinic.Latitude,
          lng: selectedClinic.Longitude
        }}
        options={{
          pixelOffset: new window.google.maps.Size(0,-30),
          maxWidth: '250'
        }}
        
      >
        <div style={{ textAlign: 'center' }}>
          <h3>{selectedClinic.BriefTitle}</h3>
        </div>
      </InfoWindow>
    )}

    </GoogleMap>
  );
}

const mapStateToProps = ({ buttonThemeStateReducer }) => {
  return {
    checked: buttonThemeStateReducer.checked,
  };
};

export default connect(mapStateToProps)(Map);