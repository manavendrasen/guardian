export interface Config {
  id: string;
  environment: string;
  name: string;
  encryptedConfigKey: string;
  _count?: {
    secrets: number;
  };
}
