import { Command } from "@oclif/core";
import { Example } from "@oclif/core/lib/interfaces";
import { readFile } from "../../../../services/initService";

export default class GetCommand extends Command {
  static description = "Gets the secrets of the given config";

  static examples = [
    `$ guardian config secret get
    Gets the secrets of the specific secret`,
  ];

  async run(): Promise<void> {
    const data = await readFile("guardian.json");
  }
}
