import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
//import * as parkData from "../../data/skateboard-parks.json";
import mapStyles from "../../assets/mapStyle/mapStyles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  { sidebarDataAction } from '../../store/actions/sidebarDataAction';
import * as capitalsGeoReferences from '../../assets/data/capitalsGeoReferences.json';
import coronavirus from '../../assets/images/coronavirus.svg'
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
      setCountriesInfo(countriesInfo)
      console.log("useEffect")
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
    console.log("showCountryInfo:", country)
    setSelectedCountry(country);
    //props.dispatch(sidebarDataAction(country));
  }

  const hideCountryInfo = () => {
    setSelectedCountry(null)
  }

  return (
    <GoogleMap 
    defaultZoom={ 2.9 } 
    defaultCenter={{ lat: 15.7077507, lng: 10.1365919 }} 
    defaultOptions={{ 
                      styles: mapStyles,
                      zoomControlOptions: { position: 8 },
                      streetViewControl:false,
                      fullscreenControl:false,
                      mapTypeControl: false,
                      minZoom: 2.7
                    }} 
    zoom={ mapZoom }
    center={ mapCenter }
    // options={{
    //   styles: mapStyles
    // }}
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
            //onClick={toggleSideBar}
            onMouseOut={hideCountryInfo}
            onMouseOver={() => { showCountryInfo(country) }}
          >
          </Marker>
        )
      })
    }


    
      {/* {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))} */
      //console.log('mapConfiguration: ', mapConfiguration)
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
      >
        <>
          <h3>{selectedCountry.country.name}</h3>
          <p>Confirmed: {selectedCountry.country.confirmed}</p>
          <p>Deaths: {selectedCountry.country.deaths}</p>
          <p>Recovered: {selectedCountry.country.recovered}</p>
          <p>Date: {selectedCountry.country.date}</p>
        </>
      </InfoWindow>
    ) 
    }
      

      {/* {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )} */}
    </GoogleMap>
  );
}

const mapStateToProps = ({ buttonThemeStateReducer }) => {
  return {
    checked: buttonThemeStateReducer.checked
  };
};

export default connect(mapStateToProps)(Map);