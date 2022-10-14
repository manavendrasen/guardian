import { Config } from "./Config";
import { User } from "./User";

export interface ConfigTeam {
  encConfigKey: string;
  memberId: string;
  member: User;
  configId: string;
  config: Config;
};
