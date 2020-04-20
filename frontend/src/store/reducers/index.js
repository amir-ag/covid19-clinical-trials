import { combineReducers } from 'redux';
import { buttonThemeStateReducer } from './buttonThemeStateReducer';
import { sidebarDataReducer } from './sidebarDataReducer';
import { mapDataReducer } from './mapDataReducer';
import { registrationValidationReducer } from './registrationValidationReducer';
import { userLoginReducer } from './userLoginReducer';

export const reducers = combineReducers({
  registrationValidationReducer,
  buttonThemeStateReducer,
  sidebarDataReducer,
  userLoginReducer,
  mapDataReducer,
});
