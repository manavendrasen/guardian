import { createProject, getAllProjects } from "../api/project";
import { CryptoFunctions } from "../cryptoFunctions";
import { Utils } from "../utils";
import { AuthTokens } from "./AuthServices";
import { CryptoServices } from "./CryptoServices";

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

export class StorageService {
  private cs: CryptoServices;
  private cf: CryptoFunctions;
  private tokens: AuthTokens;

  constructor(tokens: AuthTokens) {
    this.cs = new CryptoServices(window.crypto);
    this.cf = new CryptoFunctions(window.crypto);
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

    const projectKeyBuf = Utils.fromB64ToBuffer(projectKeyStr);
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

    const encNameStr = Utils.fromBufferToB64(encNameBuf);
    const encDescriptionStr = Utils.fromBufferToB64(encDescriptionBuf);
    const encWebhookStr = Utils.fromBufferToB64(encWebhookBuf);

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

    console.log(privateKey);

    const k: Project[] = [];
    for (let i = 0; i < encryptedProjects.length; i++) {
      const encProj = encryptedProjects[i];
      // console.log(encProj);

      const nameBuf = Utils.fromB64ToBuffer(encProj.name);
      const descBuf = Utils.fromB64ToBuffer(encProj.description);
      const hookBuf = Utils.fromB64ToBuffer(encProj.webhookUrl);
      const privateKeyBuf = Utils.fromB64ToBuffer(privateKey);

      console.log(privateKey.length);
      const decNameBuf = await this.cf.decrypt(
        nameBuf,
        privateKeyBuf,
        "AES-GCP"
      );
      // console.log("description");
      const decDescBuf = await this.cf.decrypt(
        descBuf,
        privateKeyBuf,
        "AES-GCP"
      );
      // console.log("hook");
      const decHookBuf = await this.cf.decrypt(
        hookBuf,
        privateKeyBuf,
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
        encryptedProjectKey: encProj.encryptedProjectKey,
      };

      k[i] = res;
    }

    console.log(k);

    return k;
  }
}
