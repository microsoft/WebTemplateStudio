import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants/commands";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as mockWebData from "./mockData/mockWebPlatformData";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as mockReactNativeData from "./mockData/mockReactNativePlatformData";

//DEV:Change mock data to change platform
const mockData = mockWebData;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getProjectTypes = (message: any) : void => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PROJECT_TYPES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        projectTypes: mockData.projectTypes,
      },
    },
    "*"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getFrameworks = (message: any) : void => {
  const projectTypes = mockData.projectTypes !== undefined ?
  mockData.projectTypes :
  [];
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        frameworks: mockData.frameworks,
        isPreview: true,
        projectType: projectTypes !== undefined ? projectTypes[0].name: "",
      },
    },
    "*"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getAllLicenses = (message: any) : void => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_ALL_LICENSES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        licenses: mockData.licenses,
      },
    },
    "*"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getTemplateConfig = (message: any) : void => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_TEMPLATE_INFO,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        ...mockData.templatesInfo,
      },
    },
    "*"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getPages = (message: any) : void => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PAGES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        pages: mockData.pages(message.payload.frontendFramework),
      },
    },
    "*"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getFeatures = (message: any) : void => {
  window.postMessage(
    {
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FEATURES,
      payload: {
        scope: message.payload && message.payload.scope ? message.payload.scope : "",
        features: mockData.features,
      },
    },
    "*"
  );
};

export { getProjectTypes, getFrameworks, getAllLicenses, getTemplateConfig, getPages, getFeatures };
