import {
  INCREASE,
  DECREASE,
  PURCHASE_ITEM,
  UPDATE_PROGRESSION,
  SET_STATE,
  SYNC_TIME,
} from "./actionTypes";

export interface actionProps {
  type: string;
  itemId?: string;
  payload?: any;
}

export const increase = (amount: number) => {
  return { type: INCREASE, amount };
};

export const decrease = (amount: number) => {
  return { type: DECREASE, amount };
};

export const purchase = (itemId: string) => {
  return { type: PURCHASE_ITEM, itemId };
};

export const updateProgression = () => {
  return { type: UPDATE_PROGRESSION };
};

export const setState = (payload: any) => {
  return { type: SET_STATE, payload };
};

export const syncTime = (serverTime: Date, deviceTime: Date) => {
  return { type: SYNC_TIME, payload: { serverTime, deviceTime } };
};
