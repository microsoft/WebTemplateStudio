# Getting started with the Codebase

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Gulp](https://gulpjs.com/)
3. Install [Git](https://git-scm.com/downloads)
4. Install [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
5. Install [Visual Studio Code](https://code.visualstudio.com/)
6. Install [Yarn](https://yarnpkg.com/en/docs/install). You will need to finish installing Node.js before you install Yarn.
7. Run the command `npm config set scripts-prepend-node-path true`. This tells VSCode which Node version to run during the extension compilation (otherwise you'll get an error during the build process).

_Note: If using Windows, use Git Bash_.

## Running the Extension

1. Clone the repository with `git clone https://github.com/microsoft/WebTemplateStudio.git` or `git clone git@github.com:microsoft/WebTemplateStudio.git`.
2. The repository depends on another submodule called [CoreTemplateStudio](https://github.com/microsoft/CoreTemplateStudio). To copy dependent code from submodule, run:

```
  git submodule init
  git submodule update
```

3. Run `./build`. This script compiles the client and builds the extension.
4. Open the `src/extension` folder using `VSCode`.
5. Start the debugger by pressing `F5`. This should open the Extension Development Host in a new Visual Studio Code window.
6. In the Extension Development Host, press `Ctrl + Shift + P` on Windows/Linux or `Command ⌘ + Shift + P` to open the Command Palette.
7. In the Command Palette, type `Web Template Studio: Launch` and press `Enter` to launch the extension. Make sure that you don't have the Web Template Studio from the marketplace installed, otherwise it will throw an error.

## Developing the Client

The client lives in the `src/client` directory. To run the client for development, navigate to `src/client` and use the command

```
yarn start
```

to begin development in the browser. We recommend using a chromium based browser such as Chrome.

The client was bootstrapped using [Create-React-App with TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript).

## Creating VSIX Package

_**Note: You cannot sideload the VSIX and build/run the extension through Extension Development Host (using `F5` on VSCode) at the same time or there will be naming conflicts. The VSIX should be uninstalled first.**_

The installation script `createVsix` will build the extension package (_.vsix_) for you.

```
./createVsix
```

The script will package the extension into the root directory `/dist` folder. The vsix package can be distributed and
installed by anyone who has VSCode using the command in the extension directory:

```
code --install-extension [extensionName].vsix
```

`webts-0.0.0-UNTRACKEDVERSION.vsix` is the default extensionName.

Alternatively, copy the extension into your extensions directory. For _Windows_, it is
`%USERPROFILE%\.vscode\extensions`. For _Mac/Linux_, it is `~/.vscode/extensions` (By Default).

After installation, use `ctrl+shift+p (Windows)` or `cmd+shift+p (Mac)` to open the Extension Launcher and select `Web Template Studio: Launch` to run the extension.

## Running the client in the VSCode Extension

To see any changes made on the client within VSCode, run the instructions shown in the `Running the extension` section to rebuild the client and the extension. The resulting changes should appear in VSCode when the extension runs.

Rebuilding the client is required because the client is injected into a [VSCode Webview](https://code.visualstudio.com/api/extension-guides/webview) using the production build of the client.

### Under the Hood

The following notes are inspired by the [vscode-webview-react](https://github.com/rebornix/vscode-webview-react)
repository by [rebornix](https://github.com/rebornix):

- We inline `index.html` content in `src/extension/src/extension.ts` when creating the webview
- For all resources going to the webview, their scheme is `vscode-resource`
- We add a baseUrl `<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">` and then all relative paths work.
