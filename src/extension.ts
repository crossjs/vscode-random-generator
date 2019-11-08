// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as Constants from "./constants";
import { copy } from "./clipboard";
import { random } from "./random";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "random-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  for (const cmd of Constants.Commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(cmd, (args: any[]) => {
        const editor = vscode.window.activeTextEditor;

        generateRandomString(cmd, editor);
      })
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}

function generateRandomString(cmd: string, editor: vscode.TextEditor | undefined) {
  if (editor === undefined || editor.selection === undefined) {
    copyUuid(random());
    return;
  }

  let randomString: string = random();

  editor.edit(editBuilder => {
    for (const selection of editor.selections) {
      editBuilder.replace(selection, randomString);
      if (cmd === Constants.RANDOM_GENERATE) {
        randomString = random();
      }
    }
  });
}

function showMessage(randomString: string) {
  if (isNullOrWhiteSpace(randomString)) {
    return;
  }

  vscode.window.showInformationMessage(randomString);
}

function copyUuid(randomString: string) {
  copy(randomString, () => {
    showMessage(randomString + " is copied.");
  });
}

function isNullOrWhiteSpace(text: string | null | undefined) {
  return (
    (typeof text === "string" && !text.trim()) ||
    typeof text === undefined ||
    text === null
  );
}
