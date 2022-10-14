import { Config } from "./Config";

export type Secret = {
  id: string;
  name: string;
  value: string;
  comment: string;
  configId: string;
  config: Config;
  createdAt: Date;
  updatedAt: Date;
};
