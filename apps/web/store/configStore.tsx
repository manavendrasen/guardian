import { Config } from "types/Config";
import create from "zustand";

type TConfig = {
  config: Config | null;
  setConfig: (config: Config) => void;
};

const useConfigStore = create<TConfig>((set) => ({
  config: null,
  setConfig: (config: Config) => {
    set((state: TConfig) => ({ ...state, config: config }));
  },
}));

export default useConfigStore;
