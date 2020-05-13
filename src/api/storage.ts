import * as SecureStore from "expo-secure-store";

export async function getUserInfo(id: string): Promise<void> {
  const userInfo = await SecureStore.getItemAsync("UserInfo");

  if (!userInfo) throw new Error("Could not find User in storage");

  return JSON.parse(userInfo);
}

export async function updateUserInfo(id: string, data: any) {
  try {
    await SecureStore.setItemAsync("UserInfo", JSON.stringify(data));
  } catch (err) {
    throw new Error("Impossible de sauvegarder sur le téléphone");
  }
}
