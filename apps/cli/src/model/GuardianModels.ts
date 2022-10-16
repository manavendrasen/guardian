import { string } from "@oclif/core/lib/parser";
import { LoginResult } from "../common/api/auth";

export type GuardianProjectConfig = {
  projectId: string;
  project: string;
  configId: string;
  config: string;
  ignoreKeys?: string[];
}

export type GuardianRootConfig = LoginResult
