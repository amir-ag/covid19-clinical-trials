import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import  { sidebarDataAction } from '../../store/actions/sidebarDataAction';
import { mapDataAction } from '../../store/actions/mapDataAction';

import mapDarkStyle from "../../assets/mapStyle/mapStyles";
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';


const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
    },
  }),
   withScriptjs,
   withGoogleMap
)
(props =>
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
    zoom={ props.mapZoom }
    center={ props.mapCenter }
    options={{
      styles: props.customMapStyle(),
      zoomControlOptions: { position: 8, right: "10px"},
      streetViewControl:false,
      fullscreenControl:false,
      mapTypeControl: false,
      minZoom: 2.7,
    }}
  >

    {/* rendering user position button */}
    {
      <button className="btn-location" onClick={props.userLocationHandler}>
        <FontAwesomeIcon icon={faCrosshairs} style={ props.showUserLocation ? { width: "20px", height: "20px", color: "#666666" } : { width: "20px", height: "20px", color: "#399DD5" } }/>
      </button>
    }

    {/* rendering user position */}  
    { props.userLocation && !props.showUserLocation && (
      <Marker
        position={{
          lat: props.userLocation.coords.latitude,
          lng: props.userLocation.coords.longitude
        }}
        icon={{
          url: `/userLocationIcon.svg`,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />
    )}
    {/* rendering the clinics position */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={50}
    >
      {
        props.markers.map((clinic, index) => {
          if(clinic.Latitude && clinic.Longitude){
            return (
              <Marker 
                key={index} 
                position={{ lat: clinic.Latitude, lng: clinic.Longitude }}
                icon={{
                  url: `/locationMarker.svg`,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                onClick={props.toggleSideBar}
                onMouseOut={props.hideClinicInfo}
                onMouseOver={() => { props.showClinicInfo(clinic) }}
              >
              </Marker>
            )
          }
        })
      }
    </MarkerClusterer>

    {/* rendering the onMouseOver clinic info */}
    { props.selectedClinic && (
      <InfoWindow 
        position={{
          lat: props.selectedClinic.Latitude,
          lng: props.selectedClinic.Longitude
        }}
        options={{
          pixelOffset: new window.google.maps.Size(0,-30),
          maxWidth: '250'
        }}
        
      >
        <div style={{ textAlign: 'center' }}>
          <h3>{props.selectedClinic.BriefTitle}</h3>
        </div>
      </InfoWindow>
    )}
  </GoogleMap>
);

function MapWrapper(props) {
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 15.7077507, lng: 10.1365919 })
  const [mapZoom, setMapZoom] = useState(2.9);
  
  useEffect(() => { 
      const fetchData = async () => {
        await props.dispatch(mapDataAction());
    }
    fetchData();
  }, []);

  const toggleSideBar = () => {
    document.getElementsByClassName('sidebar-wrapper')[0].classList.toggle('active');
  }

  const showClinicInfo = (clinic) => {
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

  return (
    <MapWithAMarkerClusterer 
      markers={props.data} 
      mapZoom={mapZoom}
      mapCenter={mapCenter}
      customMapStyle={customMapStyle}
      toggleSideBar={toggleSideBar}
      showClinicInfo={showClinicInfo}
      hideClinicInfo={hideClinicInfo}
      selectedClinic={selectedClinic}
      showUserLocation={showUserLocation}
      userLocation={userLocation}
      userLocationHandler={userLocationHandler}
    />
  )
}


const mapStateToProps = ({ buttonThemeStateReducer, mapDataReducer: { data } }) => {
  console.log("mapToProps: ", data)
  return {
    checked: buttonThemeStateReducer.checked,
    data: data
  };
};

export default connect(mapStateToProps)(MapWrapper);
