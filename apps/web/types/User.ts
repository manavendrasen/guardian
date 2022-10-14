import { ConfigTeam } from "./ConfigTeam";
import { Project } from "./Project";
import { ProjectTeam } from "./ProjectTeam";

export interface User {
  id: string;
  email: string;
  password: string;
  publicKey: string;
  encPrivateKey: string;
  myProject: Project[];
  projectShared: ProjectTeam[];
  configShared: ConfigTeam[];
};
