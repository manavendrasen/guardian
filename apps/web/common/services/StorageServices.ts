import { createProject, getAllProjects } from "../api/project";
import { createConfig } from "../api/config";
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
  environment: string;
};

export type EncryptedConfig = {
  configId: string;
  encryptedEnvironment: string;
  encryptedName: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
};

export type Secret = {
  name: string;
  value: string;
  comment: string;
};

export class StorageService {
  private cs: CryptoServices;
  private cf: CryptoFunctions;
  private tokens: AuthTokens;

  constructor(tokens: AuthTokens) {
    this.cs = new CryptoServices(window.crypto);
    this.cf = new CryptoFunctions(window.crypto);
    this.tokens = tokens;
  }

  // enc = new TextEncoder();
  // dec = new TextDecoder("utf8");

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
    // const encNameStr = this.dec.decode(encNameBuf);
    // const encDescriptionStr = decode(this.dec.decode(encDescriptionBuf));
    // const encWebhookStr = decode(this.dec.decode(encWebhookBuf));

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

  async getAllProjects(mKey: string): Promise<Project[]> {
    const encryptedProjects = await getAllProjects(this.tokens.accessToken);

    // console.log(encryptedProjects);

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
      // console.log("description");
      const decDescBuf = await this.cf.decrypt(
        descBuf,
        projectKeyBuf,
        "AES-GCP"
      );
      // console.log("hook");
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

    console.log(k);

    return k;
  }

  async createNewConfig(
    configMeta: CreateConfigMeta
  ): Promise<EncryptedConfig> {
    const configKey = await this.cs.getConfigKey();

    const encryptedConfigKey = await this.cs.getEncryptedConfigKey(
      configKey,
      this.tokens.publicKey
    );
    const configKeyBuf = decode(configKey);
    // const environmentBuf = Utils.fromStringToBuffer(configMeta.environment);
    const nameBuf = Utils.fromStringToBuffer(configMeta.name);

    const encNameBuf = await this.cf.encrypt(nameBuf, configKeyBuf, "AES-GCP");

    // const encEnvironmentBuf = await this.cf.encrypt(
    //   environmentBuf,
    //   configKeyBuf,
    //   "AES-GCP"
    // );

    const encNameStr = encode(encNameBuf);
    // const encEnvironmentStr = encode(encEnvironmentBuf);

    const config = await createConfig(
      encNameStr,
      configMeta.environment,
      encryptedConfigKey,
      this.tokens.accessToken
    );

    return {
      configId: config.id,
      encryptedName: config.name,
      encryptedEnvironment: config.environment,
      projectId: config.projectId,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt,
    };
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
}
