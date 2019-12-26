# Azure App Service

Azure App Service is an HTTP-based service for hosting web applications, REST APIs, and mobile back ends. You can develop in your favorite language, be it .NET, .NET Core, Java, Ruby, Node.js, PHP, or Python. Applications run and scale with ease on both Windows and Linux-based environments. For more info about Azure App Service click [here](https://docs.microsoft.com/azure/app-service/overview).

Web Template Studio offers you the functionality to create and deploy your application to Azure App Service from the wizard quickly and easly.

## Getting started

To deploy an Azure App Service using Web Template Studio:

- Navigate to Add Optional Cloud Services step. Click Add to my project button in App Service card.

![azure-appservice-card](../../resources/azure-appservice-card.png)

- Select a _Subscription_ from the _Create App Service_ tab that just opened. Use _Create New_
  option if you want to create a new _Subscription_ _**Note:**\_ New subscription will take you to Azure portal to create a subscription.

- Enter a _Name_ for your azure web app. Enter a unique app name that includes only the valid characters are a-z, A-Z, 0-9, and -. You can accept the automatically generated unique name. The URL of the web app is `http://<app_name>.azurewebsites.net`, where `<app_name>` is your app name.

_**Note:**_ by default, Web Template Studio create a Resource Group with the same name that the web app. It will also create the free BASIC App Service Plan that host the web app. [More info for App Service Plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/).

![azure-appservice-card](../../resources/azure-appservice-createappservice.png)

Once you hit generate on the summary page, Web Template Studio will create and deploy an empty web application into your Azure subscription that will be accessible from `http://<app_name>.azurewebsites.net`.

Web Template Studio uses an arm-template for Azure App Services (generated under the arm-templates directory) to create and deploy empty web app. This template contains the definitions and parameters for all resources that need to deploy. Once Azure receives your template, it takes about 5-6 minutes to host and deploy a empty web app.

_**Note:**_ For advanced users, the _arm templates_
used to deploy your application are also available under the _arm-templates_ directory (in your generated project).

## How to deploy

When we create a Azure App Service, Web Template Studio deploy an empty web app. To learn how to deploy your new application in the created Azure App Service, read the [Web Template Studio deployment documentation](../../deployment.md).
