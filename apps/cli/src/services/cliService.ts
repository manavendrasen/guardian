import { readFileSync } from "fs";
import { homedir } from "os";
import path from "path";
import { AuthTokens } from "../common/services/AuthServices";

export const getAuthTokens = () => {
  const tokens: AuthTokens = JSON.parse(
    readFileSync(path.join(homedir(), ".guardian.json"), "utf-8")
  ) as AuthTokens;

  return tokens;
};
