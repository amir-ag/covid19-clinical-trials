import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MapWrapper from './components/MapWrapper'


import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* <div style={{display: "flex"}}> */}
          <Sidebar />
          <Switch>
            <Route exact path='/' component={MapWrapper} />
          </Switch>
        {/* </div> */}
        <Footer />
      </Router>
    </>
  );
}


export default App;


// import React, { Component } from 'react';
// const fetch = require("isomorphic-fetch");
// const { compose, withProps, withHandlers } = require("recompose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } = require("react-google-maps");
// const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

// const MapWithAMarkerClusterer = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100vh` }} />,
//     containerElement: <div style={{ height: `100vh` }} />,
//     mapElement: <div style={{ height: `100vh` }} />,
//   }),
//   withHandlers({
//     onMarkerClustererClick: () => (markerClusterer) => {
//       const clickedMarkers = markerClusterer.getMarkers()
//       console.log(`Current clicked markers length: ${clickedMarkers.length}`)
//       console.log(clickedMarkers)
//     },
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultZoom={3}
//     defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
//   >
//     <MarkerClusterer
//       onClick={props.onMarkerClustererClick}
//       averageCenter
//       enableRetinaIcons
//       gridSize={60}
//     >
//       {props.markers.map(marker => (
//         <Marker
//           key={marker.clinics[0].id}
//           position={{ lat: marker.Latitude, lng: marker.Longitude }}
//         />
//       ))}
//     </MarkerClusterer>
//   </GoogleMap>
// );

// class App extends Component {
//   componentWillMount() {
//     this.setState({ markers: [] })
//   }

//   componentDidMount() {
//     const url = [
//       // // Length issue
//       // `https://gist.githubusercontent.com`,
//       // `/farrrr/dfda7dd7fccfec5474d3`,
//       // `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
//       "/studies/"
//     ].join("")

//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         this.setState({ markers: data });
//       });
//   }

//   render() {
//     console.log("markers: ", this.state.markers)
//     return (
//       <MapWithAMarkerClusterer markers={this.state.markers} />
//     )
//   }
// }

// export default App;
