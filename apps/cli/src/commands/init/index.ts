import { Command, Flags } from "@oclif/core";
import { createFile, search } from "../../services/initService";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import {
  getConfigForProject,
  getUserProjectNames,
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
    type: "confirm",
    name: "projectType",
    message: "Creating a new project?",
    default: false,
  },
  {
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    when: (ans) => ans["projectType"] == true,
    default: "new-project",
  },

  {
    type: "input",
    name: "projectDescription",
    message: "Enter project description:",
    when: (ans) => ans["projectType"] == true,
    default: "new-project",
  },
  {
    type: "input",
    name: "projectWebhook",
    message: "Enter project webhook:",
    when: (ans) => ans["projectType"] == true,
    default: "new-project",
  },
  {
    type: "autocomplete",
    name: "projectName",
    message:
      "Select an existing project (list only shows projects you have access to):",
    source: async (ans: Answers, input: string) =>
      search(await getUserProjectNames(ans["masterPassword"]), input),
    when: (ans) => ans["projectType"] == false,
  },
  {
    type: "confirm",
    name: "configType",
    message: "Creating a new config?",
    default: true,
    when: (ans) => ans["projectType"] == false,
  },
  {
    type: "autocomplete",
    name: "configName",
    message:
      "Select an existing config (list only shows configs you have access to):",
    source: (ans: Answers, input: string) =>
      search(getConfigForProject(ans["projectName"]), input),
    when: (ans) => ans["configType"] == false,
  },
  {
    type: "input",
    name: "configName",
    message: "Enter config name:",
    when: (ans) => ans["projectType"] == true || ans["configType"] == true,
    default: "new-config",
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

    // const answers = {
    //   projectName: "guardian",
    //   configName: "new-config",
    //   projectDescription: "cli based env sharing",
    //   projectWebhook: "https://example.com/",
    // };

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

      console.log(newProject);
    }

    createFile("guardian.json", JSON.stringify(config, null, 4));

    console.log(answers);
  }
}
