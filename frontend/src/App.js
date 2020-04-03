import React from 'react';
import * as mapboxgl from 'mapbox-gl';

class App extends React.Component {
  constructor(){
    super()
    this.mapRef = React.createRef()
  }

  componentDidMount(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiY292aWRwcm9wdWxzaW9uIiwiYSI6ImNrOGlxeDZjOTA3ZWUzbG81ejlxY2RuaXgifQ.h2H0sYOWkXRE57lSjhMCGQ';

    // create mapbox object
    new mapboxgl.Map({
      container: this.mapRef.current,
      style:'mapbox://styles/mapbox/light-v10',
      center:[0,0],
      zoom: 1
    })
  }

  render(){
    return (
      <div style={{width: "100%", height:"100vh"}} ref={this.mapRef}>

      </div>
    )
  }
}

export default App;