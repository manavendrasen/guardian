import API from "./api";

export async function getAllSecretForConfig(config: any) {
  try {
    const res = await API.get(`/config/get-all-secrets`, config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
