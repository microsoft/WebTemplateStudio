# Web Template Studio
To be written

# Quick Start
To get started, **clone the repository** run the following command in the terminal:
```
./build
```
This will build the extension and the client wizard. The client's production build will be saved into the "react" folder of the extension, where it will be imported as a script into the VSCode extension.

## Running the Extension
Open `src/extension/` as the main project folder within VSCode and press `F5` to run the extension. Use `Ctrl+Shift+P` to run the extension "Web Template Studio".

If there are any issues, navigate to `src/extension/` and use the command `code .` to open the repository.

## Developing for the front-end client
The client was bootstrapped with [Create-React-App and TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript).

Open `src/client/` and use the command `yarn start` to begin development.

*Note: In order to see updated changes in VSCode, the project must be re-built from the root directory - see "Quick Start"* 

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
