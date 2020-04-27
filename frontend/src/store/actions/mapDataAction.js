import { baseUrl } from "../constants";
import { MAP_DATA } from "../types";

const mapData = data => ({
  type: MAP_DATA,
  payload: data
});

const markersWithSamePosition = (allMarkers) => {
  if (allMarkers.length != 0) {
    console.log("some position")
    console.log("allMarkers", allMarkers)
    for (let i=0; i < allMarkers.length; i++) {
      const marker = allMarkers[i];
      //update the position of the coincident marker by applying a small multipler to its coordinates
      marker.Latitude = marker.Latitude + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
      marker.Longitude = marker.Longitude + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
    }
  }
  return allMarkers;
}

export const mapDataAction = () => async (dispatch, getState) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    headers,
    method: 'GET'
  };

  //const response = await fetch(`/studies/`, config);
  const response = await fetch(`${baseUrl}/studies/`, config);
  let data = await response.json();
  data = markersWithSamePosition(data);

  dispatch(mapData(data));
};