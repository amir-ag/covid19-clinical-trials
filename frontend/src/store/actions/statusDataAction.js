import { baseUrl } from "../constants";
import { STATUS_OPTION_DATA } from "../types";

export const statusData = (data) => ({
    type: STATUS_OPTION_DATA,
    payload: data
});


export const statusDataAction = (toSearch) => async (dispatch, getState) => {
 
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const config = {
    headers,
    method: 'GET'
  };

  let response = null;
  let statusToSearch = ''

  if (!toSearch.length) response = await fetch(`/studies/`, config);
  else {
    for(let status of toSearch) {
      statusToSearch += `${status.value},`
    }
    statusToSearch = statusToSearch.substring(0, statusToSearch.length - 1);

    //console.log("statusToSearch: ", statusToSearch)
    response = await fetch(`/studies/status/?search_status=${statusToSearch}`, config);
  }

  // if (!toSearch.length) response = await fetch(`${baseUrl}/studies/`, config);
  // else {
  //   for(let status of toSearch) {
  //     statusToSearch += `${status.value},`
  //   }
  //   statusToSearch = statusToSearch.substring(0, statusToSearch.length - 1);
  //   response = await fetch(`${baseUrl}/studies/status/?search_status=${statusToSearch}`, config);
  // }

  const data = await response.json();

  dispatch(statusData(data));
};