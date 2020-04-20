import { baseUrl } from "../constants";
import { SEARCH_DATA } from "../types";

export const searchData = (data) => ({
    type: SEARCH_DATA,
    payload: data
});


export const searchDataAction = (toSearch) => async (dispatch, getState) => {
 
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const config = {
    headers,
    method: 'GET'
  };

  let response = null;
  // if (toSearch === '') response = await fetch(`/studies/`, config);
  // else response = await fetch(`/studies/?search=${toSearch}`, config);
  if (toSearch === '') response = await fetch(`${baseUrl}/studies/`, config);
  else response = await fetch(`${baseUrl}/studies/?search=${toSearch}`, config);
  const data = await response.json();

  dispatch(searchData(data));
};