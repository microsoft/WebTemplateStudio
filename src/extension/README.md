# Web Template Studio (Preview)

Web Template Studio (_WebTS_) is a Visual Studio Code Extension that accelerates the creation of new web applications using a
wizard-based experience. WebTS enables developers to generate boilerplate code for a web app
by choosing between different front-end frameworks, back-end frameworks, pages and cloud services.
The resulting web application is well-formed, readable code that incorporates cloud services on
Azure while implementing proven patterns and best practices. Sprinkled throughout the generated code we have links to
Docs to provide useful insights.

## Instructions To Use

### Create a new project

- Open **VSCode**
- Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac to open VSCode's extension launcher
- Type/Select `Web Template Studio: Launch` and press `Enter` to launch the extension

### Deploy the generated project

- Open **VSCode**
- Open the generated project
- Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac to open VSCode's extension launcher
- Type/Select `Web Template Studio: Deploy App` and press `Enter` to begin the deployment

## Features

Web Template Studio approaches full-stack web app creation using the following three attribute sets:

- **Frameworks**: First, which frameworks do you want to use for your frontend and backend? We currently support three frameworks for frontend: _[React](https://reactjs.org/)_, _[Angular](https://angular.io/)_, _[Vue.js](https://vuejs.org/)_ and two frameworks for backend: _[Node](https://nodejs.org/en/)_, _[Flask](http://flask.pocoo.org/)_. We also provide a dependency checker to make sure you have the required version of Node and/or Python installed.
- **App pages**: Next, to accelerate app creation, we provide a number of app page templates that you can use to add common UI pages into your new app. The current page templates include: _blank page_, common layouts (*e.g., master detail) and pages that implement common patterns (*e.g., grid, list). Using the wizard, add as many of the pages as you need, providing a name for each one, and we'll generate them for you.
- **Cloud Services**: Lastly, you specify which Azure cloud services you want to use, and we'll build out the framework for the services into your app. Currently supported services cover storage (_Azure Cosmos DB_), and hosting (_Azure App Service_).

Once you make the selections you want and click generate, you can quickly extend the generated code.

## Feedback, Requests and Roadmap

Please use [GitHub issues](https://github.com/Microsoft/WebTemplateStudio/issues) for feedback, questions or comments.

If you have specific feature requests or would like to vote on what others are recommending, please go to the [GitHub issues](https://github.com/Microsoft/WebTemplateStudio/issues) section as well. We would love to hear your thoughts.

We are still extremely early in development and are looking for feedback for roadmap. Currently we are in the process of stabilizing our React, Angular and Vue.js with Node and Flask.

## Contributing

Do you want to contribute? We would love to have you help out. Here are our [contribution guidelines](CONTRIBUTING.md).

## Reporting Security Issues

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) at secure@microsoft.com. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the Security TechCenter.

## License

This code is distributed under the terms and conditions of the [MIT license](LICENSE.md).

## Privacy Statement

The extension does [log basic telemetry](docs/telemetry.md) for what is being selected. We are in the process of creating a [Telemetry Data](docs/telemetryData.md) page to summarize usage trends. Please read the [Microsoft privacy statement](http://go.microsoft.com/fwlink/?LinkId=521839) for more information.
