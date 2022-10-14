import { Command, Flags } from "@oclif/core";
import inquirer, { Answers, QuestionCollection } from "inquirer";

const qs: QuestionCollection<Answers> = [
  {
    type: "input",
    name: "email",
    message: "Enter email:",
  },
  {
    type: "password",
    name: "masterPassword",
    message: "Enter Master Password:",
  },
];

export default class LoginCommand extends Command {
  static description = "Install the env variables during the run time";

  async run(): Promise<void> {
    const answers = await inquirer.prompt(qs);

    console.log(answers);
  }
}
