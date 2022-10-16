import { webcrypto } from "crypto";

export class CryptoFunctions {
  public crypto: webcrypto.Crypto;
  private subtle: webcrypto.SubtleCrypto;

  constructor(crypto: webcrypto.Crypto) {
    if (crypto !== undefined) {
      this.crypto = crypto;
      this.subtle = crypto.subtle;
    }
  }

  async pbkdf2Sha256(
    data: ArrayBuffer,
    salt: ArrayBuffer,
    iterations: number
  ): Promise<ArrayBuffer> {
    const pbkdf2Params: webcrypto.Pbkdf2Params = {
      name: "PBKDF2",
      salt: salt,
      iterations: iterations,
      hash: "SHA-256",
    };

    const key = await this.subtle.importKey("raw", data, "PBKDF2", false, [
      "deriveBits",
    ]);

    return await this.subtle.deriveBits(pbkdf2Params, key, 256);
  }

  async generateAESKey(length: number): Promise<ArrayBuffer> {
    const params: webcrypto.AesKeyGenParams = {
      name: "AES-GCM",
      length: length,
    };
    const aesKey = await this.subtle.generateKey(params, true, [
      "encrypt",
      "decrypt",
    ]);

    return await this.subtle.exportKey("raw", aesKey);
  }

  async generateRSAKeyPair(): Promise<ArrayBuffer[]> {
    const params = {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      extractable: false,
      hash: {
        name: "SHA-256",
      },
    };

    const rsaKey = await this.subtle.generateKey(params, true, [
      "encrypt",
      "decrypt",
    ]);

    const publicKeyBuf = await this.subtle.exportKey("spki", rsaKey.publicKey);
    const privateKeyBuf = await this.subtle.exportKey(
      "pkcs8",
      rsaKey.privateKey
    );

    return [publicKeyBuf, privateKeyBuf];
  }

  async encrypt(
    data: ArrayBuffer,
    key: ArrayBuffer,
    algo: "AES-GCP" | "RSA-OAEP",
    iv?: ArrayBuffer
  ): Promise<ArrayBuffer> {
    if (algo == "AES-GCP")
      return this.aesGcpEncrypt(data, key, iv || new ArrayBuffer(12));
    else return this.rsaOaepEncrypt(data, key);
  }

  private async aesGcpEncrypt(
    data: ArrayBuffer,
    key: ArrayBuffer,
    iv: ArrayBuffer
  ): Promise<ArrayBuffer> {
    const aesKey = await this.subtle.importKey(
      "raw",
      key,
      {
        name: "AES-GCM",
      },
      false,
      ["encrypt"]
    );

    const params: webcrypto.AesGcmParams = {
      name: "AES-GCM",
      iv: iv,
    };

    return await this.subtle.encrypt(params, aesKey, data);
  }

  private async rsaOaepEncrypt(data: ArrayBuffer, publicKey: ArrayBuffer) {
    const rsaParams: webcrypto.RsaHashedImportParams = {
      name: "RSA-OAEP",
      hash: "SHA-256",
    };

    const pubKey = await this.subtle.importKey(
      "spki",
      publicKey,
      rsaParams,
      false,
      ["encrypt"]
    );

    return await this.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      pubKey,
      data
    );
  }

  async decrypt(
    data: ArrayBuffer,
    key: ArrayBuffer,
    algo: "AES-GCP" | "RSA-OAEP",
    iv?: ArrayBuffer
  ): Promise<ArrayBuffer> {
    if (algo == "AES-GCP")
      return this.aesGcpDecrypt(data, key, iv || new ArrayBuffer(12));
    else return this.rsaOaepDecrypt(data, key);
  }

  private async aesGcpDecrypt(
    data: ArrayBuffer,
    key: ArrayBuffer,
    iv: ArrayBuffer
  ): Promise<ArrayBuffer> {
    const aesKey = await this.subtle.importKey(
      "raw",
      key,
      {
        name: "AES-GCM",
      },
      false,
      ["decrypt"]
    );

    const params: webcrypto.AesGcmParams = {
      name: "AES-GCM",
      iv: iv,
    };

    return await this.subtle.decrypt(params, aesKey, data);
  }

  private async rsaOaepDecrypt(data: ArrayBuffer, privateKey: ArrayBuffer) {
    const rsaParams: webcrypto.RsaHashedImportParams = {
      name: "RSA-OAEP",
      hash: "SHA-256",
    };

    const prKey = await this.subtle.importKey(
      "pkcs8",
      privateKey,
      rsaParams,
      false,
      ["decrypt"]
    );

    return await this.subtle.decrypt(rsaParams, prKey, data);
  }
}
