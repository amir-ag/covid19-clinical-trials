import { USER_LOGOUT } from '../types';

export const logOutAction = token => {
  localStorage.clear();
  return {
    type: USER_LOGOUT,
    payload: token
  };
};