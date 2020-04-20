import { baseUrl } from "../constants";

export const userValidationAction = data => async (dispatch, getState) => {
  
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const body = JSON.stringify(data);

  const config = {
    headers,
    body,
    method: 'PATCH'
  };

 fetch(`${ baseUrl }/auth/registration/validation/`, config);
  
};