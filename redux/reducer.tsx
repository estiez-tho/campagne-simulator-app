import { INCREASE, DECREASE, PURCHASE_ITEM } from "./actionTypes";
import { actionProps } from "./actions";
import { initialItems } from "../items.mock";
const initialAmount = 0;

export const modifyStatement = (state = initialAmount, action: actionProps) => {
  switch (action.type) {
    case INCREASE:
      if (action.amount) {
        return state + action.amount;
      }
      throw new Error("Could not increase amount");
    case DECREASE:
      if (action.amount && action.amount < state) {
        return state - action.amount;
      }
      throw new Error("Could not decrease amount");
    default:
      return state;
  }
};

export const updateItems = (state = initialItems, action: actionProps) => {
  switch (action.type) {
    case PURCHASE_ITEM:
      const id = action.itemId;
      if (typeof id === "string")
        return {
          ...state,
          [id]: { ...state[id], quantity: state[id].quantity + 1 },
        };
    default:
      return state;
  }
};
