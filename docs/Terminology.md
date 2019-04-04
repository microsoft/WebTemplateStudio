# Terminology

This document outlines the terminology to be used to refer to the various parts of Web Template Studio application as a standard throughout the codebase and verbally in meetings and discussions. This is a living document and will change with time to reflect changes in the architecture of the application, development standards etc. The architecture diagram below is a helpful reference when looking at the terms.

// TODO Add Architecture Diagram

## General Terminology

- `WebTS/Web Template Studio` - Refers to the VS Code extension used to generate boilerplate code for web applications, the code for which lies in this repository.
- `WinTS/Windows Template Studio` - Refers to the Visual Studio extension used to generate boilerplate code for UWP applications.
- `CoreTS/Core Template Studio` - Refers to the github repository that holds the core engine shared by both WinTS and WebTS.
- `Contributing Developer` - A developer who is contributing to this open source project.
- `User` - A developer who is using the WebTS extension.
- `Mocks` - The code that will be generated as the final output of the engine. Mocks must be converted to templates before being used by the engine.
- `Template` - A template contains code with metadata. The metadata will contain the following template information: name, description, licensing, remarks, programming language, type, etc. The template definition is based on [dotnet Template Engine](https://github.com/dotnet/templating).

## Generated Code

- `back-end` - The back-end code that is generated, for example, an express back-end.
- `front-end` - The front-end code that is generated, for example, the React front-end.
- `Cosmos Database` - The Cosmos Database that is deployed for the user. Cosmos Mongo Database refers to a Cosmos database that is deployed with the Mongo API.
- `Azure Function` - The Azure Functions that are being are being deployed to Azure.

## Extension

- `Extension` - Refers to the Visual Studio Extension that lies at the heart of the application in the architecture diagram above.
- `Telemetry` - The telemetry collected by our VS Code extension, such as frameworks selected and time to generate. Collected telemetry is sent to Azure App Insights.
- `Client/Front End Wizard` - Refers to the front-end of the WebTS wizard, where all user interaction occurs. The front-end wizard is created with React Typescript and is displayed through the React Panel.
- `React Panel` - Displays the React front-end wizard and communicates between the front-end wizard and the extension through post messages.
- `Engine Core` - GitHub Repository shared between WebTS and WinTS that handles all of the logic for merging templates.
- `Engine API` - A local server used to communicate between the typescript extension and the .NET Engine Core.
- `CosmosDB Module` - Module for deploying Azure Resource Manager (ARM) templates to create Cosmos databases for the user.
- `Azure Functions Module` - Module for creating Azure Resource Managers (ARM) templates to deploy Azure functions for the user.
- `Azure Authentication Module` - Utilizes the VSCode-Azure-Account Extension to authenticate users into their Azure accounts.
