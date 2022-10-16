import { StorageService } from "../common/services/StorageServices";
import { getAuthTokens } from "./cliService";
import fuzzy from "fuzzy";

export const getUserProjectNames = async (mPass: string) => {
  const tokens = getAuthTokens();

  const ss = new StorageService(tokens);

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


export const getConfigForProject = async (projectId: string) => {
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
