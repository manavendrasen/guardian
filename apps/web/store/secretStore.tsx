import { Secret } from "types/Secret";
import create from "zustand";
import * as REQUESTS from "requests/secretRequests";
import useAuthStore from "./authStore";
import useConfigStore from "./configStore";

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
    const user = useAuthStore.getState().user;
    const config = useConfigStore.getState().config;
    if (user) {
      await REQUESTS.addSecret(
        config!.id,
        {
          name: secret.name,
          value: secret.value,
          comment: secret.comment,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
    } else {
      console.error("User Not Found");
    }
  },
  getSecrets: async () => {
    const config = useConfigStore.getState().config;
    const user = useAuthStore.getState().user;
    if (user) {
      const res = await REQUESTS.getAllSecretForConfig(config!.id, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      console.log("getSecrets", res.secrets);
      get().setSecrets(res.secrets);
    } else {
      console.error("User Not Found");
    }
  },
}));

export default useSecretStore;
