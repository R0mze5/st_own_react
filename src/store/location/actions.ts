import { ActionCreator } from "../lib/types";
import { LOCATION_ACTION_TYPES } from "./actionTypes";

export const setLocationAction: ActionCreator<
  string,
  typeof LOCATION_ACTION_TYPES.SET_LOCATION
> = (location) => {
  window.location.hash = location;
  return {
    type: LOCATION_ACTION_TYPES.SET_LOCATION,
    payload: location,
  };
};
