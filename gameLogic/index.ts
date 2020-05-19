// Update only if a whole cycle has been performed
export function getCurrentServerDate(
  lastServerDate: Date,
  lastDeviceDate: Date
) {
  lastServerDate = new Date(lastServerDate);
  lastDeviceDate = new Date(lastDeviceDate);
  return new Date(
    lastServerDate.getTime() + new Date().getTime() - lastDeviceDate.getTime()
  );
}

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

    const currentTime = getCurrentServerDate(
      state.serverTime,
      state.deviceTime
    );

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
      progressionLastUpdated: currentTime,
      numberOfReachedGoal,
    };
  });
  return {
    ...state,
    amount: state.amount + deltaAmount,
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
