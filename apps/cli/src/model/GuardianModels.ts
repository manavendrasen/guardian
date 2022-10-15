import { LoginResult } from "../common/api/auth";

export type GuardianProjectConfig = {
  project: string;
  config: string;
  ignoreKeys?: string[];
}

export type GuardianRootConfig = LoginResult
