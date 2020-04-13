import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";

import * as mockData from "./mockAzureModuleData";

const DEV_NO_ERROR_MSG = "in development, no error message";
const DEV_NO_ERROR_TYPE = "in development, no error type";

const login = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGIN,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        email: "devEnvironment2@email.com",
        subscriptions: mockData.subscriptions,
      },
    },
    "*"
  );
};

const logout = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGOUT,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        success: true,
      },
    },
    "*"
  );
};

const getUserStatus = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.GET_USER_STATUS,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        email: "devEnvironment2@email.com",
        subscriptions: mockData.subscriptions,
      },
    },
    "*"
  );
};

const getSubscriptionDataForCosmos = (message: any) => {  
  setTimeout(() =>
   window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_COSMOS,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        locations: mockData.locations,
        resourceGroups: mockData.resourceGroups,
      },
    },
    "*"
  ), 1000);
};

const getSubscriptionDataForAppService = (message: any) => {
  setTimeout(() =>
  window.postMessage(
   {
    module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_APP_SERVICE,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        locations: mockData.locations,
        resourceGroups: mockData.resourceGroups,
     },
   },
   "*"
 ), 1000);
};

const getValidAppServiceName = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        validName: mockData.appServiceName,
      },
    },
    "*"
  );
};

const getValidCosmosName = (message: any) => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        validName: mockData.cosmosDBName,
      },
    },
    "*"
  );
};

const validateCosmosName = (message: any) => {
  const isValid = message.appName.length > 3 && !message.appName.includes(" ");
  const errorMessage = isValid ? "" : "Invalid name";

  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        isValid,
        errorMessage,
      },
      message: DEV_NO_ERROR_MSG,
      errorType: DEV_NO_ERROR_TYPE,
    },
    "*"
  );
};

const validateAppServiceName = (message: any) => {
  const isValid = message.appName.length > 3 && !message.appName.includes(" ");
  const errorMessage = isValid ? "" : "Invalid name";
  window.postMessage(
    {
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        isValid,
        errorMessage,
      },
      message: DEV_NO_ERROR_MSG,
      errorType: DEV_NO_ERROR_TYPE,
    },
    "*"
  );
};

export {
  login,
  logout,
  getUserStatus,
  getSubscriptionDataForCosmos,
  getSubscriptionDataForAppService,
  getValidAppServiceName,
  getValidCosmosName,
  validateCosmosName,
  validateAppServiceName,
};
