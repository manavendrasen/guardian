export const getUserProjects = () => {
  return ["Poptalk", "guardian", "health-chain"];
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
