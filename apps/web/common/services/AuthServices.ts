import { CryptoFunctions } from "../cryptoFunctions";
import { Utils } from "../utils";
import { CryptoServices } from "./CryptoServices";
import { loginUser, SignUpResult, signUpUser } from "../api/auth";
import { encode, decode } from "base64-arraybuffer";

export type AuthTokens = {
  email: string;
  accessToken: string;
  publicKey: string;
  masterKeyHash: string;
  encryptedPrivateKey: string;
};

type LoginResult = {
  success: boolean;
  tokens?: AuthTokens;
};

export class AuthServices {
  public cs: CryptoServices;
  private cf: CryptoFunctions;

  constructor() {
    this.cs = new CryptoServices(window.crypto);
    this.cf = new CryptoFunctions(window.crypto);
  }

  async signUp(email: string, password: string): Promise<SignUpResult> {
    const rsaKeys = await this.cf.generateRSAKeyPair();
    const publicKey = encode(rsaKeys[0]);
    const privateKey = encode(rsaKeys[1]);

    const mKey = await this.cs.createMasterPasswordKey(email, password);
    const mHash = await this.cs.createMasterPasswordHash(mKey, password);
    const ePrivateKey = await this.cs.createEncryptedPrivateKey(
      privateKey,
      mKey
    );

    return await signUpUser(email, publicKey, mHash, ePrivateKey);
  }

  async login(email: string, password: string): Promise<LoginResult> {
    try {
      // TODO replace with hash
      const mKey = await this.cs.createMasterPasswordKey(email, password);
      const mHash = await this.cs.createMasterPasswordHash(mKey, password);

      const loginResult = await loginUser(email, mHash);

      return {
        success: true,
        tokens: {
          email: email,
          accessToken: loginResult.token,
          encryptedPrivateKey: loginResult.encPrivateKey,
          masterKeyHash: password,
          publicKey: loginResult.publicKey,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  }
}
