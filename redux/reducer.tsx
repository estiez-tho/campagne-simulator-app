import { PURCHASE_ITEM, UPDATE_PROGRESSION } from "./actionTypes";
import { actionProps } from "./actions";
import { initialItems } from "../items.mock";
import { DATA } from "../src/data/items";

const initialState = {
  amount: 0,
  items: initialItems,
};

export const updateItems = (state = initialState, action: actionProps) => {
  const id = action.itemId;
  if (!id) return state;
  const { price, duration } = DATA[DATA.findIndex((elem) => elem.id === id)];
  switch (action.type) {
    case PURCHASE_ITEM:
      if (typeof id === "string" && state.amount >= price)
        return {
          amount: state.amount - price,
          items: {
            ...state.items,
            [id]: {
              ...state.items[id],
              quantity: state.items[id].quantity + 1,
              disabled: false,
              progressionLastUpdated: new Date(),
            },
          },
        };
    case UPDATE_PROGRESSION:
      if (typeof id === "string" && !state.items[id].disabled) {
        const progressionLastUpdated = state.items[id].progressionLastUpdated;
        const currentTime = new Date();
        const deltaTime =
          currentTime.getTime() - progressionLastUpdated.getTime();
        const newProgression =
          (state.items[id].progression + deltaTime) % duration;
        const deltaAmount =
          Math.floor((state.items[id].progression + deltaTime) / duration) *
          price *
          state.items[id].quantity;
        return {
          amount: state.amount + deltaAmount,
          items: {
            ...state.items,
            [id]: {
              ...state.items[id],
              progression: newProgression,
              progressionLastUpdated: currentTime,
            },
          },
        };
      }
    default:
      return state;
  }
};
