import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapDarkStyle from "../../assets/mapStyle/mapStyles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  { sidebarDataAction } from '../../store/actions/sidebarDataAction';
import * as capitalsGeoReferences from '../../assets/data/capitalsGeoReferences.json';
import './index.css';

function Map(props) {
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 15.7077507, lng: 10.1365919 })
  const [mapZoom, setMapZoom] = useState(2.9);

  useEffect(() => { 
      const fetchData = async () => {
      const response = await fetch("https://pomber.github.io/covid19/timeseries.json");
      const data = await response.json();
      const countriesInfo = countriesUpdatedData(data);
      setCountriesInfo(countriesInfo);
    }
    fetchData();
  }, []);

  const countriesUpdatedData = (virusInfoByCountry) => {
    const countries = [];
    for (const [country, mostRecentData] of Object.entries(virusInfoByCountry)) {
      capitalsGeoReferences.cities.results.forEach((city) => {
        if (city.country.name === country) {
          countries.push({ country: { name: country, ...mostRecentData[mostRecentData.length - 1] }, location: city.location })
        }
      });
    }
    return countries;
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

  const toggleSideBar = () => {
    document.getElementsByClassName('sidebar-wrapper')[0].classList.toggle('active');
  }

  const showCountryInfo = (country) => {
    setSelectedCountry(country);
    props.dispatch(sidebarDataAction(country));
  }

  const hideCountryInfo = () => {
    setSelectedCountry(null)
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
      zoomControlOptions: { position: 8 },
      streetViewControl:false,
      fullscreenControl:false,
      mapTypeControl: false,
      minZoom: 2.7
    }}
    >
    
    {
      <button className="btn-location" onClick={userLocationHandler}>
        <FontAwesomeIcon icon={faCrosshairs} style={ showUserLocation ? { width: "20px", height: "20px", color: "#666666" } : { width: "20px", height: "20px", color: "#399DD5" } }/>
      </button>
    }

    {
      /* rendering the coronavirus icons */
      countriesInfo.map((country, index) => {
        return (
          <Marker 
            key={index} 
            position={{ lat: country.location.latitude, lng: country.location.longitude}}
            icon={{
              url: `/coronavirus.svg`,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
            onClick={toggleSideBar}
            onMouseOut={hideCountryInfo}
            onMouseOver={() => { showCountryInfo(country) }}
          >
          </Marker>
        )
      })
    }


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


    { selectedCountry && (
      <InfoWindow 
        position={{
          lat: selectedCountry.location.latitude,
          lng: selectedCountry.location.longitude
        }}
        options={{pixelOffset: new window.google.maps.Size(0,-30)}}
      >
        <>
          <h3>{selectedCountry.country.name}</h3>
          <p>Confirmed: {selectedCountry.country.confirmed}</p>
          <p>Deaths: {selectedCountry.country.deaths}</p>
          <p>Recovered: {selectedCountry.country.recovered}</p>
          <p>Date: {selectedCountry.country.date}</p>
        </>
      </InfoWindow>
    )}

    </GoogleMap>
  );
}
// export default Map;
const mapStateToProps = ({ buttonThemeStateReducer }) => {
  return {
    checked: buttonThemeStateReducer.checked
  };
};

export default connect(mapStateToProps)(Map);