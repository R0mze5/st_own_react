import { Lot, LotId } from "typings/lot";
import { ACTION_TYPES } from "./actionTypes";
import { Action } from "./createStore";

export const createTimeAction = (payload: {
  time: Date;
}): Action<{ time: Date }, typeof ACTION_TYPES.SET_TIME> => ({
  type: ACTION_TYPES.SET_TIME,
  payload,
});

export const createSetLotsAction = (payload: {
  lots: Lot[];
}): Action<{ lots: Lot[] }, typeof ACTION_TYPES.SET_LOTS> => ({
  type: ACTION_TYPES.SET_LOTS,
  payload,
});

export const createSetLotPriceAction = (payload: {
  id: LotId;
  price: number;
}): Action<
  { id: LotId; price: number },
  typeof ACTION_TYPES.SET_LOT_PRICE
> => ({
  type: ACTION_TYPES.SET_LOT_PRICE,
  payload,
});

export type AppReducerActions =
  | ReturnType<typeof createTimeAction>
  | ReturnType<typeof createSetLotsAction>
  | ReturnType<typeof createSetLotPriceAction>;
