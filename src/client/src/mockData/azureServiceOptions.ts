import { IOption } from "../types/option";
import { defineMessages } from "react-intl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

export const azureMessages = defineMessages({
  azureTitle: {
    id: "azureLogin.azureTitle",
    defaultMessage: "Microsoft Azure"
  },
  azureCardBody: {
    id: "azureLogin.azureCardBody",
    defaultMessage:
      "Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges. Sign in or create an account to get access to CosmosDB and App Service from this extension"
  },
  azureLongDescription: {
    id: "azureLogin.longDescription",
    defaultMessage:
      "Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers spread throughout the world. It offers more than a hundred services including scalable databases, container deployments, infrastructure management, serverless compute etc. These services combined with Microsoft's developer tools like Visual Studio and Visual Studio Code offer you great end-to-end tools to make you success. More information about Microsoft Azure can be found at [azure.microsoft.com](azure.microsoft.com)."
  },
  azureLoginInfo: {
    id: "azureLogin.azureLoginInfo",
    defaultMessage: "Sign in to add these services to your web app project"
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
  appServicePriceExpectation: {
    id: "appService.priceExpectation",
    defaultMessage: "Free 30 Day Trial"
  },
  appServiceTimeExpectation: {
    id: "appService.timeExpectation",
    defaultMessage: "3 - 5 minute set-up time"
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
    svgUrl: "",
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
    svgUrl: "",
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
  svgUrl: "",
  title: azureMessages.azureTitle,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE,
  longDescription: azureMessages.azureLongDescription,
  body: azureMessages.azureCardBody
};

export default azureServiceOptions;
