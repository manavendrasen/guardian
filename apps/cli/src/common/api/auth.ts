import axios from "axios";

export type LoginResult = {
  id: string;
  token: string;
  email: string;
  publicKey: string;
  encPrivateKey: string;
};

export type SignUpResult = {
  id: string;
  email: string;
  masterKeyHash: string;
  publicKey: string;
  encPrivateKey: string;
};

export const signUpUser = async (
  email: string,
  publicKey: string,
  masterKeyHash: string,
  encPrivateKey: string
): Promise<SignUpResult> => {
  const res = await axios.post("http://localhost:5000/api/v1/auth/signup", {
    email: email,
    publicKey: publicKey,
    masterKeyHash: masterKeyHash,
    encPrivateKey: encPrivateKey,
  });

  return res.data as SignUpResult;
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
