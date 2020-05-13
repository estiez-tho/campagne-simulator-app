import axios from "axios";
import * as SecureStore from "expo-secure-store";
const http = axios.create({
  baseURL: "http://192.168.86.247:3000",
});

async function setToken() {
  if (http.defaults.headers.post["Authorization"]) return;
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("could not find token");
  http.defaults.headers.post["Authorization"] = `Bearer ${token}`;
}

export async function getUserInfo(id: string): Promise<any> {
  await setToken();
  alert(JSON.stringify(http.defaults.headers));
  const response = await http.get(`/user/${id}`);
  if (response.status !== 200)
    throw new Error("Could not get User Info on Server");
  return response.data;
}

export async function updateUserInfo(id: string, data: any) {
  await setToken();
  alert(JSON.stringify(http.defaults.headers));
  const response = await http.post(`/user/${id}`, data);

  if (response.status !== 200)
    throw new Error(
      `Could not update User Info on Server : ${JSON.stringify(response)}`
    );
}

export async function createUser(email: string, username: string) {
  try {
    await http.post("/user/create", {
      email,
      username,
    });
    return { email };
  } catch (err) {
    throw new Error("could not create user");
  }
}

export async function verifyUser(email: string, verificationCode: string) {
  try {
    const response = await http.post("/user/verify", {
      email,
      verificationCode,
    });
    const { user, token } = response.data;
    return { user, token };
  } catch (err) {
    alert(JSON.stringify(err));
    throw new Error("could not create user");
  }
}
