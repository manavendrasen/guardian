import { Config } from "./Config";
import { User } from "./User";

export type ConfigTeam = {
  encConfigKey: string;
  memberId: string;
  member: User;
  configId: string;
  config: Config;
};
