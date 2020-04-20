import React from 'react';
import { withGoogleMap, withScriptjs } from "react-google-maps";
import Map from '../Map';

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapWrapper() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCTnTT4eg4Qjz7JA0BL8l7JjxFxQvhpw-s"}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }