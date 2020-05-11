import { PURCHASE_ITEM, UPDATE_PROGRESSION, SET_STATE } from "./actionTypes";
import { actionProps } from "./actions";
import { initData } from "../src/data/initData";
import {
  updateState,
  updateGoalBasedOnQuantity,
  updatePrice,
} from "../gameLogic/index";
import { updateUserInfo } from "../src/api/index";

export const updateItems = (state = initData, action: actionProps) => {
  let updatedState;
  let id;

  switch (action.type) {
    case SET_STATE:
      return updateState(action.payload);
    case PURCHASE_ITEM:
      id = action.itemId;
      if (!id) return state;

      let {
        price,
        quantity,
        nextGoal,
        numberOfReachedGoal,
        progressionLastUpdated,
        progression,
      } = state.items[id];

      if (typeof id === "string" && state.amount >= price) {
        const previousPrice = price;
        price = updatePrice(price);

        if (quantity === 0) {
          progressionLastUpdated = new Date();
          progression = 0;
        }

        quantity = quantity + 1;

        let goal = updateGoalBasedOnQuantity(
          quantity,
          nextGoal,
          numberOfReachedGoal
        );

        const updatedState = {
          amount: state.amount - previousPrice,
          items: {
            ...state.items,
            [id]: {
              ...state.items[id],
              ...goal,
              quantity,
              price,
              progressionLastUpdated,
              progression,
            },
          },
        };

        updateUserInfo(state._id, updatedState);

        return updatedState;
      }
      return state;

    case UPDATE_PROGRESSION:
      updatedState = updateState(state);

      return {
        ...state,
        ...updatedState,
      };

    default:
      return state;
  }
};
