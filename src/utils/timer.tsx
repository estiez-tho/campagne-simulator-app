export const getTimeFromSeconds = (seconds: number) => {
  const numberOfMinutes = Math.floor(seconds / 60);
  const numberOfSeconds = seconds % 60;
  return `${numberOfMinutes}:${
    numberOfSeconds < 10 ? "0" : ""
  }${numberOfSeconds}`;
};
