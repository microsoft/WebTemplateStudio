import { defineMessages } from "react-intl";

const messages = defineMessages({
  notInstalled: {
    id: "dependencyChecker.notInstalledMessage",
    defaultMessage:
      "{dependencyName} {minimumVersion} not detected. Click to install."
  },
  iconAltMessage: {
    id: "dependencyChecker.iconAltMessage",
    defaultMessage: "Notification"
  }
});
export default messages;