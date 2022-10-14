import { CryptoFunctions } from "../cryptoFunctions.js";
import { Utils } from "../utils.js";
import { AuthTokens } from "./AuthServices.js";
import { CryptoServices } from "./CryptoServices.js";

export type CreateProjectMeta = {
  name: string;
  description: string;
};

export type Project = {
  projectId: string;
  encryptedProjectKey: string;
};

export type CreateConfigMeta = {
  name: string;
  description: string;
};

class StorageService {
  private cs: CryptoServices;
  private cf: CryptoFunctions;
  private tokens: AuthTokens;

  constructor(crypto: Crypto, tokens: AuthTokens) {
    this.cs = new CryptoServices(crypto);
    this.cf = new CryptoFunctions(crypto);
    this.tokens = tokens;
  }

  async createNewProject(projectMeta: CreateProjectMeta): Promise<Project> {
    const projectKeyStr = await this.cs.getProjectKey();

    const encryptedProjectKey = await this.cs.getEncryptedProjectKey(
      projectKeyStr,
      this.tokens.publicKey
    );

    const projectKeyBuf = Utils.fromB64ToBuffer(projectKeyStr);
    const nameBuf = Utils.fromStringToBuffer(projectMeta.name);
    const descriptionBuf = Utils.fromStringToBuffer(projectMeta.description);

    const encNameBuf = await this.cf.encrypt(nameBuf, projectKeyBuf, "AES-GCP");
    const encDescriptionBuf = await this.cf.encrypt(
      descriptionBuf,
      projectKeyBuf,
      "AES-GCP"
    );

    // TODO send the project data to API

    return {
      projectId: "",
      encryptedProjectKey,
    };
  }
}
