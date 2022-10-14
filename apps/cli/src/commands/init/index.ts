import { Command, Flags } from "@oclif/core";
import { createFile, search } from "../../services/initService";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import {
  getConfigForProject,
  getUserProjects,
} from "../../services/repoService";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import GuardianConfig from "../../model/GuardianConfig";

const qs: QuestionCollection<Answers> = [
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
    type: "autocomplete",
    name: "projectName",
    message:
      "Select an existing project (list only shows projects you have access to):",
    source: (_: Answers, input: string) => search(getUserProjects(), input),
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

    const config: GuardianConfig = {
      project: answers.projectName,
      config: [answers.configName],
    };

    createFile("guardian.json", JSON.stringify(config, null, 4));

    console.log(answers);
  }
}
