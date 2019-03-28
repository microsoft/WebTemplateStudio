# Release Notes

All notable changes to the extension and client will be documented in this file.

Check [Read Me](https://github.com/Microsoft/WebTemplateStudio/blob/master/README.md/) for overview of Project

Check [Issues Page](https://github.com/Microsoft/WebTemplateStudio/issues/) for existing Github issues of Project

## Release __VERSIONNUMBER__

#### Extension Features
- Telemetry Tracking Available
- Leverage azure-account extension for Azure Login
- Deploy Azure Function (_Read Notes_)
- Deploy Azure CosmosDB
- Engine Template Synchronization
- Live data

#### Wizard Features
- Telemetry Tracking On Page Change
- Login and Sign out of Azure Account
- Azure Cosmos Modal
- Populate Subscription, Resource Group, Location
- Unique Validation of Cosmos Name
- Azure Function Modal
- Populate Subscription, Resource Group, Location
- Unique Validation of Function Name
- Select Project Type
- Select Frameworks
- Select Multiple Pages
- Delete Pages from Selection
- Validation on Input for Project Name, Page Name, and File Path
- Generate project (Material UI)
- New Summary Page
- Delete Pages and Services from Summary Page

#### Mock Template Features

- Master detail, Grid and List Pages
- Connection to MongoDB
- Node/Express Backend

#### Unimplemented Features

- Web App Deployments
- Azure AD
- Generate project (bootstrap -> replaces material)
- Dynamically gain dependencies at first run (Dlls) rather than packaging with vsix.

#### Notes

- As of March 27, 2019 the functions deployed using Azure Functions functionality of Web Template Studio
  are not available directly due to a bug with Kudu App Service. This affects the VScode Azure functions extension
  too. A quick workaround is to simply restart your app from the Azure portal. This note will be removed as soon as
  the service is working normally again.
