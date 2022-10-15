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

interface ICreateConfigPayload {
  name: string;
  description: string;
  environment: Environment;
}

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
  addConfig: (payload: ICreateConfigPayload) => void;
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
  addConfig: async (payload) => {
    const projectId = useProjectStore.getState().project?.id;
    if (projectId) {
      await REQUESTS.addConfig(projectId, {
        name: payload.name,
        description: payload.description,
        environment: Environment[payload.environment],
        // encConfigKey: TODO encConfigKey,
      });
    } else {
      console.error("Project ID Not Set");
    }
  },
  getAllConfigsForProject: async (projectId: string) => {
    const res = await REQUESTS.getAllConfigForProject(projectId);
    const fetchedDevelopmentConfigs = res.filter(
      (el: Config) => el.environment === DEVELOPMENT
    );
    const fetchedProductionConfig = res.filter(
      (el: Config) => el.environment === PRODUCTION
    );
    const fetchedStagingConfigs = res.filter(
      (el: Config) => el.environment === STAGING
    );

    get().setDevelopmentConfigs(fetchedDevelopmentConfigs);
    get().setStagingConfigs(fetchedStagingConfigs);
    get().setProductionConfigs(fetchedProductionConfig);
    console.log("getAllConfigsForProject", res);
  },
}));

export default useConfigStore;
