import { combineReducers } from 'redux';
import { buttonThemeStateReducer } from './buttonThemeStateReducer';
import { sidebarDataReducer } from './sidebarDataReducer';

export const reducers = combineReducers({
  buttonThemeStateReducer,
  sidebarDataReducer
});
