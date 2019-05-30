import { IOption } from "../types/option";
import { defineMessages } from "react-intl";
import getSvgUrl from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

export const messages = defineMessages({
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
    defaultMessage: "Attach services to your web application (Optional)"
  },
  azureFunctionsTitle: {
    id: "azureFunctions.Title",
    defaultMessage: "Azure Functions"
  },
  azureFunctionsLongDescription: {
    id: "azureFunctions.longDescription",
    defaultMessage:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure. Think of it as deploying functions that executes on pre-defined triggers instead of having to write and manage a full-fledged server yourself. One of the most commonly used triggers is an HTTPTrigger which is a function that runs whenever it receives an HTTP request. This is essentially the same as an API endpoint. Web Template Studio allows you to deploy a function app with multiple 'hello world' HTTPTrigger functions (maximum of 10) so you can get to writing your business logic as soon as possible."
  },
  azureFunctionsCardBody: {
    id: "azureFunctions.cardBody",
    defaultMessage:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure."
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
      "Cosmos DB allows you to build and scale your application with a globally distributed, multi-model database service."
  }
});

const azureServiceOptions: IOption[] = [
  {
    author: "Microsoft",
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS),
    title: messages.azureFunctionsTitle,
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS,
    longDescription: messages.azureFunctionsLongDescription,
    body: messages.azureFunctionsCardBody
  },
  {
    author: "Microsoft",
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB),
    title: messages.cosmosTitle,
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    longDescription: messages.cosmosLongDescription,
    body: messages.cosmosCardBody
  }
];

export const microsoftAzureDetails: IOption = {
  author: "Microsoft",
  svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.AZURE),
  title: messages.azureTitle,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE,
  longDescription: messages.azureLongDescription,
  body: messages.azureCardBody
};

export default azureServiceOptions;
