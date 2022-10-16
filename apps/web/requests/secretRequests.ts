import API from "./api";

export async function getAllSecretForConfig(data: any) {
  try {
    const res = await API.post(`/config/config-secrets-name`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
