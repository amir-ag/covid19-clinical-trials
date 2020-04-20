import { baseUrl } from "../constants";
import { USER_REGISTRATION } from "../types";

export const userRegistration = email => ({
  type: USER_REGISTRATION,
  payload: email.email
});

export const userRegistrationAction = email => async (dispatch, getState) => {
  
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const body = JSON.stringify(email);

  const config = {
    headers,
    body,
    method: 'POST'
  };

  await fetch(`${ baseUrl }/auth/registration/`, config);
  dispatch(userRegistration(email));

};