import { webcrypto } from "crypto";
import { CryptoFunctions } from "../cryptoFunctions";
import { Utils } from "../utils";

export class CryptoServices {
  private cf: CryptoFunctions;

  constructor(crypto: webcrypto.Crypto) {
    this.cf = new CryptoFunctions(crypto);
  }

  async createMasterPasswordKey(
    email: string,
    masterPassword: string
  ): Promise<string> {
    const emailBuf = Utils.fromStringToBuffer(email);
    const masterPasswordBuf = Utils.fromStringToBuffer(masterPassword);

    const masterPasswordKeyBuf = await this.cf.pbkdf2Sha256(
      masterPasswordBuf,
      emailBuf,
      500
    );

    return Utils.fromBufferToB64(masterPasswordKeyBuf);
  }

  async createMasterPasswordHash(
    masterPasswordKey: string,
    password: string
  ): Promise<string> {
    const masterPasswordKeyBuf = Utils.fromB64ToBuffer(masterPasswordKey);
    const passwordBuf = Utils.fromStringToBuffer(password);

    const masterPasswordHashBuf = await this.cf.pbkdf2Sha256(
      masterPasswordKeyBuf,
      passwordBuf,
      500
    );

    return Utils.fromBufferToB64(masterPasswordHashBuf);
  }

  async createEncryptedPrivateKey(
    privateKey: string,
    masterPasswordKey: string
  ): Promise<string> {
    const privateKeyBuf = Utils.fromB64ToBuffer(privateKey);
    const masterPasswordKeyBuf = Utils.fromB64ToBuffer(masterPasswordKey);

    const buf = await this.cf.encrypt(
      privateKeyBuf,
      masterPasswordKeyBuf,
      "AES-GCP"
    );

    return Utils.fromBufferToB64(buf);
  }

  async getPrivateKey(
    encryptedPrivateKey: string,
    masterPasswordKey: string
  ): Promise<string> {
    const encryptedPrivateKeyBuf = Utils.fromB64ToBuffer(encryptedPrivateKey);
    const masterPasswordKeyBuf = Utils.fromB64ToBuffer(masterPasswordKey);

    const buf = await this.cf.decrypt(
      encryptedPrivateKeyBuf,
      masterPasswordKeyBuf,
      "AES-GCP"
    );

    return Utils.fromBufferToB64(buf);
  }

  async getProjectKey(): Promise<string> {
    return Utils.fromBufferToB64(await this.cf.generateAESKey(128));
  }

  async getEncryptedProjectKey(
    projectKey: string,
    publicKey: string
  ): Promise<string> {
    const projectKeyBuf = Utils.fromStringToBuffer(projectKey);
    const publicKeyBuf = Utils.fromB64ToBuffer(publicKey);

    const buf = await this.cf.encrypt(projectKeyBuf, publicKeyBuf, "RSA-OAEP");

    return Utils.fromBufferToB64(buf);
  }

  async getConfigKey(): Promise<string> {
    return Utils.fromBufferToB64(await this.cf.generateAESKey(128));
  }

  async getEncryptedConfigKey(
    configKey: string,
    publicKey: string
  ): Promise<string> {
    const configKeyBuf = Utils.fromStringToBuffer(configKey);
    const publicKeyBuf = Utils.fromB64ToBuffer(publicKey);

    const buf = await this.cf.encrypt(configKeyBuf, publicKeyBuf, "RSA-OAEP");

    return Utils.fromBufferToB64(buf);
  }
}
