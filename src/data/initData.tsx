export interface State {
  _id: string;
  username: string;
  email: string;
  amount: number;
  items: { [id: string]: any };
  serverTime: Date | null;
  deviceTime: Date | null;
}

export const initData: State = {
  _id: "",
  username: "",
  email: "",
  amount: 0,
  items: {},
  serverTime: null,
  deviceTime: null,
};
