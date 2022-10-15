import { Environment } from "constants/Environments";
import { ConfigTeam } from "./ConfigTeam";
import { Project } from "./Project";
import { Secret } from "./Secret";

export interface Config {
  id: string;
  environment: string;
  name: string;
  projectId: string;
  project: Project;
  secrets: Secret[];
  configMember: ConfigTeam[];
  createdAt: Date;
  updatedAt: Date;
};
