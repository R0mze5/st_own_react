import { routerPaths } from "../../router/paths";
import { AppReducerActions } from "../actions";
import { Reducer } from "../lib/types";
import { LOCATION_ACTION_TYPES } from "./actionTypes";

export interface LocationState {
  currentLocation: string;
}

const initialState: LocationState = {
  currentLocation: window.location.hash.replace("#", "") ?? routerPaths.home,
};

export const locationReducer: Reducer<LocationState, AppReducerActions> = (
  state = initialState,
  action
) => {
  if (!action || typeof action !== "object" || !("type" in action)) {
    return state;
  }

  switch (action.type) {
    case LOCATION_ACTION_TYPES.SET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
};
