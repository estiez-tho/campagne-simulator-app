import {
  INCREASE,
  DECREASE,
  PURCHASE_ITEM,
  UPDATE_PROGRESSION,
} from "./actionTypes";

export interface actionProps {
  type: string;
  itemId: string;
  previousTime?: number;
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

export const updateProgression = (itemId: string) => {
  return { type: UPDATE_PROGRESSION, itemId };
};
