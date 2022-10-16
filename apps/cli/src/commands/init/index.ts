import { Command, Flags } from "@oclif/core";
import { createFile } from "../../services/initService";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import {
  getConfigForProject,
  getUserProjectNames,
  search,
} from "../../services/repoService";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { GuardianProjectConfig } from "../../model/GuardianModels";
import { getAuthTokens } from "../../services/cliService";
import { StorageService } from "../../common/services/StorageServices";

const qs: QuestionCollection<Answers> = [
  {
    type: "password",
    name: "masterPassword",
    message: "Enter Master Password:",
  },
  {
    type: "autocomplete",
    name: "projectName",
    message:
      "Select project (list only shows projects you have access to):",
    source: (ans: Answers, input: string) =>
      search(getUserProjectNames(ans["masterPassword"]), input),
  },
  {
    type: "autocomplete",
    name: "configName",
    message:
      "Select config (list only shows configs you have access to):",
    source: (ans: Answers, input: string) =>
      search(getConfigForProject(ans["projectName"]), input),
  }
];

export default class InitCommand extends Command {
  static description =
    "Create a guardian project or reinitialize an existing one.";

  static examples = [
    `$ guardian init
Create a guardian project or reinitialize an existing one.
`,
  ];

  async run(): Promise<void> {
    inquirer.registerPrompt("autocomplete", inquirerPrompt);

    const answers = await inquirer.prompt(qs);

    const config: GuardianProjectConfig = {
      project: answers.projectName,
      config: answers.configName,
    };

    const tokens = getAuthTokens();
    const ss = new StorageService(tokens);

    if (answers.projectName) {
      const newProject = await ss.createNewProject({
        name: answers.projectName,
        description: answers.projectDescription,
        webhook: answers.projectWebhook,
      });
    }

    createFile("guardian.json", JSON.stringify(config, null, 4));
  }
}
