# Web Template Studio
*To be written*
Note: Use VSCode light mode to view the extension. Running the extension in VSCode v1.31 and above will currently result in non-rendering SVGs.

# Quick Start
Clone the repository and use
```
./build
```
to install dependencies, compile the client and the extension. Open `src/extension` using `VSCode` and press `F5` to run the extension. Use `Ctrl+Shift+P` to open VSCode's extension CLI and open the extension named `Web Template Studio`.

## Developing for the Client
The client lives in the `src/client` directory. To run the client for development, navigate to `src/client` and use the command
```
yarn start
```
to begin development. The client was bootstrapped using [Create-React-App with TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript).

## Running the client in the VSCode Extension

To see any changes made on the client within VSCode, run the instructions shown in the `Quick Start` section to rebuild the client and the extension. The resulting changes should appear in VSCode when the extension runs.

Rebuilding the client is required because the client is injected into a [VSCode Webview](https://code.visualstudio.com/api/extension-guides/webview) using the production build of the client.

# Under the Hood
The following notes are inspired by the [vscode-webview-react](https://github.com/rebornix/vscode-webview-react) repository by [rebornix](https://github.com/rebornix):

- We inline `index.html` content in `src/extension/src/extension.ts` when creating the webview
- For all resources going to the webview, their scheme is `vscode-resource`
- We add a baseUrl `<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">` and then all relative paths work.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
