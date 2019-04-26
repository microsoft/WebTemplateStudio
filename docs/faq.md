## The purpose of this document is to provide guidance on how to make large contributions that involve more than one component.

## **FAQs**:

1. **How can I add functionality for another Azure Cloud Service like SQL Server?**

   Before you start working on a service, make sure it does not conflict with any of our contribution [guidelines](https://github.com/Microsoft/WebTemplateStudio/blob/dev/CONTRIBUTING.md). To implement the functionality of a new service in the extension, make sure you familiarize yourself with how Cosmos DB is deployed in the [AzureServices](https://github.com/Microsoft/WebTemplateStudio/blob/dev/src/extension/src/azure/azureServices.ts) class. Typically, every service will have a directory with its name (for example azure-sql) in the [azure](https://github.com/Microsoft/WebTemplateStudio/tree/dev/src/extension/src/azure) directory (assuming it is an Azure Service). The class should define functions that handle the service's deployment details. You should then define a function in AzureServices class that deals with the deployment (for example deploySQLServer). Since this function will be called on a command, it needs to implement the interface for command functions.

   ```
   public static async deploySQLServer(message: any): Promise<IPayloadResponse>
   ```

   where [message] is the message which contains the command that will call this function. Therefore, you can access the message attributes to access the received info (example: message.subscription).
   This function can utilize methods you defined in the service's directory.

   You should then define a command, on which your deploy function will get called. To add a command, go to constants.ts and add a command in ExtensionCommands. After adding a command in constants, add an entry in the AzureServices map where each entry's key is the command and each entry's value is the function. Assuming you receive the right info, your function will run everytime the extension receives the command you specified in the map.

2. **How can I add a card for another service in the wizard?**

   If you are not familiar with React-Redux. We suggest familarizing yourself with it before contributing to the wizard.
   To add a card for a service, you need to define that option in azureServiceOptions. We suggest you use the wizard a few times in the dev environment to understand the workflow of adding a service in the wizard.

   At a high level is the objects in azureServiceOptions get mapped to the Card component. The mapping takes place in AzureSubscriptions container. We recommend you add a details page to every service since our target audience includes beginner developers.
