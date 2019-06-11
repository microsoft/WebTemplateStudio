# Microsoft Web Template Studio

<img src="https://img.shields.io/badge/platform-linux--64%20%7C%20win--64%20%7C%20osx--64%20-lightgrey.svg" alt="Platforms Supported: MacOSX, Linux, Windows"/> <a href="https://www.repostatus.org/#active"><img src="https://www.repostatus.org/badges/latest/active.svg" alt="Project Status: Active – The project has reached a stable, usable state and is being actively developed." /></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: We are using the MIT License"></a> <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="We are welcoming PRS!"></a>

Microsoft Web Template Studio (_WebTS_) is a Visual Studio Code Extension that accelerates the creation of new web applications using a
wizard-based experience. WebTS enables developers to generate boilerplate code for a web application
by choosing between different front-end frameworks, back-end frameworks, pages and cloud services.
The resulting web app is well-formed, readable code that incorporates cloud services on
Azure while implementing proven patterns and best practices. Sprinkled throughout the generated code we have links to
Docs to provide useful insights. WebTS was created using TypeScript and React. Different combinations of generated code
are merged together by [Core Template Studio](https://github.com/Microsoft/CoreTemplateStudio), which was made using .NET Core.

## Build Status

| Branch  |                                                                                                                 Build Status                                                                                                                  |
| :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| dev     |     [![Build Status](https://winappstudio.visualstudio.com/Vegas/_apis/build/status/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=dev)](https://winappstudio.visualstudio.com/Vegas/_build/latest?definitionId=158&branchName=dev)     |
| staging | [![Build Status](https://winappstudio.visualstudio.com/Vegas/_apis/build/status/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=staging)](https://winappstudio.visualstudio.com/Vegas/_build/latest?definitionId=158&branchName=staging) |
| master  |  [![Build Status](https://winappstudio.visualstudio.com/Vegas/_apis/build/status/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=master)](https://winappstudio.visualstudio.com/Vegas/_build/latest?definitionId=158&branchName=master)  |

# Documentation

- [Installing the extension](/docs/install.md)
- [Getting started with the codebase](/docs/getting-started-developers.md)
- [Terminology for developers](/docs/terminology.md)

## SHA256 
 
Visual Studio Code extensions are currently not signed. WebTS provides the Secure Hash Algorithm (SHA) of each version we publish. You can find the current extensions sha256 value in the following files:
-	Dev-nightly: [sha256-dev-nightly.md](sha256-dev-nightly.md)
 
To verify the integrity of the package, download the vsix from the Marketplace, calculate the hash of the package using the powershell command ‘Get-FileHash’ or any other tool that allows you to calculate the packages hash, and compare both.


## Instruction To Use

- Open **VSCode**
- Press `ctrl+shift+p` in Windows/Linux or `⇧⌘P` in Mac to open VSCode's extension launcher
- Type/Select `Web Template Studio: Launch` and press `Enter` to launch the extension

## Example Scenario

I need a full-stack web app that stores data in a Cosmos database.

![Readme-app-screenshot](./docs/resources/readme-app-screenshot.png)

## Features

Web Template Studio approaches web app creation using the following four attribute sets:

- **Project type**: First, what type of application are you building? We currently support only one type: _Fullstack Application_.
- **Frameworks**: Next, which frameworks do you want to use for your frontend and backend? We currently support one framework for frontend: _[React.js](https://reactjs.org/)_ and one framework for backend: _[Node.js](https://nodejs.org/en/)_.
- **App pages**: To accelerate app creation, we provide a number of app page templates that you can use to add common UI pages into your new app. The current page templates include: _blank page_, common layouts (*e.g., master/detail) and pages that implement common patterns (*e.g., grid, list). Using the wizard, add as many of the pages as you need, providing a name for each one, and we'll generate them for you.
- **Cloud Services**: Lastly, you specify which Azure cloud services you want to use, and we'll build out the framework for the services into your app including tagging 'TODO' items. Currently supported services cover storage (_Azure Cosmos DB_), and compute (_Azure Functions_).

Once you make the selections you want and click generate, you can quickly extend the generated code.

## Feedback, Requests and Roadmap

Please use [GitHub issues](https://github.com/Microsoft/WebTemplateStudio/issues) for feedback, questions or comments.

If you have specific feature requests or would like to vote on what others are recommending, please go to the [GitHub issues](https://github.com/Microsoft/WebTemplateStudio/issues) section as well. We would love to see what you are thinking.

We are still extremely early in development and are looking for feedback for roadmap. Currently we are in the process of stabilizing our React / Node.js golden path.

## Contributing

Do you want to contribute? We would love to have you help out. Here are our [contribution guidelines](CONTRIBUTING.md).

## Reporting Security Issues

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) at secure@microsoft.com. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the Security TechCenter.

## License

This code is distributed under the terms and conditions of the [MIT license](LICENSE.md).

## Privacy Statement

The extension does [log basic telemetry](docs/telemetry.md) for what is being selected. We are in the process of creating a [Telemetry Data](docs/telemetryData.md) page to summarize usage trends. Please read the [Microsoft privacy statement](http://go.microsoft.com/fwlink/?LinkId=521839) for more information.

## Frameworks in Generated Code Not Created by Our Team

- [React](https://reactjs.org/)
- [Create-React-App](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [Express Generator](https://expressjs.com/en/starter/generator.html)
- [Bootstrap](https://getbootstrap.com/)
- [Angular](https://angular.io/)
- [Angular CLI](https://angular.io/cli)
- [Vue](https://vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Node.js](https://nodejs.org/en/)

## Acknowledgments

Microsoft Web Template Studio was [initially created by Microsoft Garage interns](docs/acknowledgments.md).  We hope many more continue with the project 
