import { defineMessages } from "react-intl";

const getMessages = (altMessage: string): ReactIntl.Messages<string> => {
  const messages = defineMessages({
    notificationMessage: {
      id: "notification.notificationAltMessage",
      defaultMessage: altMessage,
    },
  });
  return messages;
};

export default getMessages;
