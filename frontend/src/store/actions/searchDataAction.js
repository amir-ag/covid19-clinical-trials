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
  if (toSearch === '') response = await fetch(`/studies/search/`, config);
  else response = await fetch(`/studies/search/?search=${toSearch}`, config);
  // if (toSearch === '') response = await fetch(`${baseUrl}/studies/search/`, config);
  // else response = await fetch(`${baseUrl}/studies/search/?search=${toSearch}`, config);
  const data = await response.json();

  const aggregatedData = [{
      Latitude: data[0]['Latitude'],
      Longitude: data[0]['Longitude'],
      clinics: []
  }]

  aggregatedData[0]['clinics'].push(data[0]);
  aggregatedData[0]['clinics'][0].visitStudy=`https://clinicaltrials.gov/ct2/show/${data[0]['NCTId']}`; 

  for(let i in data) {
    let is_in_data = 0
    for( let [idx, s] of aggregatedData.entries()) {  // check for latitude and longitude into data list
        if ( data[i]['Latitude'] === s['Latitude'] && data[i]['Longitude'] === s['Longitude'] ) {
            is_in_data = 1
            let ckeck_id = 0
            for(let clinic of aggregatedData[idx]['clinics']) {
                if ( data[i]['id'] === clinic['id']) {
                    ckeck_id = 1;
                }
            }
            if (!ckeck_id) { 
                data[i]['visitStudy'] = `https://clinicaltrials.gov/ct2/show/${data[i]['NCTId']}`
                aggregatedData[idx]['clinics'].push(data[i])
            }
        }
    }

    if (!is_in_data) {
        data[i]['visitStudy'] = `https://clinicaltrials.gov/ct2/show/${data[i]['NCTId']}`
        aggregatedData.push({
                    'Latitude': data[i]['Latitude'],
                    'Longitude': data[i]['Longitude'],
                    'clinics': [data[i]]
                })
    }
  }

  dispatch(searchData(aggregatedData));
};