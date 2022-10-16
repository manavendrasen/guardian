import { webcrypto } from "crypto";
import { createProject, getAllConfigs, getAllProjects, getSecretsForConfig, Secret } from "../api/project";
import { CryptoFunctions } from "../cryptoFunctions";
import { Utils } from "../utils";
import { AuthTokens } from "./AuthServices";
import { CryptoServices } from "./CryptoServices";
import { encode, decode } from "base64-arraybuffer";

export type CreateProjectMeta = {
  name: string;
  description: string;
  webhook: string;
};

export type EncryptedProject = {
  projectId: string;
  encryptedProjectKey: string;
  encryptedName: string;
  encryptedDescription: string;
  encryptedWebhook: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  encryptedProjectKey: string;
};

export type CreateConfigMeta = {
  name: string;
  description: string;
};

export interface Config {
  id: string;
  environment: string;
  name: string;
  configMember: Array<any>;
  encryptedConfigKey: string;
  _count?: {
    secrets: number;
  };
}


export class StorageService {
  private cs: CryptoServices;
  private cf: CryptoFunctions;
  private tokens: AuthTokens;

  constructor(tokens: AuthTokens) {
    this.cs = new CryptoServices(webcrypto);
    this.cf = new CryptoFunctions(webcrypto);
    this.tokens = tokens;
  }

  async createNewProject(
    projectMeta: CreateProjectMeta
  ): Promise<EncryptedProject> {
    const projectKeyStr = await this.cs.getProjectKey();

    const encryptedProjectKey = await this.cs.getEncryptedProjectKey(
      projectKeyStr,
      this.tokens.publicKey
    );

    const projectKeyBuf = decode(projectKeyStr);
    const nameBuf = Utils.fromStringToBuffer(projectMeta.name);
    const descriptionBuf = Utils.fromStringToBuffer(projectMeta.description);
    const webhookBuf = Utils.fromStringToBuffer(projectMeta.webhook);

    const encNameBuf = await this.cf.encrypt(nameBuf, projectKeyBuf, "AES-GCP");
    const encDescriptionBuf = await this.cf.encrypt(
      descriptionBuf,
      projectKeyBuf,
      "AES-GCP"
    );
    const encWebhookBuf = await this.cf.encrypt(
      webhookBuf,
      projectKeyBuf,
      "AES-GCP"
    );

    const encNameStr = encode(encNameBuf);
    const encDescriptionStr = encode(encDescriptionBuf);
    const encWebhookStr = encode(encWebhookBuf);

    const project = await createProject(
      encryptedProjectKey,
      encNameStr,
      encDescriptionStr,
      encWebhookStr,
      this.tokens.accessToken
    );

    return {
      projectId: project.id,
      encryptedProjectKey,
      encryptedName: project.name,
      encryptedDescription: project.description,
      encryptedWebhook: project.webhookUrl,
    };
  }

  async getAllProjects(masterPassword: string): Promise<Project[]> {
    const encryptedProjects = await getAllProjects(this.tokens.accessToken);

    const mKey = await this.cs.createMasterPasswordKey(
      this.tokens.email,
      masterPassword
    );

    const privateKey = await this.cs.getPrivateKey(
      this.tokens.encryptedPrivateKey,
      mKey
    );

    const k: Project[] = [];
    for (let i = 0; i < encryptedProjects.length; i++) {
      const encProj = encryptedProjects[i];
      const projectKey = await this.cs.decryptProjectKey(
        encProj.encProjectKey,
        privateKey
      );

      const nameBuf = decode(encProj.name);
      const descBuf = decode(encProj.description);
      const hookBuf = decode(encProj.webhookUrl);
      const projectKeyBuf = decode(projectKey);

      const decNameBuf = await this.cf.decrypt(
        nameBuf,
        projectKeyBuf,
        "AES-GCP"
      );
      const decDescBuf = await this.cf.decrypt(
        descBuf,
        projectKeyBuf,
        "AES-GCP"
      );
      const decHookBuf = await this.cf.decrypt(
        hookBuf,
        projectKeyBuf,
        "AES-GCP"
      );

      const name = Utils.fromBufferToString(decNameBuf);
      const desc = Utils.fromBufferToString(decDescBuf);
      const hook = Utils.fromBufferToString(decHookBuf);

      const res = {
        id: encProj.id,
        name,
        description: desc,
        webhookUrl: hook,
        encryptedProjectKey: encProj.encProjectKey,
      };

      k[i] = res;
    }

    return k;
  }

