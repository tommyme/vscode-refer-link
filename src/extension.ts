// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { copy } from "./clipboard";

import * as path from 'path';

function copyRelativePath(selected: any) {
    const editor = vscode.window.activeTextEditor;

    let current;
    let relativePath;

    if (!editor) {
        vscode.window.showInformationMessage("There is no open file to get the relative path.");
        return;
    }

    current = editor.document.uri;
    relativePath = path.relative(path.dirname(current.path), selected.path);
    relativePath = relativePath.replace(/\\/g, '/');

    // if (config.addLeadingDot && !relativePath.startsWith('..')) {
    //     relativePath = `./${relativePath}`;
    // }

    copy(relativePath);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const vs_console = vscode.window.createOutputChannel('vsc-refer-link');
	vs_console.appendLine("init");
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
				editor.selections.forEach((selection, idx) => {
					editBuilder.insert(selection.active, String.fromCharCode(idx+97));
				});
			});
		}
	});
	context.subscriptions.push(disposable1);
	let disposable2 = vscode.commands.registerCommand("code-refer-ts.RepeatLastCommand", ()=>{
		// currently unavailable
		vs_console.appendLine("before patch");
		// function xx<T = unknown>(command: string, ...rest: any[]): Thenable<T> {
		// 	// 在这里执行您的命令逻辑
		// 	// 返回一个 Thenable 对象，例如使用 vscode.commands.executeCommand() 函数
		// 	vs_console.appendLine(command);
		// 	return vscode.commands.executeCommand<T>(command, ...rest);
		// }
		// vscode.commands.executeCommand = xx;
	});
	context.subscriptions.push(disposable2);
	let disposable3 = vscode.commands.registerCommand("code-refer-ts.CopyWindowRelativePath", (uri) => {
		// vscode.commands.executeCommand('editor.action.copyRelativePath');
		// uri will be like file:///Users/xxx/xxx.vue
		vs_console.appendLine(uri);
		copyRelativePath(uri);
	});
	context.subscriptions.push(disposable3);
}

// This method is called when your extension is deactivated
export function deactivate() {}
