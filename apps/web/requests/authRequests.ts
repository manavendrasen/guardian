import API from "./api";

export async function register(data: any) {
  try {
    const res = await API.post(`/auth/signup`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(data: any) {
  try {
    const res = await API.post(`/auth/login`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPublicKeyForUser(email: string, config: any) {
  try {
    const res = await API.post(
      `/user/get-public-key`,
      {
        email,
      },
      config
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}