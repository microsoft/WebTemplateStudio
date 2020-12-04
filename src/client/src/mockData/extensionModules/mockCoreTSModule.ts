import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants/commands";

import * as mockWebData from "./mockData/mockWebPlatformData";
import * as mockReactNativeData from "./mockData/mockReactNativePlatformData";

//Change mock data to change platform
const mockData = mockReactNativeData;

const getProjectTypes = (message: any) => {
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

const getFrameworks = (message: any) => {
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

const getAllLicenses = (message: any) => {
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

const getTemplateConfig = (message: any) => {
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

const getPages = (message: any) => {
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

const getFeatures = (message: any) => {
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
