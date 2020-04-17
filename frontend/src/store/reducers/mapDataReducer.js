import { MAP_DATA } from "../types";
import { SEARCH_DATA } from "../types";

const initState = null;

export const mapDataReducer = (state = initState, action) => {
    switch (action.type) {
        case MAP_DATA: {
          return { ...action.payload }
        }
        case SEARCH_DATA: {
            return { ...action.payload }
        }
        default:
          return state;
      }
}