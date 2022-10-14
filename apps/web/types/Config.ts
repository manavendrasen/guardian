import { Environment } from "constants/Environments";
import { ConfigTeam } from "./ConfigTeam";
import { Project } from "./Project";
import { Secret } from "./Secret";

export type Config = {
  id: string;
  environment: Environment;
  name: string;
  projectId: string;
  project: Project;
  secrets: Secret[];
  configMember: ConfigTeam[];
  createdAt: Date;
  updatedAt: Date;
};