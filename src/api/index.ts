import * as backend from "./backend";
import * as storage from "./storage";

export async function getUserInfo(data: any) {
  return await backend.getUserInfo(data);
}

export async function updateUserInfo(id: string, data: any) {
  await backend.updateUserInfo(id, data);
}
