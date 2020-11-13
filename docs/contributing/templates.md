# Understanding the Templates

Templates are used to generate the code. In *Web Template Studio* we have the following kinds of templates: Frameworks, Projects Types, Pages and Features.

For example, consider the following scenarios:

- **Scenario #1**: you want to generate a project to create a target web app which uses the *React* on the frontend and *Node* on the backend, with some pages (Home, Products -a master detail page-, Todo -a list page-, etc. ) and including some extra features like Azure App Service and Cosmos DB...
- **Scenario #2**: you want to create as in *Scenario #1* but with Angular as frontend framework and without CosmosDB support.

The *Web Template Studio* allow you to combine different templates to generate the project you want, using your preferred framework, and using the features you most like. Moreover, the templates available in *Web Template Studio* are extensible.

## Interested in contributing

Do you want to contribute? Here are our [contribution guidelines](../../CONTRIBUTING.md).

## Anatomy of Templates and Template Authoring

For more info about how templates work see [Core Template Studio](https://github.com/microsoft/CoreTemplateStudio/tree/dev/docs/templates.md)

## Templates repository structure

The [Templates Repository](../../templates) has the following structure:

- [Web](../../templates/Web): this folder contains all templates used for Web projects
  - [_catalog](../../templates/Web/_catalog): this folder contains the catalog of available Frameworks and Project Types, including the required information and metadata (descriptions, icons, images, etc.) to be displayed in the Wizard.
  - [_composition](../../templates/Web/_composition): this folder contains the partial code templates that will be generated when certain constraints are met, including framework specific templates.
  - [Features](../../templates/Web/Features): Feature templates with the sources required to add different features and / or capabilities to the target web app.
  - [Pages](../../templates/Web/Pages): Page templates define the source files needed to create a page of a certain type.
  - [Projects](../../templates/Web/Projects): Project templates which define the actual folder structure, source files and auxiliary files to create a base project.


## Learn more

- [Templates doc in Core Template Studio](https://github.com/microsoft/CoreTemplateStudio/tree/dev/docs/templates.md)
- [All docs](../README.md)
