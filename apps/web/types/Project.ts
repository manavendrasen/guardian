import { Configs } from "./Config";
import { ProjectTeam } from "./ProjectTeam";
import { User } from "./User";

export type Project = {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  ownerId: string;
  owner: User;
  configs: Configs[];
  teamMember: ProjectTeam[];
  createdAt: Date;
  updatedAt: Date;
};
