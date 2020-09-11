const AZURE_LINKS = {
  CREATE_FREE_ACCOUNT:"https://azure.microsoft.com/free/",
  CREATE_FREE_STUDENTS_ACCOUNT:"https://azure.microsoft.com/en-us/free/students/",
  CREATE_FREE_ACCOUNT_FAQ:"https://azure.microsoft.com/en-us/free/free-account-faq/",
  CREATE_NEW_SUBSCRIPTION: "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  CREATE_NEW_RESOURCE_GROUP: "https://portal.azure.com/#create/Microsoft.ResourceGroup",
  APP_SERVICE_PLAN:"https://azure.microsoft.com/en-us/pricing/details/app-service/plans/",
  VIEW_GENERATE_APP_SERVICE: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites",
  VIEW_GENERATE_MONGO_DB: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts"
};

const SERVICE_KEYS = {
  COSMOS_DB: "cosmosDB",
  APP_SERVICE: "appService"
};

enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos"
}

const AZURE = {
  COSMOS_APIS: {
    MONGO: "MongoDB",
    SQL: "SQL"
  },
  DEFAULT_LOCATION: "Central US",
  DEFAULT_RESOURCE_GROUP: ""
}

enum SERVICE_GROUPS {
  HOSTING = "CloudHosting",
  DATABASE = "CloudDatabase",
}

export {
  SERVICE_KEYS,
  AZURE,
  AZURE_LINKS,
  AzureResourceType,
  SERVICE_GROUPS
};