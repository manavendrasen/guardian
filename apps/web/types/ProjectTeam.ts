import { Project } from "./Project";
import { User } from "./User";

export type ProjectTeam = {
  encProjectKey: string;
  memberId: string;
  member: User;
  projectId: string;
  project: Project;
};
