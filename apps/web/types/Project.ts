import { Config } from "./Config";
import { ProjectTeam } from "./ProjectTeam";
import { User } from "./User";

export type Project = {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  ownerId: string;
  owner: User;
  configs: Config[];
  teamMember: ProjectTeam[];
  createdAt: Date;
  updatedAt: Date;
};
