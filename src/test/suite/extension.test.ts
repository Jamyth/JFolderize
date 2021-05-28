import { strict as assert } from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as path from "path";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Extension Active", async () => {
    const started = await vscode.extensions.getExtension("jfolderize")
      ?.isActive;
    assert.deepEqual(started, true);
  });

  test("Should Extension start", async () => {
    await vscode.commands.executeCommand(
      "vscode.openFolder",
      path.join(__dirname, "../../../template")
    );

    // await sleep(5);
    const started = vscode.extensions.getExtension("");
  });
});

function sleep(s: number) {
  return new Promise((res) => setTimeout(res, s * 1000));
}
