import { Command, Flags } from "@oclif/core";
import { search, writeIntoFile } from "../../services/initService";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { getConfigForProject } from "../../services/repoService";
import { GuardianProjectConfig } from "../../model/GuardianModels";

const qs: QuestionCollection<Answers> = [
  {
    type: "autocomplete",
    name: "configName",
    message:
      "Select an existing config (list only shows configs you have access to):",
    source: (ans: Answers, input: string) =>
      search(getConfigForProject(""), input),
  },
];

export default class CheckoutCommand extends Command {
  static description =
    "Switch to a config in the current project that you have access to.";

  static examples = [
    `$ guardian checkout newConfig
Switch to a config in the current project that you have access to.
`,
  ];

  static args = [
    {
      name: "config",
      description: "name of config to switch to",
      required: false,
    },
  ];

  static flags = {
    boolean: Flags.boolean({
      char: "b",
      description: "command to add new config",
      required: false,
    }),
  };

  async run(): Promise<void> {
    inquirer.registerPrompt("autocomplete", inquirerPrompt);

    const { args } = await this.parse(CheckoutCommand);
    const { flags } = await this.parse(CheckoutCommand);

    //console.log(flags.boolean);
    if (flags.boolean) {
      console.log(args.config);
      writeIntoFile("guardian.json", args.config);
      //creating a new config
    } else {
      if (args.config_name !== undefined) {
        this.log(`Fetching config '${args.config_name}'`);
      } else {
        const answers = await inquirer.prompt(qs);
      }
    }
  }
}
