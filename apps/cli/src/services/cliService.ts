import { readFileSync } from "fs";
import { homedir } from "os";
import path from "path";
import { AuthTokens } from "../common/services/AuthServices";
import { GuardianProjectConfig } from "../model/GuardianModels";

export const getAuthTokens = () => {
  const tokens: AuthTokens = JSON.parse(
    readFileSync(path.join(homedir(), ".guardian.json"), "utf-8")
  ) as AuthTokens;

  return tokens;
};

export const getProjectConfig = () => {
  const projectConfig: GuardianProjectConfig = JSON.parse(
    readFileSync("guardian.json", "utf-8")) as GuardianProjectConfig;

  return projectConfig;
};
