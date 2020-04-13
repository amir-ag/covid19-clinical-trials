import { BUTTON_THEME_STATE } from '../types';

export const buttonThemeStateAction = (buttonState) => ({
  type: BUTTON_THEME_STATE,
  payload: buttonState
});

