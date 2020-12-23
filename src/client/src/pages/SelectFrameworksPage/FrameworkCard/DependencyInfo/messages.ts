import { defineMessages } from "react-intl";

const messages = defineMessages({
  notInstalled: {
    id: "selectFrameworksPage.frameworkCard.dependencyInfo.notInstalledMessage",
    defaultMessage: "{name} {version} not detected. Click to install.",
  },
  iconAltMessage: {
    id: "selectFrameworksPage.frameworkCard.dependencyInfo.iconAltMessage",
    defaultMessage: "Notification",
  },
});
export default messages;
