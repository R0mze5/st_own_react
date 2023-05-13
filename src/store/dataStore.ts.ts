import { Lot } from "typings/lot";
import { ACTION_TYPES } from "./actionTypes";
import { AppReducerActions } from "./actions";
import { Reducer } from "./lib/types";

export interface DataState {
  lots: Lot[] | null;
}

const dataInitialState: DataState = {
  lots: null,
};

export const dataReducer: Reducer<DataState, AppReducerActions> = (
  state = dataInitialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case ACTION_TYPES.SET_LOTS:
      return {
        ...state,
        lots: action.payload.lots,
      };
    case ACTION_TYPES.SET_LOT_PRICE:
      return {
        ...state,
        lots:
          state?.lots?.map((lot) => {
            if (action.payload.id === lot.id) {
              return {
                ...lot,
                price: action.payload.price,
              };
            }

            return lot;
          }) ?? null,
      };
    case ACTION_TYPES.SET_LOT_FAVORITE:
      return {
        ...state,
        lots:
          state?.lots?.map((lot) => {
            if (action.payload.id === lot.id) {
              return {
                ...lot,
                favorite: true,
              };
            }

            return lot;
          }) ?? null,
      };
    case ACTION_TYPES.SET_LOT_UNFAVORITE:
      return {
        ...state,
        lots:
          state?.lots?.map((lot) => {
            if (action.payload.id === lot.id) {
              return {
                ...lot,
                favorite: false,
              };
            }

            return lot;
          }) ?? null,
      };

    default:
      return state;
  }
};
