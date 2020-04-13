import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './style.css';

import ReactMapGl, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import React, { useState, useEffect, useRef } from 'react';
import Geocoder from 'react-map-gl-geocoder';
import { connect } from 'react-redux';
import  { sidebarDataAction } from '../../store/actions/sidebarDataAction'

import * as capitalsGeoReferences from '../../assets/data/capitalsGeoReferences.json'
import coronavirus from '../../assets/images/coronavirus.svg'

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  rigth: 0,
  margin: 10
};

const navigationControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '50px 10px'
};

function Map(props) {

  const mapRef = useRef();
  //const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiaG1jYyIsImEiOiJjazhuMjRqZmYwNHltM2ZsdmozMXcxYmVkIn0.N_1CqpQxfoju6PijpkXBKA'

  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [viewPort, setViewPort] = useState({
    width: '100vw',
    //width: 'calc(100vw - var(--sidebar-wrapper-width)',
    height: '100vh',
    //height: 'calc(100vh - var(--header-main-height) - var(--header-main-height))',
    latitude: 15.7077507,
    longitude: 10.1365919,
    minZoom: 1.9,
    zoom: 2
  });

  useEffect(() => { 
    const fetchData = async () => {
      const response = await fetch("https://pomber.github.io/covid19/timeseries.json");
      const data = await response.json();
      const countriesInfo = countriesUpdatedData(data);
      setCountriesInfo(countriesInfo)
    }
    fetchData();
  }, []);

  const showCountryInfo = (e, country) => {
    e.preventDefault();
    setSelectedCountry(country);
    props.dispatch(sidebarDataAction(country));
  }

  const hideCountryInfo = (e) => {
    e.preventDefault();
    setSelectedCountry(null)
  }

  const toggleSideBar = (e) => {
    document.getElementsByClassName('sidebar-wrapper')[0].classList.toggle('active');
    document.getElementsByClassName('geolocate-navigation-controls')[0].classList.toggle('active');
  }

  const handleGeocoderViewportChange = (viewPort) => setViewPort(viewPort);

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

  const customMapStyle = () => {
    const themeButtonSwitch = props.checked;
    //if theme button is checked (dark mode), otherwise light mode
    if(themeButtonSwitch) return 'mapbox://styles/hmcc/ck8n33df30nph1ip731yu2fxa';
    else return 'mapbox://styles/mapbox/streets-v11';
  }

  return (
    <>
    {/*

    ReactMapGl:
      viewPort:               rendering the map base on the default viewPort state values
      mapboxApiAccessToken:   passing the mapbox token available in the .env.local
      onViewportChange:       bild in method to change the viewPort default values, necessary to move and zoom in/out the map
      mapStyle:               overwriting the default map style
      ref:                    necessary because of the Geocoder component

    */}
      <ReactMapGl
        ref={mapRef}
        {...viewPort}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={handleGeocoderViewportChange}
        //mapStyle = 'mapbox://styles/hmcc/ck8n33df30nph1ip731yu2fxa'
        mapStyle = {customMapStyle()}
      >
        <div className="geolocate-navigation-controls">
          {/* allowing/rendering the user location */}
          <div className="geolocate-controls">
            <GeolocateControl
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              showUserLocation={true}
            />
          </div>
          {/* rendering the navigation control */}
            <NavigationControl />
        </div>

        {/* rendering the search box */}
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />

        {
          /* rendering the coronavirus icons */
          countriesInfo.map((country, key) => {
            return (
              <Marker key={key} latitude={country.location.latitude} longitude={country.location.longitude}>
                
                <button onClick={toggleSideBar} onMouseLeave={hideCountryInfo} onMouseOver={(e) => showCountryInfo(e, country)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                  <img src={coronavirus} alt="coronavirus" style={{width: '25px', height: '25px'}}/>
                </button>

              </Marker>
            )
          })
        }
        { selectedCountry && (
            <Popup latitude={selectedCountry.location.latitude} longitude={selectedCountry.location.longitude}>
              <h3>{selectedCountry.country.name}</h3>
              <p>Confirmed: {selectedCountry.country.confirmed}</p>
              <p>Deaths: {selectedCountry.country.deaths}</p>
              <p>Recovered: {selectedCountry.country.recovered}</p>
              <p>Date: {selectedCountry.country.date}</p>   
            </Popup>
          ) 
        }
      </ReactMapGl>
    </>
  );
}

const mapStateToProps = ({ buttonThemeStateReducer }) => {
  return {
    checked: buttonThemeStateReducer.checked
  };
};

export default connect(mapStateToProps)(Map);
