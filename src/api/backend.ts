import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.86.247:3000",
});

export async function getUserInfo(id: string): Promise<any> {
  const response = await http.get(`/user/${id}`);
  if (response.status !== 200)
    throw new Error("Could not get User Info on Server");
  return response;
}

export async function pushPurchases(id: string, purchases: any) {}

export async function updateUserInfo(id: string, updatedFields: any) {}
