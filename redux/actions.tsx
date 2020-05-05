import { INCREASE, DECREASE, PURCHASE_ITEM } from "./actionTypes";

export interface actionProps {
  type: string;
  amount?: number;
  itemId?: string;
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
