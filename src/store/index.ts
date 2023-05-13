import { Store, combineReducers } from "./createStore";
import { AppReducerActions } from "./actions";
import { ClockState, clockReducer } from "./clockStore";
import { DataState, dataReducer } from "./dataStore.ts";
import { LocationState, locationReducer } from "./location/reducer";

export interface State {
  clock: ClockState;
  data: DataState;
  location: LocationState;
}

export const store = new Store<State, AppReducerActions>(
  combineReducers<State, AppReducerActions>({
    clock: clockReducer,
    data: dataReducer,
    location: locationReducer,
  })
);
