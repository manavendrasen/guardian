import { Secret } from "types/Secret";
import API from "./api";

export async function getAllSecretForConfig(configId: string, config: any) {
  try {
    const res = await API.get(`/config/get-all-secrets/${configId}`, config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addSecret(
  configId: string,
  payload: Secret,
  config: any
) {
  try {
    const res = await API.post(
      `/secret/create-secret/${configId}`,
      payload,
      config
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
