import * as backend from "./backend";
import * as storage from "./storage";

export async function getUserInfo(data: any) {
  try {
    const res = await storage.getUserInfo(data);
    return res;
  } catch (err) {
    return await backend.getUserInfo(data);
  }
}

export async function updateUserInfo(id: string, data: any) {
  await storage.updateUserInfo(id, data);
  try {
    await backend.updateUserInfo(id, data);
  } catch (err) {}
}
