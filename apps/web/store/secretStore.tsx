import { Secret } from "types/Secret";
import create from "zustand";
import * as REQUESTS from "requests/secretRequests";
import useAuthStore from "./authStore";
import useConfigStore from "./configStore";
import { StorageService } from "common/services/StorageServices";

type TSecret = {
  secret: Secret | null;
  setSecret: (secret: Secret) => void;
  secrets: Secret[];
  setSecrets: (secrets: Secret[]) => void;
  addSecret: (secret: Secret) => void;
  getSecrets: () => void;
};

const useSecretStore = create<TSecret>((set, get) => ({
  secret: {
    name: "DB_URL",
    value: "dfasdfasdfasaf",
    comment: "",
  },
  setSecret: (secret: Secret) => {
    set((state: TSecret) => ({ ...state, secret: secret }));
  },
  secrets: [],
  setSecrets: (secrets: Secret[]) => {
    set((state: TSecret) => ({ ...state, secrets: secrets }));
  },
  addSecret: async (secret: Secret) => {
    const { user, masterPasswordKey } = useAuthStore.getState();
    const config = useConfigStore.getState().config;

    console.log(config);

    if (user && config && masterPasswordKey) {
      const ss = new StorageService(user);
      const res = await ss.encryptSecret(
        config.configMember[0].encConfigKey,
        secret,
        masterPasswordKey
      );

      console.log("ADD SEX", res);

      await REQUESTS.addSecret(config!.id, res, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
    } else {
      console.error("User Not Found");
    }
  },
  getSecrets: async () => {
    const config = useConfigStore.getState().config;
    const { user, masterPasswordKey } = useAuthStore.getState();
    if (user && config && masterPasswordKey) {
      const res = await REQUESTS.getAllSecretForConfig(config!.id, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      console.log("getSecrets", res.secrets);

      const sc = new StorageService(user);
      const decryptedSecret = await sc.decryptAllSecrets(
        config.configMember[0].encConfigKey,
        res.secrets,
        masterPasswordKey
      );

      get().setSecrets(decryptedSecret);
    } else {
      console.error("User Not Found");
    }
  },
}));

export default useSecretStore;
