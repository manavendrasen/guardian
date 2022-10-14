import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";

type TokenUser = {
  id: string;
  email: string;
};

export const createJwtForUser = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: "2h",
    }
  );
};

export const verifyToken = (token: string): TokenUser | null => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
    const decodedData: any = jwt.decode(token);
    return {
      email: decodedData.email,
      id: decodedData.id,
    };
  } catch (e: any) {
    return null;
  }
};
