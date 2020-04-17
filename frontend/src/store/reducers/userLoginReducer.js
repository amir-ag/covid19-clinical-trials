import { USER_LOGIN } from '../types';

const initialState = {
  token: null,
  authenticated: null
};

export const userLoginReducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, token: action.payload, authenticated: true }
    }
    default:
      return state;
  }
};