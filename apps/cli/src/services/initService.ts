import * as fs from "fs";
import fuzzy from "fuzzy";
import path from "path";

export const createFile = (filePath: string, content: string) => {
  fs.writeFile(filePath, content, () => {
    console.log("write");
  });
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
    console.log("write");
  });
  // fs.appendFileSync(filePath, config);
};

export const search = async (
  arr: string[],
  query: string
): Promise<string[]> => {
  if (query == undefined) return arr;
  return fuzzy.filter(query, arr).map((el) => el.string);
};
