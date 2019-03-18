# Azure Cosmos DB

Azure Cosmos DB is Microsoft’s proprietary globally-distributed, multi-model database service for managing data on a
global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin
(GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself
and select an initial location to deploy your database to with ability to scale it to multiple locations later. As an
added feature, deploying with MongoDB API enables you to quickly connect your project generated with Web Template Studio
to your database instance.

## Getting started

To deploy Cosmos DB using Web Template Studio:

![azure-cosmos-modal](../resources/azure-cosmos-modal.png)

- Click _Add Resource_ on Cosmos DB under _services_ tab

- Select a subscription and resource group from the _Create Cosmos DB Account_ tab that just opened. Use _Create New_
  option if you want to create a new subscription or resource group. _**Note:**_ New subscription would take you to Azure
  portal to create a subscription.

- Enter a name for your cosmos account. This name is globally unique since your database will be available as
  `<cosmos_account_name>.documents.azure.com` after.

- Select a location where your Cosmos DB instance will be deployed initially. You can scale it to multiple locations
  through the azure portal after!

- Select an API for your database (Mongo/Core (SQL)/Azure Table/Cassandra/Gremlin (GraphQL) etc).

Once you hit generate in summary page, Web Template Studio will deploy your database and show you a popup with your
database connection string once it's available (usually within 5-6 minutes). This would prompt you to replace the
connection string in your _.env_ file with the new connection string. _**Note:**_ For advanced users, the _arm templates_
used to deploy your application are also available under _arm-templates_ directory (under your generated project).

## How this works

Web Template Studio uses an arm-template for Cosmos (generated under _arm-templates_ directory) to deploy
your Cosmos DB instance. This template contains the definitions and parameters for all resources and storage
accounts that need to be created for your database. Once Azure receives your template, it takes about 5-6 minutes to
assign VMs for your database account, get them up and running with your selected API and have the database connection
string available for you to connect to your database.

Once the connection string is available, Web Template Studio will prompt you to replace the variables in your _.env_ file
with this string and your keys. _**Warning:**_ Accepting this prompt will override your current _.env_ so if you made any
changes to this file, consider saving them! You will also need to restart your server to sync changes to your _.env_ file!

## Cosmos DB in Azure Portal

![azure-cosmos-portal](../resources/azure-cosmos-portal.png)

You can access and modify your database instance through [azure portal](https://portal.azure.com). Once you login to
the portal, select Azure Cosmos DB from the menu bar on the left side of the portal. This would list different database
accounts owned by you under different resource groups. Select the account you want to edit and it will bring up a menu
(_Settings_ in the image above) to configure your account. This can be anything from scaling your database to adding new
collections to setting up firewalls to viewing metrics for your deployment etc.

## VSCode Extension for Azure Cosmos DB

![azure-cosmos-extension](../resources/azure-cosmos-extension.png)

If you would like to manage your Cosmos DB environment from VSCode itself, we recommend you install the
[Azure Cosmos](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension for VSCode.
Select Azure from the activity bar. From the Cosmos menu, you can create a new database account (as shown in the pic
above) or attach a previously created database account. From here, you can create/view/edit/delete accounts, collections
and documents etc. or execute commands (such as SQL or mongo shell commands). Read the extension [documentation](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
for full features and usage!
