# Web Template Studio
*To be written*

Note: Use VSCode light mode to view the extension. Running the extension in VSCode v1.31 ~~and above will currently result in non-rendering SVGs~~. This issue was [fixed on Feb.12, 2019](https://github.com/Microsoft/vscode/issues/68033).

# Prerequisites
[Git](https://git-scm.com/downloads), [Yarn](https://yarnpkg.com/en/docs/install#mac-stable), [Node](https://nodejs.org/en/download/) and [VSCode](https://code.visualstudio.com/updates/v1_31) must be installed prior to running the installation or build scripts.

In VSCode, install the [Azure Cosmos DB VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) because it is an extension dependency.

Install [Visual Studio Code Extensions CLI](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce) using the command `yarn add global vsce`.

Run the command 
```
npm config set scripts-prepend-node-path true
```
to tell VSCode which Node version to run during the extension compilation (otherwise you'll get an error during the build process).

*If using Windows, use Git Bash*.

# Extension Installation Quick Start
The installation script "installExtension" will build and install the extension for you. Use the command on Windows:
```
./installExtension
```
For Mac, use:
```
bash installExtension
```
to avoid setting permissions for the script.

The script will package the extension into the root directory `/dist` folder and install the package into VSCode. Open or restart VSCode to load the extension. Use `ctrl+shift+p (Windows)` or `cmd+shift+p (Mac)` to open the Extension Launcher and select `Web Template Studio: Launch` to run the extension.

**Note: Use VSCode light mode for proper viewing**

## Creating an installation alias (optional)
Create an alias in your `.bashrc` file to run the extension more conveniently. For example:

```
1. Use vim ~/.bashrc to open the bashrc file (any text editor will do as long as you know the location).
2. Add the following line:

alias bw="./installExtension || bash installExtension"

3. Save the .bashrc file and quit Vim.
4. Use the command "source ~/.bashrc" to load the alias.
```
You can simply use the command `bw (or change to your liking)` to run the build script onwards.

# Development Quick Start
Clone the repository and use
```
./build
```
to install dependencies, compile the client and the extension. Open `src/extension` using `VSCode` and press `F5` to run the extension. Use `Ctrl+Shift+P` to open VSCode's extension CLI and open the extension named `Web Template Studio`.

if compiling on Mac, try:
```
bash build
```

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
