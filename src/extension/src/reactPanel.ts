import * as vscode from "vscode";
import * as path from "path";
import { AzureAuth, SubscriptionItem, ResourceGroupItem } from './azure-auth/AzureAuth';
import { CosmosDBDeploy, CosmosDBSelections, API } from "./azure-cosmosDB/cosmosDbModule";
import { tempGetSubscription, tempGetResourceGroup } from "./extension";

/**
 * Manages react webview panels
 */
export class ReactPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ReactPanel | undefined;

  private static readonly viewType = "react";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionPath: string) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (ReactPanel.currentPanel) {
      ReactPanel.currentPanel._panel.reveal(column);
    } else {
      ReactPanel.currentPanel = new ReactPanel(
        extensionPath,
        column || vscode.ViewColumn.One
      );
    }
  }

  private constructor(extensionPath: string, column: vscode.ViewColumn) {
    this._extensionPath = extensionPath;

    // Create and show a new webview panel
    this._panel = vscode.window.createWebviewPanel(
      ReactPanel.viewType,
      "React",
      column,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restric the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.file(path.join(this._extensionPath, "react"))
        ]
      }
    );

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
          case "login":
            AzureAuth.login().then(res => {
              const email = AzureAuth.getEmail();
              this._panel.webview.postMessage({
                command: 'login',
                email: email
              });
            }).catch(err => {
              console.log(err);
            });
          case "subscriptions":
            AzureAuth.getSubscriptions().then(items => {
              const subs = items;
              this._panel.webview.postMessage({
                command: 'subscriptions',
                subscriptions: subs
              });
            });
            return;
          case "functions":
            vscode.commands.executeCommand("webTemplateStudioExtension.createFunctionApp");
            return;
          case "cosmos":
            vscode.window.showInformationMessage("Cosmos deployed");
            this.createCosmosDB();
			      
            return;
        }
      },
      null,
      this._disposables
    );
  }

  private async createCosmosDB(){
    let si: SubscriptionItem = await tempGetSubscription("GiV.Hackathon");
    let rgi: ResourceGroupItem = await tempGetResourceGroup("GIV.W19.WTS", "GiV.Hackathon");
    let cosmosDBDeploy = new CosmosDBDeploy();
    let vscOptions : vscode.InputBoxOptions = {
      placeHolder: "Account name",
      prompt: "Provide a Cosmos DB account name",
      validateInput: (name: string) => cosmosDBDeploy.validateCosmosDBAccountName(name, si)
  };
    let dbname : any = await vscode.window.showInputBox(vscOptions); 
    const selection : CosmosDBSelections = {
      cosmosDBResourceName : dbname,
      cosmosAPI : API.MongoDB,
      location : "West US",
      resourceGroupItem : rgi,
      subscriptionItem : si,
      tags : {"Created from" : "WTS demo-friday"}
    } 

    cosmosDBDeploy.createCosmosDB(selection);
  }
  public doRefactor() {
    // Send a message to the webview webview.
    // You can send any JSON serializable data.
    this._panel.webview.postMessage({ command: "refactor" });
  }

  public dispose() {
    ReactPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getHtmlForWebview() {
    const manifest = require(path.join(
      this._extensionPath,
      "react",
      "asset-manifest.json"
    ));
    const mainScript = manifest["main.js"];
    const mainStyle = manifest["main.css"];

    const scriptPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "react", mainScript)
    );
    const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });
    const stylePathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "react", mainStyle)
    );
    const styleUri = stylePathOnDisk.with({ scheme: "vscode-resource" });

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta img-src vscode-resource: https: ;style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, "react")).with({
      scheme: "vscode-resource"
    })}/">
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				<script src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
