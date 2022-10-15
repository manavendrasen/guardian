import { Secret } from "types/Secret";
import create from "zustand";

type TSecret = {
  secret: Secret | null;
  setSecret: (secret: Secret) => void;
  secrets: Secret[];
  setSecrets: (secrets: Secret[]) => void;
};

const useSecretStore = create<TSecret>((set) => ({
  secret: {
    name: "DB_URL",
    value: "dfasdfasdfasaf",
    comment: "",
  },
  setSecret: (secret: Secret) => {
    set((state: TSecret) => ({ ...state, secret: secret }));
  },
  secrets: [
    {
      name: "DB_URL",
      value: "dfasdfasdfasaf",
      comment: "",
    },
    {
      name: "ACCESS_TOKEN_SECRET",
      value: "dfasdfasdfasaf",
      comment: "",
    },
    {
      name: "EXTERNAL_API_KEY",
      value: "dfasdfasdfasaf",
      comment: "using external api key",
    },
  ],
  setSecrets: (secrets: Secret[]) => {
    set((state: TSecret) => ({ ...state, secrets: secrets }));
  },
}));

export default useSecretStore;
