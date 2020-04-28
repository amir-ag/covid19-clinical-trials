import { baseUrl } from "../constants";
import { MAP_DATA } from "../types";

const mapData = data => ({
  type: MAP_DATA,
  payload: data
});

export const mapDataAction = () => async (dispatch, getState) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    headers,
    method: 'GET'
  };

  const response = await fetch(`/studies/`, config);
  //const response = await fetch(`${baseUrl}/studies/`, config);
  let data = await response.json();
  //data = markersWithSamePosition(data);

  dispatch(mapData(data));
};