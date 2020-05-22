import { defineMessages } from "react-intl";

const messages = defineMessages({  
  empty: {
    id: "servicesSelector.empty",
    defaultMessage: "",
  },
  serviceGroupHostingName: {
    id: "servicesSelector.serviceGroupHostingName",
    defaultMessage: "Cloud Hosting",
  },
  serviceGroupHostingDescription: {
    id: "servicesSelector.serviceGroupHostingDescription",
    defaultMessage: "Publish your project to the web",
  },
  serviceGroupStorageName: {
    id: "servicesSelector.serviceGroupStorageName",
    defaultMessage: "Cloud Database",
  },
  serviceGroupStorageDescription: {
    id: "servicesSelector.serviceGroupStorageDescription",
    defaultMessage: "Store your data in the cloud",
  },
  appServiceExpectedPrice: {
    id: "servicesSelector.appServiceExpectedPrice",
    defaultMessage: "Free 30 Day Trial",
  },
  appServiceExpectedTime: {
    id: "servicesSelector.appServiceExpectedTime",
    defaultMessage: "3 - 5 minute set-up time",
  },
  cosmosDbExpectedPrice: {
    id: "servicesSelector.cosmosDbExpectedPrice",
    defaultMessage: "Free 30 day access to your database",
  },
  cosmosDbExpectedTime: {
    id: "servicesSelector.cosmosDbExpectedTime",
    defaultMessage: "5 - 10 minutes set-up time",
  },
});
export default messages;
