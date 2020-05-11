import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.86.247:3000",
});

export async function getUserInfo(id: string): Promise<any> {
  const response = await http.get(`/user/${id}`);
  if (response.status !== 200)
    throw new Error("Could not get User Info on Server");
  return response.data;
}

export async function updateUserInfo(id: string, data: any) {
  const response = await http.post(`/user/${id}`, data);

  if (response.status !== 200)
    throw new Error(
      `Could not update User Info on Server : ${JSON.stringify(response)}`
    );
}
