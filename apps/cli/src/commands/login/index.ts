import { Command, Flags } from "@oclif/core";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import { homedir } from "os";
import path from "path";
import { AuthServices } from "../../common/services/AuthServices";
import { createFile } from "../../services/initService";

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

    const as = new AuthServices();
    const result = await as.login(answers.email, answers.masterPassword)

    if (result.success == true) {
      createFile(path.join(homedir(), ".guardian.json"), JSON.stringify(result.tokens))
      this.log("Logged in successfully.")
    }
    else this.log("Incorrect credentials.");
  }
}
