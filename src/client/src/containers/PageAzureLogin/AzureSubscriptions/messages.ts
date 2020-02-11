import { defineMessages } from "react-intl";

const messages = defineMessages({
    editResource: {
        id: "azureSubscriptions.editResource",
        defaultMessage: "Edit Resource"
      },
      addResource: {
        id: "azureSubscriptions.addResource",
        defaultMessage: "Add to my project"
      },
      azureFunctionsLongDesc: {
        id: "azureSubscriptions.azureFunctionsLongDesc",
        defaultMessage:
          "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure. Think of it as deploying functions that executes on pre-defined triggers instead of having to write and manage a full-fledged server yourself. One of the most commonly used triggers is an HTTPTrigger which is a function that runs whenever it receives an HTTP request. This is essentially the same as an API endpoint. Web Template Studio allows you to deploy a function app with multiple 'hello world' HTTPTrigger functions (maximum of 10) so you can get to writing your business logic as soon as possible."
      },
      azureFunctionsBody: {
        id: "azureSubscriptions.azureFunctionsBody",
        defaultMessage:
          "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure."
      },
      azureCosmosLongDesc: {
        id: "azureSubscriptions.azureCosmosLongDesc",
        defaultMessage:
          "Azure Cosmos DB is Microsoft’s proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance."
      },
      azureCosmosBody: {
        id: "azureSubscriptions.azureCosmosBody",
        defaultMessage:
          "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API."
      },
      azureFunctions: {
        id: "azureSubscriptions.azureFunctions",
        defaultMessage: "Azure Functions"
      },
      cosmosResource: {
        id: "azureSubscriptions.cosmosResource",
        defaultMessage: "Cosmos Resource"
      },
      hostingTitle: {
        id: "hostingServices.title",
        defaultMessage: "Publish your project to the web"
      },
      storageTitle: {
        id: "storageServices.title",
        defaultMessage: "Store your data in the cloud"
      },
      hostingOneServiceWarning: {
        id: "hostingServices.oneServiceWarning",
        defaultMessage: "You can only add one hosting service at a time"
      }
});
export default messages;