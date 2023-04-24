import { Store, combineReducers } from "./createStore";
import { AppReducerActions } from "./actions";
import { ClockState, clockReducer } from "./clockStore";
import { DataState, dataReducer } from "./dataStore.ts";

export interface State {
  clock: ClockState;
  data: DataState;
}

export const store = new Store<State, AppReducerActions>(
  combineReducers<State, AppReducerActions>({
    clock: clockReducer,
    data: dataReducer,
  })
);
