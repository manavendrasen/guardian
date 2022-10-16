import { Command, Flags } from "@oclif/core";
import { createFile } from "../../services/initService";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import {
  getConfigByName,
  getConfigForProject,
  getProjectByName,
  getUserProjectNames,
  search,
} from "../../services/repoService";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { GuardianProjectConfig } from "../../model/GuardianModels";

const qs: QuestionCollection<Answers> = [
  {
    type: "password",
    name: "masterPassword",
    message: "Enter Master Password:",
  },
  {
    type: "autocomplete",
    name: "projectName",
    message: "Select project (list only shows projects you have access to):",
    source: (ans: Answers, input: string) =>
      search(getUserProjectNames(ans["masterPassword"]), input),
  },
  {
    type: "autocomplete",
    name: "configName",
    message: "Select config (list only shows configs you have access to):",
    source: (ans: Answers, input: string) =>
      search(
        getConfigForProject(ans["projectName"], ans["masterPassword"]),
        input
      ),
  },
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

    const project = await getProjectByName(
      answers["projectName"],
      answers["masterPassword"]
    );

    if (project) {
      const config = await getConfigByName(project.id, answers["configName"]);
      if (config) {
        const c: GuardianProjectConfig = {
          projectId: project.id,
          project: project.name,
          configId: config.id,
          config: config.name,
        };

        createFile("guardian.json", JSON.stringify(c, null, 4));
        this.log("Guardian initialized.")
      }
    }
  }
}
