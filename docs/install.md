# Web Template Studio Installation Instructions

## Prerequisites

Web Template Studio runs as a VSCode extension and hence you'll need to have _VScode_ version 1.33 or above installed.
Also, you'll need [_Node_](https://nodejs.org/en/download/) and _npm_/[_yarn_](https://yarnpkg.com/en/docs/install) to run the generated templates.

## Where is the offical release?
We are currently early in our development phase and only have a dev nightly on Visual Studio Marketplace.

## Installing the nightly dev branch build _preferred_
Head over to [Visual Studio Marketplace’s Web Template Studio page](https://marketplace.visualstudio.com/items?itemName=WASTeamAccount.WebTemplateStudio-dev-nightly) and click "[install](vscode:extension/WASTeamAccount.WebTemplateStudio-dev-nightly)" 😊.  

## Installing the latest Microsoft Web Template Studio release manually

1. Get the latest release from Web Template Studio [Github releases](https://github.com/Microsoft/WebTemplateStudio/releases)
2. Scroll down to _Assets_ and download the `.vsix` file
3. Open VSCode
4. Open the extensions menu from VSCode sidebar
5. Click on the ellipsis in the upper right hand corner
6. Choose _Install from VSIX_
7. Select the `.vsix` you downloaded earlier. Web Template Studio is now ready to use

![VSIX Install Instructions](./resources/vsix-install-instructions.png)

#### Run the Release

- Open **VSCode**
- Press `ctrl+shift+p`to open VSCode's extension launcher
- Type/Select `Web Template Studio: Launch` and press `Enter` to launch the extension
