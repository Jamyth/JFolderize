import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "jfolderize.run",
    (props: { path: string }) => {
      try {
        const sourcePath = props.path;
        const splitPath = sourcePath.split(".");
        const extension = splitPath.pop();
        if (!extension) {
          vscode.window.showErrorMessage("JFolderize: Not");
          return;
        }

        const targetDirectory = splitPath.join("");
        const newPath = path.join(targetDirectory, `index.${extension}`);
        const content = fs.readFileSync(sourcePath);
        if (
          fs.existsSync(targetDirectory) &&
          fs.statSync(targetDirectory).isDirectory()
        ) {
          vscode.window.showErrorMessage(
            "JFolderize: There is a folder with same name !"
          );
        } else {
          fs.mkdirSync(targetDirectory);
          fs.writeFileSync(newPath, content);
          fs.unlinkSync(sourcePath);
        }
      } catch (error) {
        vscode.window.showErrorMessage(
          `JFolderize: Unexpected Error occurred, ${error}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
