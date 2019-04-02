# Getting started with the Codebase

## Prerequisites

[Git](https://git-scm.com/downloads), [Yarn](https://yarnpkg.com/en/docs/install), [Node.js](https://nodejs.org/en/download/), [Gulp](https://gulpjs.com/) and [VSCode](https://code.visualstudio.com/) must be installed prior to running the installation or build scripts.

Run the command

```
npm config set scripts-prepend-node-path true
```

to tell VSCode which Node version to run during the extension compilation (otherwise you'll get an error during the build process).

_Note: If using Windows, use Git Bash_.

## Quick Start

To get started, the first step is to clone this repository. To install dependencies, compile the client, and compile the
extension, run:

_Windows:_

```
./build
```

_Mac/Linux_

```
bash build
```

Open `src/extension` using `VSCode` and press `F5` to run the extension. Use `Ctrl+Shift+P` to open VSCode's extension
launcher. Select `Web Template Studio: Launch` and press `Enter` to launch the extension

## Developing the Client

The client lives in the `src/client` directory. To run the client for development, navigate to `src/client` and use the command

```
yarn start
```

to begin development. The client was bootstrapped using [Create-React-App with TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript).

## Creating VSIX Package

_**Note: You cannot sideload the VSIX and build/run the extension through Extension Development Host (using `F5` on VSCode) at the same time or there will be naming conflicts. The VSIX should be uninstalled first.**_

The installation script `createVsix` will build the extension package (_.vsix_) for you.

_Windows:_

```
./createVsix
```

_Mac/Linux:_

```
bash createVsix
```

_Note: We need to use the `bash` prefix to avoid setting permissions for the script._

The script will package the extension into the root directory `/dist` folder. The vsix package can be distributed and
installed by anyone who has VSCode using the command in the extension directory:

```
code --install-extension [extensionName].vsix
```

`wts-0.0.0-UNTRACKEDVERSION.vsix` is the default extensionName.

Alternatively, copy the extension into your extensions directory. For _Windows_, it is
`%USERPROFILE%\.vscode\extensions`. For _Mac/Linux_, it is `~/.vscode/extensions` (By Default).

After installation, use `ctrl+shift+p (Windows)` or `cmd+shift+p (Mac)` to open the Extension Launcher and select `Web Template Studio: Launch` to run the extension.

## Running the client in the VSCode Extension

To see any changes made on the client within VSCode, run the instructions shown in the `Quick Start` section to rebuild the client and the extension. The resulting changes should appear in VSCode when the extension runs.

Rebuilding the client is required because the client is injected into a [VSCode Webview](https://code.visualstudio.com/api/extension-guides/webview) using the production build of the client.

### Under the Hood

The following notes are inspired by the [vscode-webview-react](https://github.com/rebornix/vscode-webview-react)
repository by [rebornix](https://github.com/rebornix):

- We inline `index.html` content in `src/extension/src/extension.ts` when creating the webview
- For all resources going to the webview, their scheme is `vscode-resource`
- We add a baseUrl `<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">` and then all relative paths work.
