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
  try {
    await setToken();
    const response = await http.get(`/user/${id}`);
    if (response.status !== 200) throw new Error("Connection invalide");
    return response.data;
  } catch {
    throw new Error("Connection au serveur impossible");
  }
}

export async function updateUserInfo(id: string, data: any) {
  await setToken();

  const response = await http.post(`/user/${id}`, data);

  if (response.status !== 200)
    throw new Error(
      `Could not update User Info on Server : ${JSON.stringify(response)}`
    );
}

export async function createUser(email: string, username: string) {
  try {
    email = email.replace(" ", "").toLowerCase();
    if (
      email !== "thomas.estiez@gmail.com" &&
      !email.endsWith("@etu.univ-lorraine.fr")
    )
      throw new Error(
        "Connectez vous avec l'addresse email de l'école (@etu.univ-lorraine.fr)"
      );
    if (username.length < 4)
      throw new Error("Username doit faire 4 caractères minimum");
    const response = await http
      .post("/user/create", {
        email,
        username,
      })
      .catch((err) => {
        throw new Error("Nom d'utilisateur deja pris");
      });
    return { email };
  } catch (err) {
    throw err;
  }
}

export async function verifyUser(email: string, verificationCode: string) {
  try {
    if (verificationCode.length !== 5)
      throw new Error("Le code de vérification doit faire 5 caractères");
    const response = await http.post("/user/verify", {
      email,
      verificationCode,
    });
    if (response.status !== 200) throw new Error("Code invalide");
    const { user, token } = response.data;
    return { user, token };
  } catch (err) {
    throw new Error("Connection au serveur impossible");
  }
}
