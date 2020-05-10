import * as backend from "./backend";
import * as storage from "./storage";

function backendAndStorageFunction(backendFunction: any, storageFunction: any) {
  return async (...args: any[]) => {
    try {
      const res = await backendFunction(...args);
      return res;
    } catch (err) {
      return await storageFunction(...args);
    }
  };
}

export const getUserInfo = backendAndStorageFunction(
  backend.getUserInfo,
  storage.getUserInfo
);

export const pushPurchases = backendAndStorageFunction(
  backend.pushPurchases,
  storage.pushPurchases
);

export const updateUserInfo = backendAndStorageFunction(
  backend.updateUserInfo,
  storage.updateUserInfo
);
