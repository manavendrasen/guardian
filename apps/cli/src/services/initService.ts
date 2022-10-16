import * as fs from "fs";

export const createFile = (filePath: string, content: string) => {
  fs.writeFileSync(filePath, content);
};

export const readFile = async (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

export const writeIntoFile = async (filePath: string, content: string) => {
  const file = fs.readFileSync(filePath, "utf8");
  const { project, config } = JSON.parse(file);
  // config.push(content);
  const obj = {
    project: project,
    config: [...config, content],
  };
  fs.writeFile(filePath, JSON.stringify(obj, null, 4), () => {
  });
  // fs.appendFileSync(filePath, config);
};