  async getAllConfigForProjectId(projectId: string, mPass: string): Promise<Config[]> {
    const mKey = await this.cs.createMasterPasswordKey(
      this.tokens.email,
      mPass
    );

    const pro = await getAllConfigs(projectId, this.tokens.accessToken);

    return await this.decryptConfigs(pro, mKey);
  }

  async getAllSecretsForConfigId(encConfigKey:string, configId: string, mPass: string): Promise<Secret[]> {
    const mKey = await this.cs.createMasterPasswordKey(
      this.tokens.email,
      mPass
    );

    const secrets = await getSecretsForConfig(configId, this.tokens.accessToken);

    return await this.decryptAllSecrets(encConfigKey, secrets, mKey);
  }


  async encryptSecret(
    encConfigKey: string,
    secret: Secret,
    mKey: string
  ): Promise<Secret> {
    const privateKey = await this.cs.getPrivateKey(
      this.tokens.encryptedPrivateKey,
      mKey
    );

    console.log("p", privateKey);

    const configKey = await this.cs.decryptConfigKey(encConfigKey, privateKey);
    const configKeyBuf = decode(configKey);

    const nameBuf = Utils.fromStringToBuffer(secret.name);
    const valueBuf = Utils.fromStringToBuffer(secret.value);
    const commentBuf = Utils.fromStringToBuffer(secret.comment);

    const names = await this.cf.encrypt(nameBuf, configKeyBuf, "AES-GCP");
    const value = await this.cf.encrypt(valueBuf, configKeyBuf, "AES-GCP");
    const comment = await this.cf.encrypt(commentBuf, configKeyBuf, "AES-GCP");

    const nameStr = encode(names);
    const valueStr = encode(value);
    const commentStr = encode(comment);

    return {
      ...secret,
      name: nameStr,
      value: valueStr,
      comment: commentStr,
    };
  }

  async decryptAllSecrets(
    encConfigKey: string,
    secrets: Array<Secret>,
    mKey: string
  ) {
    const privateKey = await this.cs.getPrivateKey(
      this.tokens.encryptedPrivateKey,
      mKey
    );

    const configKey = await this.cs.decryptConfigKey(encConfigKey, privateKey);
    const configKeyBuf = decode(configKey);
    let k = [];

    for (let i = 0; i < secrets.length; i++) {
      const s = secrets[i];
      const nameBuf = decode(s.name);
      const valueBuf = decode(s.value);
      const commentBuf = decode(s.comment);

      const name = await this.cf.decrypt(nameBuf, configKeyBuf, "AES-GCP");
      const value = await this.cf.decrypt(valueBuf, configKeyBuf, "AES-GCP");
      const comment = await this.cf.decrypt(
        commentBuf,
        configKeyBuf,
        "AES-GCP"
      );

      const nameStr = Utils.fromBufferToString(name);
      const valueStr = Utils.fromBufferToString(value);
      const commentStr = Utils.fromBufferToString(comment);

      k[i] = {
        name: nameStr,
        value: valueStr,
        comment: commentStr,
      };
    }

    return k;
  }

  async decryptConfigs(configs: Array<Config>, mKey: string) {
    const privateKey = await this.cs.getPrivateKey(
      this.tokens.encryptedPrivateKey,
      mKey
    );

    let k = [];
    for (let i = 0; i < configs.length; i++) {
      let c = configs[i];
      const configKey = await this.cs.decryptConfigKey(
        c.configMember[0].encConfigKey,
        privateKey
      );
      const configKeyBuf = decode(configKey);
      const nameBuf = decode(c.name);

      const name = await this.cf.decrypt(nameBuf, configKeyBuf, "AES-GCP");

      const nameStr = Utils.fromBufferToString(name);

      k[i] = {
        ...c,
        name: nameStr,
      };
    }

    return k;
  }
}
