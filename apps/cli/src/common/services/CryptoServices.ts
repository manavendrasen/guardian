import { webcrypto } from "crypto";
import { CryptoFunctions } from "../cryptoFunctions";
import { encode, decode } from "base64-arraybuffer";

export class CryptoServices {
  private cf: CryptoFunctions;

  constructor(crypto: webcrypto.Crypto) {
    this.cf = new CryptoFunctions(crypto);
  }

  async createMasterPasswordKey(
    email: string,
    masterPassword: string
  ): Promise<string> {
    const emailBuf = decode(email);
    const masterPasswordBuf = decode(masterPassword);

    const masterPasswordKeyBuf = await this.cf.pbkdf2Sha256(
      masterPasswordBuf,
      emailBuf,
      500
    );

    return encode(masterPasswordKeyBuf);
  }

  async createMasterPasswordHash(
    masterPasswordKey: string,
    password: string
  ): Promise<string> {
    const masterPasswordKeyBuf = decode(masterPasswordKey);
    const passwordBuf = decode(password);

    const masterPasswordHashBuf = await this.cf.pbkdf2Sha256(
      masterPasswordKeyBuf,
      passwordBuf,
      500
    );

    return encode(masterPasswordHashBuf);
  }

  async createEncryptedPrivateKey(
    privateKey: string,
    masterPasswordKey: string
  ): Promise<string> {
    const privateKeyBuf = decode(privateKey);
    const masterPasswordKeyBuf = decode(masterPasswordKey);

    const buf = await this.cf.encrypt(
      privateKeyBuf,
      masterPasswordKeyBuf,
      "AES-GCP"
    );

    return encode(buf);
  }

  async getPrivateKey(
    encryptedPrivateKey: string,
    masterPasswordKey: string
  ): Promise<string> {
    const encryptedPrivateKeyBuf = decode(encryptedPrivateKey);
    const masterPasswordKeyBuf = decode(masterPasswordKey);

    const buf = await this.cf.decrypt(
      encryptedPrivateKeyBuf,
      masterPasswordKeyBuf,
      "AES-GCP"
    );

    return encode(buf);
  }

  async getProjectKey(): Promise<string> {
    return encode(await this.cf.generateAESKey(128));
  }

  async getEncryptedProjectKey(
    projectKey: string,
    publicKey: string
  ): Promise<string> {
    const projectKeyBuf = decode(projectKey);
    const publicKeyBuf = decode(publicKey);

    const buf = await this.cf.encrypt(projectKeyBuf, publicKeyBuf, "RSA-OAEP");

    return encode(buf);
  }

  async getConfigKey(): Promise<string> {
    return encode(await this.cf.generateAESKey(128));
  }

  async decryptProjectKey(encProjectKey: string, privateKey: string) {
    const eProjKeyBuf = decode(encProjectKey);
    const privateKeyBuf = decode(privateKey);

    const buf = await this.cf.decrypt(eProjKeyBuf, privateKeyBuf, "RSA-OAEP");

    return encode(buf);
  }

  async getEncryptedConfigKey(
    configKey: string,
    publicKey: string
  ): Promise<string> {
    const configKeyBuf = decode(configKey);
    const publicKeyBuf = decode(publicKey);

    const buf = await this.cf.encrypt(configKeyBuf, publicKeyBuf, "RSA-OAEP");

    return encode(buf);
  }

  async decryptConfigKey(encConfigKey: string, privateKey: string) {
    const encConfigKeyBuf = decode(encConfigKey);
    const privateKeyBuf = decode(privateKey);

    const buf = await this.cf.decrypt(encConfigKeyBuf, privateKeyBuf, "RSA-OAEP");

    return encode(buf);
  }
}
