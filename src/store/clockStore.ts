import { ACTION_TYPES } from "./actionTypes";
import { AppReducerActions } from "./actions";
import { Reducer } from "./lib/types";

export interface ClockState {
  time: Date;
}

const clockInitialState: ClockState = {
  time: new Date(),
};

export const clockReducer: Reducer<ClockState, AppReducerActions> = (
  state = clockInitialState,
  action
) => {
  if (!action || typeof action !== "object" || !("type" in action)) {
    return state;
  }

  switch (action.type) {
    case ACTION_TYPES.SET_TIME:
      return {
        ...state,
        time: action.payload.time,
      };
    default:
      return state;
  }
};
