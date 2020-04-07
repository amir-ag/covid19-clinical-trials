import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css';

import ReactMapGl, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import React, { useState, useEffect, useRef } from 'react';
import Geocoder from 'react-map-gl-geocoder';

import * as capitalsGeoReferences from './assets/data/capitalsGeoReferences.json'
import coronavirus from './assets/images/coronavirus.svg'

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


function App() {

  const mapRef = useRef();
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [viewPort, setViewPort] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 15.7077507,
    longitude: 10.1365919,
    minZoom: 1.9,
    zoom: 2
  });

  useEffect(() => ( async () => {
    const response = await fetch("https://pomber.github.io/covid19/timeseries.json");
      const data = await response.json();
      const countriesInfo = countriesUpdatedData(data);
      setCountriesInfo(countriesInfo)
      //console.log("data: ", data)
  })(), []);

  const showCountryInfo = (e, country) => {
    e.preventDefault();
    setSelectedCountry(country)
  }

  const hideCountryInfo = (e) => {
    e.preventDefault();
    setSelectedCountry(null)
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
        mapStyle='mapbox://styles/hmcc/ck8n33df30nph1ip731yu2fxa'
      >
        {/* allowing/rendering the user location */}
         <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showUserLocation={true}
        />

        {
          /* rendering the coronavirus icons */
          countriesInfo.map((country, key) => {
            return (
              <Marker key={key} latitude={country.location.latitude} longitude={country.location.longitude}>
                
                <button onMouseLeave={hideCountryInfo} onMouseOver={(e) => showCountryInfo(e, country)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
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

        {/* rendering the navigation control */}
        <div style={navigationControlStyle}>  
          <NavigationControl />
        </div>

        {/* rendering the search box */}
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        /> 

      </ReactMapGl>
    </>
  );
}

export default App;
