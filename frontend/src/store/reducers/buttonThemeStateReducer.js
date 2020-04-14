import { BUTTON_THEME_STATE } from '../types';

const initialState = {
  checked: false
};

export const buttonThemeStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUTTON_THEME_STATE: {
      return { checked: action.payload };
    }
    default:
      return state;
  }
};
