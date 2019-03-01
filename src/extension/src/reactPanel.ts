import * as vscode from "vscode";
import * as path from "path";

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
  private static _controllerFunctionDelegate = function(message: any) {
    switch (message.command) {
      case "alert":
        vscode.window.showErrorMessage(message.text);

        break;
    }
  };

  // private static _controller: Controller;

  public static createOrShow(
    extensionPath: string,
    controllerFunctionDelegate: (message: any) => any = this
      ._controllerFunctionDelegate
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (ReactPanel.currentPanel) {
      ReactPanel.currentPanel._panel.reveal(column);
    } else {
      this._controllerFunctionDelegate = controllerFunctionDelegate;

      ReactPanel.currentPanel = new ReactPanel(
        extensionPath,
        column || vscode.ViewColumn.One,
        controllerFunctionDelegate
      );
    }
    return ReactPanel.currentPanel;
  }

  public postMessageWebview(object: Object) {
    this._panel.webview.postMessage(object);
  }

  private constructor(
    extensionPath: string,
    column: vscode.ViewColumn,
    controllerClassDelegate: (message: any) => any
  ) {
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
    this._panel.title = "Project Acorn";

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview from a function delegate
    this._panel.webview.onDidReceiveMessage(
      controllerClassDelegate,
      null,
      this._disposables
    );
  }

  // TODO: this should be removed
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
				<title>Web Template Studio</title>
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
