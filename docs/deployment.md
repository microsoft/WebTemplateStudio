# Deployment

After implementing your business logic, we recommend deploying your website to the cloud.
Deploying your website to the cloud allows people to view your website by visiting a URL.

## Azure App Service

One way to deploy is using Azure App Service. This service will allow you to deploy and scale web, mobile and API apps.

## VS Code Extension Method (Recommended)

The Azure App Service Extension provides an easy way to manage and deploy your web application.

1. Download the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).
2. Open the project in Visual Studio Code, and run `yarn build` or `npm build`.
3. Move the build folder into the server folder.
4. Click the deploy button in the Azure App Service Extension.

![Azure App Service Extension Deploy Button](./resources/azure-appservice-deploy-button.png)

5. When prompted on which folder to deploy, select the server folder.
6. Click yes when prompted to update your configuration to run `npm install` on the target server.

![Azure App Service Extension Update Build Notification](./resources/azure-appservice-update-build-notification.png)

7. If you are using a Cosmos Database add the Cosmos Keys in the .env file to the Application Settings of your Azure App Service. To run the app in production mode set the variable NODE_ENV to production in your Application Settings. You can add an Application Setting by right clicking the Application Settings tab in the Azure App Service Extension.

![Azure App Service Extension Application Settings](./resources/azure-appservice-application-settings.png)

8. Consider adding authentication and securing back-end APIs by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).

## Local Git Deployment Method

This method will require you to have [git](https://git-scm.com/downloads) installed on your computer.

#### Creating the App Service through the Azure Portal

- Go to the [Azure Portal](https://portal.azure.com) and click on the _App Services_ button.

  ![Portal image the button is on the left](./resources/azure-appservice-portal.png)

- Click on the _Add_ button in the new window that appears.

  ![Portal image the add button is on the top left](./resources/azure-appservice-add.png)

- Click the _web app_ button.

  ![Portal image click webapp](./resources/azure-appservice-click-webapp.png)

- You will be presented with another screen on which you should click _create_.

  ![Portal image click create](./resources/azure-appservice-click-create.png)

- Another screen will appear in which you are required to do the following actions:

1. Enter the name of the website in the _app name_ field.
2. Select a subscription.
3. Create a resource group or use an existing one.
4. Select the publish _code_ option.
5. If no _app service_ exists create an _app service_ on this screen (costs money but required if one doesn't already exist).
   1. Click on the _App service_ button and you will be to create a new app service.
   2. If creating an _app service_ name it and select a location, and finally select the tier you want.

![Portal image create resource](./resources/azure-appservice-createresource.png)

6. Click create resource.

![Portal image create resource create button](./resources/azure-appservice-createadd.png)

- After clicking create you will get a notification. Click the bell icon on the top right to view notifications, then click the _go to resource_ button.

![Portal image go to resource](./resources/azure-appservice-notification.png)

You now have an app service resource in the cloud, where you can upload your web application.

#### Deploying the website to the App Service

To be able to deploy your web application, you will need to do the following set of commands in either _terminal_ or _git bash_. **Note: you must be in the root of your generated project's directory**.

![Root directory of generated project](./resources/azure-appservice-rootdirectory.png)

`npm install && npm build` or `yarn install && yarn build`

You should then have a build folder in the root directory. Run the following command to move the production build of your client side into the server folder. Doing so will remove any prior builds.

`rm -rf server/build && mv build/ server/`

You will then want to `git init` to make the root directory a local git repository.

Finally, run the following command to create a .deployment file with the proper parameters.

```
echo "[config]
project=server" > .deployment
```

Follow the documentation created by the Azure team for [deploying with a local git repository](https://docs.microsoft.com/en-us/azure/app-service/deploy-local-git#open-azure-cloud-shell)

Your newly deployed web app can be found at `<app name>.azurewebsites.net`
