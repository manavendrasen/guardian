export interface Config {
  id: string;
  environment: string;
  name: string;
  encryptedConfigKey: string;
  configMember: any;
  _count?: {
    secrets: number;
  };
}
