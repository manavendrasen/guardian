import { CryptoFunctions } from "../cryptoFunctions.js";
import { Utils } from "../utils.js";
import { CryptoServices } from "./CryptoServices.js";

export type AuthTokens = {
  email: string;
  accessToken: string;
  publicKey: string;
  masterKeyHash: string;
  encryptedPrivateKey: string;
};

type SignUpResult = {
  success: boolean;
  tokens?: AuthTokens;
};

type LoginResult = {
  success: boolean;
  tokens?: AuthTokens;
};

export class AuthServices {
  private cs: CryptoServices;
  private cf: CryptoFunctions;

  constructor(crypto: Crypto) {
    this.cs = new CryptoServices(crypto);
    this.cf = new CryptoFunctions(crypto);
  }

  async signUp(email: string, password: string): Promise<SignUpResult> {
    const rsaKeys = await this.cf.generateRSAKeyPair();
    const publicKey = Utils.fromBufferToB64(rsaKeys[0]);
    const privateKey = Utils.fromBufferToB64(rsaKeys[1]);

    const mKey = await this.cs.createMasterPasswordKey(email, password);
    const mHash = await this.cs.createMasterPasswordHash(mKey, password);
    const ePrivateKey = await this.cs.createEncryptedPrivateKey(
      privateKey,
      mKey
    );

    return {
      success: true,
      tokens: {
        email,
        accessToken: "",
        publicKey,
        masterKeyHash: mHash,
        encryptedPrivateKey: ePrivateKey,
      },
    };
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const mKey = await this.cs.createMasterPasswordKey(email, password);
    const mHash = await this.cs.createMasterPasswordHash(mKey, password);

    // TODO check if mhash is same

    // fetch access token
    const accessToken = "";
    const publicKey = "";
    const encryptedPrivateKey = "";

    return {
      success: true,
      tokens: {
        email: email,
        accessToken: accessToken,
        encryptedPrivateKey: encryptedPrivateKey,
        masterKeyHash: mHash,
        publicKey: publicKey,
      },
    };
  }
}
