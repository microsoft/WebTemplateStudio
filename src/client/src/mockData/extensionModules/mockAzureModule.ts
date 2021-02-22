import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants/commands";

import * as mockData from "./mockData/mockAzureModuleData";

const DEV_NO_ERROR_MSG = "in development, no error message";
const DEV_NO_ERROR_TYPE = "in development, no error type";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const login = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logout = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getUserStatus = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getLocations = (message: any): void => {
  setTimeout(
    () =>
      window.postMessage(
        {
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.GET_LOCATIONS,
          payload: {
            scope: message.payload && message.payload.scope ? message.payload.scope : "",
            locations: mockData.locations,
          },
        },
        "*"
      ),
    500
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getResourceGroups = (message: any): void => {
  const resourceGroups = IsMicrosoftLearnSubscription(message.subscription)
    ? mockData.sandboxResourceGroups
    : mockData.resourceGroups;

  setTimeout(
    () =>
      window.postMessage(
        {
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.GET_RESOURCE_GROUPS,
          payload: {
            scope: message.payload && message.payload.scope ? message.payload.scope : "",
            resourceGroups,
          },
        },
        "*"
      ),
    500
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getValidAppServiceName = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getValidCosmosName = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateCosmosName = (message: any): void => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateAppServiceName = (message: any): void => {
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

const IsMicrosoftLearnSubscription = (subscription: string): boolean => {
  const selectedSubscription = mockData.subscriptions.find((s) => s.name === subscription);
  return selectedSubscription !== undefined && selectedSubscription.isMicrosoftLearn;
};

export {
  login,
  logout,
  getUserStatus,
  getLocations,
  getResourceGroups,
  getValidAppServiceName,
  getValidCosmosName,
  validateCosmosName,
  validateAppServiceName,
};
