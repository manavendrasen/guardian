import axios from "axios";

export type LoginResult = {
  id: string;
  token: string;
  email: string;
  publicKey: string;
  encPrivateKey: string;
};

export const loginUser = async (
  email: string,
  mPass: string
): Promise<LoginResult> => {
  const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
    email: email,
    masterKeyHash: mPass,
  });

  return res.data as LoginResult;
};
