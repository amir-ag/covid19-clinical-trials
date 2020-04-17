import { baseUrl } from "../constants";
import { USER_LOGIN } from "../types";

export const userLogin = token => ({
  type: USER_LOGIN,
  payload: token
});

export const userLoginAction = data => async (dispatch, getState) => {
  console.log("data ", data);
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const body = JSON.stringify(data);

  const config = {
    headers,
    body,
    method: 'POST'
  };

  const response = await fetch(`${ baseUrl }/auth/token/`, config);
  const user = await response.json();
  const { access } = user;

  console.log('User: ', user);
  console.log('token: ', access);

  if(access){
    localStorage.setItem('token', access)
  }
  dispatch(userLogin(access));
  return user;
};