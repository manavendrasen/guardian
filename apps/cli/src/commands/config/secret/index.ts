import { Command } from "@oclif/core";
import { Example } from "@oclif/core/lib/interfaces";
import { readFile } from "../../../services/initService";

export default class SecretCommand extends Command {
  static description = "List all secrets in a config";

  static examples = [
    `$ guardian config secret 
    List all secrets in the current config`,
  ];

  async run(): Promise<void> {
    const data = await readFile("guardian.json");
    const json = JSON.parse(data);
    return json.config;
  }
}
