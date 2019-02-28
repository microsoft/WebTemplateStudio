import * as vscode from "vscode";
import ApiModule from "./apiModule";
import { ChildProcess } from "child_process";
import { Controller } from './controller';

let apiProcess: ChildProcess;

export function activate(context: vscode.ExtensionContext) {

	// Launch the client wizard assuming it has been built
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"webTemplateStudioExtension.wizardLaunch",
			() => {
				apiProcess = ApiModule.StartApi(context);
				console.log(apiProcess.pid);
				Controller.launchWizard(context);
			}
		)
	);
}

export function deactivate() {
	// This will ensure all pending events get flushed
	apiProcess.kill();
}