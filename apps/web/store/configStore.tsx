import create from "zustand";
import {
  DEVELOPMENT,
  Environment,
  PRODUCTION,
  STAGING,
} from "constants/Environments";
import * as REQUESTS from "requests/configRequests";
import { Config } from "types/Config";
import useProjectStore from "./projectStore";
import useAuthStore from "./authStore";
import { CryptoServices } from "common/services/CryptoServices";
import { StorageService } from "common/services/StorageServices";

// interface ICreateConfigPayload {
//   name: string;
//   description: string;
//   environment: Environment;
// }

type TConfig = { 
  loading: boolean;
  setLoading: (loading: boolean) => void;
  config: Config | null;
  developmentConfigs: Config[];
  stagingConfigs: Config[];
  productionConfig: Config[];
  setDevelopmentConfigs: (configs: Config[]) => void;
  setStagingConfigs: (configs: Config[]) => void;
  setProductionConfigs: (configs: Config[]) => void;
  setConfig: (config: Config) => void;
  addConfig: (
    payload: any,
    callback: (msg: string) => void
  ) => void;
  getAllConfigsForProject: (projectId: string) => void;
};

const useConfigStore = create<TConfig>((set, get) => ({
  config: null,
  loading: false,
  developmentConfigs: [],
  productionConfig: [],
  stagingConfigs: [],
  setConfig: (config: Config) => {
    set((state: TConfig) => ({ ...state, config: config }));
  },
  setStagingConfigs: (stagingConfigs: Config[]) => {
    set((state: TConfig) => ({ ...state, stagingConfigs: stagingConfigs }));
  },
  setDevelopmentConfigs: (developmentConfigs: Config[]) => {
    set((state: TConfig) => ({
      ...state,
      developmentConfigs: developmentConfigs,
    }));
  },
  setProductionConfigs: (productionConfig: Config[]) => {
    set((state: TConfig) => ({ ...state, productionConfig: productionConfig }));
  },
  setLoading: (loading) => {
    set((state: TConfig) => ({ ...state, loading: loading }));
  },
  addConfig: async (payload, callback) => {
    const { user } = useAuthStore.getState();
    const publicKey = user?.publicKey;
    const projectId = useProjectStore.getState().project?.id;
    if (projectId && user && publicKey) {
      const ss = new StorageService(user);
      ss.createNewConfig(payload);
    } else {
      console.error("Project ID Not Set");
    }
  },
  getAllConfigsForProject: async (projectId: string) => {
    const { user } = useAuthStore.getState();
    const res = await REQUESTS.getAllConfigForProject(projectId, {
      headers: { Authorization: `Bearer ${user!.accessToken}` },
    });

    const fetchedConfigs = res.getConfigs;

    const fetchedDevelopmentConfigs = fetchedConfigs.filter(
      (el: Config) => el.environment === DEVELOPMENT
    );
    const fetchedProductionConfig = fetchedConfigs.filter(
      (el: Config) => el.environment === PRODUCTION
    );
    const fetchedStagingConfigs = fetchedConfigs.filter(
      (el: Config) => el.environment === STAGING
    );

    get().setDevelopmentConfigs(fetchedDevelopmentConfigs);
    get().setStagingConfigs(fetchedStagingConfigs);
    get().setProductionConfigs(fetchedProductionConfig);
    console.log("getAllConfigsForProject", res);
  },
}));

export default useConfigStore;