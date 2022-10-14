import { Project } from "./Project";
import { User } from "./User";

export interface ProjectTeam {
  encProjectKey: string;
  memberId: string;
  member: User;
  projectId: string;
  project: Project;
};
