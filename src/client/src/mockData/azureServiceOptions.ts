import { IOption } from "../types/option";
import { defineMessages } from "react-intl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

export const azureMessages = defineMessages({
  azureTitle: {
    id: "azureLogin.azureTitle",
    defaultMessage: "Microsoft Azure"
  },
  azureCardBody: {
    id: "azureLogin.azureCardBody",
    defaultMessage:
      "Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges. Sign in or create an account to get access to CosmosDB and App Service from this extension"
  },
  azureLongDescription: {
    id: "azureLogin.longDescription",
    defaultMessage:
      "Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers spread throughout the world. It offers more than a hundred services including scalable databases, container deployments, infrastructure management, serverless compute etc. These services combined with Microsoft's developer tools like Visual Studio and Visual Studio Code offer you great end-to-end tools to make you success. More information about Microsoft Azure can be found at [azure.microsoft.com](azure.microsoft.com)."
  },
  azureLoginInfo: {
    id: "azureLogin.azureLoginInfo",
    defaultMessage: "Sign in to add these services to your web app project"
  }
});

export const servicesEnum = {
  HOSTING: "CloudHosting",
  DATABASE: "CloudDatabase"
};
