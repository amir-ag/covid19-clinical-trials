import { SIDEBAR_DATA } from '../types';

const initialState = {
  country: {
    name: '', 
    date: '', 
    confirmed: null, 
    deaths: null, 
    recovered: null
  },
  location: {
    latitude: null,
    longitude: null
  }
};

export const sidebarDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_DATA: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};