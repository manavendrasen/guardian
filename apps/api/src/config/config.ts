type CONFIG_OBJECT = {
  ENV: string;
  PORT: number;
  HOST: string;
};

const DEVELOPMENT: CONFIG_OBJECT = {
  ENV: "DEVELOPMENT",
  HOST: "localhost",
  PORT: 5000,
};

const PRODUCTION: CONFIG_OBJECT = {
  ENV: "PRODUCTION",
  HOST: "",
  PORT: 5000,
};

const setConfig = (environment: string): CONFIG_OBJECT => {
  let obj;
  switch (environment) {
    case "DEVELOPMENT":
      obj = DEVELOPMENT;
      break;
    case "PRODUCTION":
      obj = PRODUCTION;
      break;
    default:
      obj = DEVELOPMENT;
      break;
  }
  return obj;
};

export default setConfig;
