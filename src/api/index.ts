import * as backend from "./backend";
import * as storage from "./storage";

function backendAndStorageFunction(backendFunction: any, storageFunction: any) {
  return async (...args: any[]) => {
    try {
      const res = await storageFunction(...args);
      return res;
    } catch (err) {
      return await backendFunction(...args);
    }
  };
}

export const getUserInfo = backendAndStorageFunction(
  backend.getUserInfo,
  storage.getUserInfo
);
