// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { copy } from "./clipboard";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-refer-ts" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('code-refer-ts.copyVscodeReferLink', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			const filePath = editor.document.uri.fsPath;
			const content = `vscode://file/${filePath}:${position.line+1}:${position.character}`;
			copy(content);
			vscode.window.showInformationMessage('copied.');
		} else {
			vscode.window.showInformationMessage('no file is open');
		}
	});
	context.subscriptions.push(disposable);
	let disposable1 = vscode.commands.registerCommand('code-refer-ts.InsertRandomFlag', ()=>{
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				editor.selections.forEach(selection => {
					editBuilder.insert(selection.active, 'aaa');
				});
			});
		}
	});

}

// This method is called when your extension is deactivated
export function deactivate() {}
