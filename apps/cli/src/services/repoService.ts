import { Project, StorageService } from "../common/services/StorageServices";
import { getAuthTokens } from "./cliService";
import fuzzy from "fuzzy";

const tokens = getAuthTokens();
const ss = new StorageService(tokens);

export const getProjectByName = async (name: string, mPass: string) => {
  const projects = await ss.getAllProjects(mPass);

  return projects.find(p => p.name == name);
}

export const getConfigByName = async (projecId: string, name: string) => {
  const cName = name.split(" ");
  const configs = await ss.getAllConfigForProjectId(projecId);

  return configs.find(c => c.name == cName[0]);
}

export const getUserProjectNames = async (mPass: string) => {
  const projects = await ss.getAllProjects(mPass);

  return projects.map(p => p.name);
};

export const search = async (
  arr: Promise<string[]>,
  query: string
): Promise<string[]> => {
  const rarr = await arr;
  if (query == undefined) return rarr;
  return fuzzy.filter(query, rarr).map((el) => el.string);
};


export const getConfigForProject = async (projectName: string, mPass: string) => {
  const pr = await getProjectByName(projectName, mPass);

  const config = await ss.getAllConfigForProjectId(pr!.id);

  return config.map(c => {
    return `${c.name} (${c.environment.toLowerCase()})`
  })
};

export const getVarsForConfig = async (configId: string) => {
  const secrets = await ss.getAllSecretsForConfigId(configId);

  const vars: any = {};
  secrets.forEach(secret => {
    vars[secret.name] = secret.value
  });
  return vars;
};
