// Update only if a whole cycle has been performed
function updateDurationBasedOnNumberOfReachedGoal(
  duration: number,
  numberOfReachedGoal: number
) {
  return Math.max(1000, Math.ceil(duration / Math.pow(2, numberOfReachedGoal)));
}

export function updateState(state: any) {
  const updatedItems = { ...state.items };
  let deltaAmount = 0;
  Object.keys(updatedItems).forEach((id) => {
    let {
      reward,
      quantity,
      duration,
      progression,
      progressionLastUpdated,
      numberOfReachedGoal,
    } = updatedItems[id];

    const currentTime = new Date();

    if (typeof progressionLastUpdated === "string")
      progressionLastUpdated = new Date(progressionLastUpdated);

    const deltaTime = currentTime.getTime() - progressionLastUpdated.getTime();

    const numberOfCycles = Math.floor((progression + deltaTime) / duration);

    const cycleFinished = Math.floor((progression + deltaTime) / duration) >= 1;

    progression = (progression + deltaTime) % duration;

    if (cycleFinished) {
      duration = updateDurationBasedOnNumberOfReachedGoal(
        duration,
        numberOfReachedGoal
      );
      numberOfReachedGoal = 0;
      deltaAmount += quantity * reward * numberOfCycles;
    }
    updatedItems[id] = {
      ...updatedItems[id],
      progression,
      duration,
      progressionLastUpdated: new Date(),
      numberOfReachedGoal,
    };
  });
  return {
    ...state,
    amount: state.amount + deltaAmount,
    amountLastUpdated: new Date(),
    items: updatedItems,
  };
}

// Update every Purchase
export function updatePrice(price: number) {
  return Math.ceil(1.1 * price);
}

export function updateGoalBasedOnQuantity(
  quantity: number,
  nextGoal: number,
  numberOfReachedGoal: number
) {
  if (quantity === nextGoal) {
    return {
      nextGoal: nextGoal * 3,
      numberOfReachedGoal: numberOfReachedGoal + 1,
    };
  }
  return { nextGoal, numberOfReachedGoal };
}
