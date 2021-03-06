import axios from "axios";
import * as SecureStore from "expo-secure-store";
const http = axios.create({
  baseURL: "https://campagne-simulator.herokuapp.com",
});

async function setToken() {
  if (
    http.defaults.headers.post["Authorization"] &&
    http.defaults.headers.delete["Authorization"] &&
    http.defaults.headers.get["Authorization"]
  )
    return;
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("could not find token");
  http.defaults.headers.post["Authorization"] = `Bearer ${token}`;
  http.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
  http.defaults.headers.get["Authorization"] = `Bearer ${token}`;
}

async function disableCache() {
  await http.interceptors.request.use((config) => {
    config.headers["get"]["Cache-Control"] = "no-cache";
    return config;
  });
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
    username = username.replace(" ", "");

    if (!username.match(/^[a-z0-9]+$/i))
      throw new Error(
        "Le username ne doit contenir que des lettres ou des chiffres"
      );

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

export async function deleteUser(userId: string) {
  try {
    await setToken();
    const response = await http.delete(`/user/${userId}`);
    if (response.status !== 200) throw new Error("Deletion failed");
  } catch (err) {
    throw new Error("Une erreur est survenue");
  }
}

export async function getTime() {
  try {
    await disableCache();
    await setToken();
    const response = await http.get("/time");
    return response.data;
  } catch {}
}
