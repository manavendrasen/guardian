import { StorageService } from "../common/services/StorageServices";
import { getAuthTokens } from "./cliService";

export const getUserProjectNames = async (mPass: string) => {
  const tokens = getAuthTokens();

  const ss = new StorageService(tokens);

  const projects = await ss.getAllProjects(mPass);

  return projects.map(p => p.name);
};

export const getConfigForProject = (projectId: string) => {
  return [
    "heroku (production)",
    "fix/metamask (development)",
    "fix/twitter-api (staging)",
  ];
};

export const getVarsForConfig = async (project: string, config: string) => {
  return {
    DICK: "SUCK",
    PRANAV: "HARSHITA",
  };
};
