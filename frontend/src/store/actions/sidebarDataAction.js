import { SIDEBAR_DATA } from '../types';

export const sidebarDataAction = (sidebarData) => ({
  type: SIDEBAR_DATA,
  payload: sidebarData
});