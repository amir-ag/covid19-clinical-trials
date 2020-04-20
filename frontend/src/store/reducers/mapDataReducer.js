import { MAP_DATA } from "../types";
import { SEARCH_DATA } from "../types";

const initState = {
  data: []
};

export const mapDataReducer = (state = initState, action) => {
    switch (action.type) {
        case MAP_DATA: {
          return { data: [...action.payload] }
        }
        case SEARCH_DATA: {
            return { data: [...action.payload] }
        }
        default:
          return state;
      }
}