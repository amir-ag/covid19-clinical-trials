import { SIDEBAR_DATA } from '../types';

const initialState = {
  clinics: [{
    BriefTitle: "",
    CentralContactEMail: "",
    LocationFacility: "",
    LocationCountry: "",
    LocationCity: "",
    visitStudy: ""
  }]
};

export const sidebarDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_DATA: {
      return { clinics: action.payload };
    }
    default:
      return state;
  }
};