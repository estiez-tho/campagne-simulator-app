export const initialItems: {
  [id: string]: {
    quantity: number;
    disabled: boolean;
    progression: number;
    progressionLastUpdated: Date;
  };
} = {
  "1": {
    quantity: 1,
    disabled: false,
    progression: 100,
    progressionLastUpdated: new Date(),
  },
  "2": {
    quantity: 2,
    disabled: false,
    progression: 1200,
    progressionLastUpdated: new Date(),
  },
  "3": {
    quantity: 3,
    disabled: false,
    progression: 2300,
    progressionLastUpdated: new Date(),
  },
  "4": {
    quantity: 0,
    disabled: true,
    progression: 3400,
    progressionLastUpdated: new Date(),
  },
  "5": {
    quantity: 0,
    disabled: true,
    progression: 4500,
    progressionLastUpdated: new Date(),
  },
};
