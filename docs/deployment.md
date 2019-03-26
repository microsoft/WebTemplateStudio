# Deployment

After implementing your business logic, we recommend deploying your website to the cloud.
Deploying your website to the cloud allows people to view your website by visiting a URL.

## Azure App Service

One way to deploy is using Azure App Service. This service will allow you to deploy and scale web, mobile and API apps.

## Getting Started with Deployment

### VS Code Extension Method (Recommended)

The Azure App Service extension provides an easy way to manage and deploy you web application. To learn how to deploy using their VS Code extension, see [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

### Local Git Deployment Method

This method will require you to have [git](https://git-scm.com/downloads) installed on your computer.

#### Creating the App Service

- Go to the [Azure Portal](https://portal.azure.com) and click on the App Services button.

  ![Portal image the button is on the left](./resources/azure-appservice-portal.png)

- Click on the Add button in the new window that appears.

  ![Portal image the add button is on the top left](./resources/azure-appservice-add.png)

- Click the _web app_ button.

  ![Portal image click webapp](./resources/azure-appservice-click-webapp.png)

- You will be presented with another screen on which you should click _create_.

  ![Portal image click create](./resources/azure-appservice-click-create.png)

- Another screen will appear in which you are required to do the following actions:

1. Enter the name of the website in the _app name_ field.
2. Select a subscription
3. Create a resource group or use an existing one.
4. Select the publish _code_ option.
5. If no _app service_ exists create an _app service_ on this screen (costs money but required if one doesn't already exist).
   1. Click on the App service button and you will be to create a new app service.
   2. If creating an _app service_ name it and select a location, and finally select the tier you want.

![Portal image create resource](./resources/azure-appservice-createresource.png)

6. Click create resource.

![Portal image create resource create button](./resources/azure-appservice-createadd.png)

- After clicking create you will get a notification, click the bell icon on the top right to view notifications. Click the go to resource button.

![Portal image go to resource](./resources/azure-appservice-notification.png)

You now have an app service resource in the cloud, where you can upload your web application.

#### Deploying the website to the App Service

To be able to deploy your web application, you will need to do the following set of commands in either _terminal_ or _git bash_. **Note: you must be in the root of your generated project's directory**.

![Root directory of generated project](./resources/azure-appservice-rootdirectory.png)

`npm install && npm build` or `yarn install && yarn build`

You should then have a build folder in the root directory. After which you should run the following command which will move the production build of your client side into the server folder, while removing the old build if any.

`rm -rf server/build && mv build/ server/`

You will then want to `git init` to make the root directory a local git repository.

Finally, run the following command to create a .deployment file with the proper parameters.

```
echo "[config]
project=server" > .deployment
```

Follow the documentation created by the Azure team for [deploying with a local git repository](https://docs.microsoft.com/en-us/azure/app-service/deploy-local-git#open-azure-cloud-shell)

Your newly deployed web app can be found at `<app name>.azurewebsites.net`
