import { SEARCH_DATA } from '../types/SEARCH_DATA';
import { baseUrl } from "../constants";

export const searchAction = (data) => ({
    type: SEARCH_DATA,
    payload: data
});


export const searchData = toSearch => async (dispatch, getState) => {
  const currentUser = getState().currentUser;

  console.log("toSearch ", toSearch);
  console.log("currentUser ", currentUser);

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentUser.token}`
  });

  const body = JSON.stringify(toSearch);

  const config = {
    headers,
    body,
    method: 'GET'
  };

  const response = await fetch(`${ baseUrl }...`, config);
  const data = await response.json();
 
  console.log("data: ", data);

  dispatch(searchAction(data));
  return user;
};