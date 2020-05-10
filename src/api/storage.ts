import SecureStore from "expo-secure-store";

export async function getUserInfo(id: string): Promise<void> {
  const userInfo = await SecureStore.getItemAsync("UserInfo");

  if (!userInfo) throw new Error("Could not find User in storage");

  return JSON.parse(userInfo);
}

export async function pushPurchases(id: string, purchases: any) {}

export async function updateUserInfo(id: string, updatedFields: any) {}