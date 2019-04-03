# Web Template Studio

Web Template Studio (_WebTS_) is a Visual Studio Code Extension that accelerates the creation of new Web apps using a
wizard-based experience. The resulting Web application is well-formed, readable code that incorporates cloud services on
Azure while implementing proven patterns and best practices. Sprinkled throughout the generated code we have links to
Docs to provide useful insights.

WebTS currently supports the following:

- _Front-end_: React.js
- _Back-end_: Node.js
- _Cloud services_: Azure Cosmos DB, Azure Functions

## Build Status

| Branch  |                                                                                                                                           Build Status                                                                                                                                            |
| :------ | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| dev     |     [![Build Status](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_apis/build/status/Web-Template-Studio-DevCI/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=dev)](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_build/latest?definitionId=275&branchName=dev)     |
| staging | [![Build Status](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_apis/build/status/Web-Template-Studio-DevCI/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=staging)](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_build/latest?definitionId=275&branchName=staging) |
| master  |  [![Build Status](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_apis/build/status/Web-Template-Studio-DevCI/WebTemplateStudio%20-%20CI%20and%20Deploy?branchName=master)](https://microsoftgarage.visualstudio.com/Intern%20GitHub/_build/latest?definitionId=275&branchName=master)  |

## Example Scenario

I need a Fullstack web app that stores blog posts in a Cosmos database.

![Readme-app-screenshot](./docs/resources/readme-app-screenshot.png)

## Features

Web Template Studio approaches web app creation using the following four attribute sets:

- **Project type**: First, what type of application are you building? We currently support only one type: _Fullstack Application_.
- **Frameworks**: Next, which frameworks do you want to use for your frontend and backend? We currently support one framework for frontend: _[React.js](https://reactjs.org/)_ and one framework for backend: _[Node.js](https://nodejs.org/en/)_.
- **App pages**: To accelerate app creation, we provide a number of app page templates that you can use to add common UI pages into your new app. The current page templates include: _blank page_, common layouts (*e.g., master/detail) and pages that implement common patterns (*e.g., grid, list). Using the wizard, add as many of the pages as you need, providing a name for each one, and we'll generate them for you.
- **Cloud Services**: Lastly, you specify which Azure cloud services you want to use, and we'll build out the framework for the services into your app including tagging 'TODO' items. Currently supported services cover storage (_Azure Cosmos DB_), and compute (_Azure Functions_).

Once you make the selections you want and click generate, you can quickly extend the generated code.

# Documentation

- [Installing the extension](/docs/Install.md)
- [Getting started with the codebase](/docs/getting-started-developers.md)
- [Terminology for developers](/docs/Terminology.md)

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
