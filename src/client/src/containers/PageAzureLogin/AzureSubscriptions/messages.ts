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