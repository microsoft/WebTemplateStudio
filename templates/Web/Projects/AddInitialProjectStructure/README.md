  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).

## Getting Started

The best way to launch the application is using the [Visual Studio Code Tasks](https://code.visualstudio.com/docs/editor/tasks). In the `vscode/tasks.json` file you can find all the tasks configured for this project.

To launch a task click on the menu `Terminal > Run Task` and select the task to launch (or press `Ctrl+Shift+P` and choose the `Tasks:Run Task` command).

To run the project:

1. Install dependencies using `Install dependencies` task.
2. Start development app using `Start App` task.

## File Structure
```
.
├── .vscode/ - Visual Studio Code configuration files
├── backend/ - Backend App
├── frontend/ - Frontend App
└── README.md
```

### Frontend
To start the frontend application manually:
  1. Open a terminal and navigate to the frontend folder path.
  2. Use `yarn install` or `npm install` to install frontend dependencies.
  3. Use `yarn start` or `npm start` to start frontend app in development.

### Backend
## Deployment

If you selected Azure App Service when creating your project, follow these steps:

- [Deployment using Web Template Studio Deploy command](https://github.com/microsoft/WebTemplateStudio/blob/dev/docs/generated-apps/deployment.md)

If you did not select Azure App Service and want to create a new Azure App Service web app, follow these steps:

- [Deployment using Azure App Service extension](https://github.com/microsoft/WebTemplateStudio/blob/dev/docs/generated-apps/deployment.md)

Consider adding authentication and securing backend API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).

## Additional Documentation
- Bootstrap CSS - https://getbootstrap.com/