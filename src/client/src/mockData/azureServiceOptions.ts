import { IOption } from "../types/option";
import { defineMessages } from "react-intl";
import getSvgUrl from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

export const azureMessages = defineMessages({
  azureSkipButton: {
    id: "azureSkip.buttonTitle",
    defaultMessage:
      "This step is optional, click here to skip and create your project."
  },
  azureTitle: {
    id: "azureLogin.azureTitle",
    defaultMessage: "Microsoft Azure"
  },
  azureCardBody: {
    id: "azureLogin.azureCardBody",
    defaultMessage:
      "Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges. Sign in or create an account to get access to CosmosDB and Azure Functions from this extension"
  },
  azureLongDescription: {
    id: "azureLogin.longDescription",
    defaultMessage:
      "Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers spread throughout the world. It offers more than a hundred services including scalable databases, container deployments, infrastructure management, serverless compute etc. These services combined with Microsoft's developer tools like Visual Studio and Visual Studio Code offer you great end-to-end tools to make you success. More information about Microsoft Azure can be found at [azure.microsoft.com](azure.microsoft.com)."
  },
  azureLoginTitle: {
    id: "azureLogin.azureLoginTitle",
    defaultMessage: "Add Azure Cloud Services to Your Project"
  },
  azureLoginInfo: {
    id: "azureLogin.azureLoginInfo",
    defaultMessage: "Sign in to add these services to your web app project"
  },
  azureFunctionsTitle: {
    id: "azureFunctions.Title",
    defaultMessage: "Azure Functions"
  },
  azureFunctionsLongDescription: {
    id: "azureFunctions.longDescription",
    defaultMessage:
      "Deploy serverless web applications using an event-driven platform."
  },
  azureFunctionsCardBody: {
    id: "azureFunctions.cardBody",
    defaultMessage:
      "Deploy serverless web applications using an event-driven platform."
  },
  cosmosTitle: {
    id: "cosmosDb.title",
    defaultMessage: "Cosmos DB"
  },
  cosmosLongDescription: {
    id: "cosmosDb.longDescription",
    defaultMessage:
      "Azure Cosmos DB is Microsoft’s proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance."
  },
  cosmosCardBody: {
    id: "cosmosDb.cardBody",
    defaultMessage:
      "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API."
  },
  cosmosTimeExpectation: {
    id: "cosmosDb.timeExpectation",
    defaultMessage: "5 - 10 minutes set-up time"
  },
  cosmosPriceExpectation: {
    id: "cosmosDb.priceExpectation",
    defaultMessage: "Free 30 day access to your databse"
  },
  azureModalChooseExisting: {
    id: "azureModal.chooseExisting",
    defaultMessage: "Choose existing"
  },
  azureModalCreateNewResourceGroupDisplayMessage: {
    id: "azureModal.createNewResourceGroupDisplayMessage",
    defaultMessage: "Create a new resource group"
  },
  azureModalCreateNewResourceGroupSelectedDisplayMessage: {
    id: "azureModal.createNewResourceGroupSelectedDisplayMessage",
    defaultMessage:
      "We will automatically create a resource group for you in Central US to manage all related resources to this project!"
  },
  azureModalSubscriptionLabel: {
    id: "azureModal.subscriptionLabel",
    defaultMessage: "Subscription"
  },
  azureModalAriaSubscriptionLabel: {
    id: "azureModal.ariaSubscriptionLabel",
    defaultMessage: "Subscription Drop Down"
  },
  azureModalResourceGroupLabel: {
    id: "azureModal.resourceGroupLabel",
    defaultMessage: "Resource Group"
  },
  azureModalAriaResourceGroupLabel: {
    id: "azureModal.ariaResourceGroupLabel",
    defaultMessage: "Resource Group Drop Down"
  },
  azureModalLocationLabel: {
    id: "azureModal.locationLabel",
    defaultMessage: "Location"
  },
  azureModalAriaLocationLabel: {
    id: "azureModal.ariaLocationLabel",
    defaultMessage: "Location Drop Down"
  },
  azureModalCreateNew: {
    id: "azureModal.createNew",
    defaultMessage: "Create New"
  },
  azureModalSubscriptionSubLabel: {
    id: "azureModal.subscriptionSubLabel",
    defaultMessage: "Choose a subscription to manage your billing preferences"
  },
  azureModalResourceGroupSubLabel: {
    id: "azureModal.resourceGroupSubLabel",
    defaultMessage:
      "A resource group is a container that holds related resources for an Azure solution"
  },
  appServiceModalTitle: {
    id: "appService.modalTitle",
    defaultMessage: "Create App Service"
  },
  appServiceTitle: {
    id: "appService.title",
    defaultMessage: "App Service"
  },
  appServiceLongDescription: {
    id: "appService.longDescription",
    defaultMessage:
      "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks."
  },
  appServiceCardBody: {
    id: "appService.cardBody",
    defaultMessage:
      "Quickly build, deploy, and scale your web apps with confidence."
  },
  runtimeStackLabel: {
    id: "azureFunctionsModal.runtimeStackLabel",
    defaultMessage: "Runtime Stack"
  },
  runtimeStackSubLabel: {
    id: "azureFunctionsModal.runtimeStackSubLabel",
    defaultMessage: "Your runtime stack is {runtimeStack}"
  },
  appServiceInfo: {
    id: "appService.appServiceInfo",
    defaultMessage:
      "A free BASIC tier 30 day trial app service plan will be created for you."
  },
  appServiceLearnMore: {
    id: "appService.learnMore",
    defaultMessage: "Learn More"
  },
  appServicePriceExpectation: {
    id: "appService.priceExpectation",
    defaultMessage: "Free 30 Day Trial"
  },
  appServiceTimeExpectation: {
    id: "appService.timeExpectation",
    defaultMessage: "3 - 5 minute set-up time"
  },
  appServiceAppNameLabel: {
    id: "appService.appNameLabel",
    defaultMessage: "Web App Name"
  },
  appServiceAriaAppNameLabel: {
    id: "appService.ariaAppNameLabel",
    defaultMessage: "Web App Name Dropdown"
  },
  appServiceAppNameSubLabel: {
    id: "appService.appNameSubLabel",
    defaultMessage: "We have created a unique web app name that you can edit"
  },
  azureModalSave: {
    id: "azureModal.save",
    defaultMessage: "Save"
  },
  appServicePlanLabel: {
    id: "azureModal.appServicePlanLabel",
    defaultMessage: "App Service Plan"
  }
});

export const servicesEnum = {
  HOSTING: "Cloud Hosting",
  DATABASE: "Cloud Database"
};

const azureServiceOptions: IOption[] = [
  {
    author: "Microsoft",
    type: servicesEnum.HOSTING,
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE),
    isPreview: false,
    title: azureMessages.appServiceTitle,
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE,
    longDescription: azureMessages.appServiceLongDescription,
    body: azureMessages.appServiceCardBody,
    expectedPrice: azureMessages.appServicePriceExpectation,
    expectedTime: azureMessages.appServiceTimeExpectation
  },
  {
    author: "Microsoft",
    type: servicesEnum.DATABASE,
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB),
    isPreview: false,
    title: azureMessages.cosmosTitle,
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    longDescription: azureMessages.cosmosLongDescription,
    body: azureMessages.cosmosCardBody,
    expectedPrice: azureMessages.cosmosPriceExpectation,
    expectedTime: azureMessages.cosmosTimeExpectation
  }
];

export const microsoftAzureDetails: IOption = {
  author: "Microsoft",
  svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.AZURE),
  title: azureMessages.azureTitle,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE,
  longDescription: azureMessages.azureLongDescription,
  body: azureMessages.azureCardBody
};

export default azureServiceOptions;
