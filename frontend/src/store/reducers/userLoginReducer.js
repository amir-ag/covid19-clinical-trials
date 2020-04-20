import { USER_LOGIN } from '../types';
import { USER_LOGOUT } from '../types';

const initialState = {
  token: null,
  authenticated: true
};

export const userLoginReducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, token: action.payload, authenticated: true }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        token: action.payload,
        authenticated: null
      };
    }
    default:
      return state;
  }
};