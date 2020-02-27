import { defineMessages } from "react-intl";

const getMessages = (altMessage: string) =>{
  const messages = defineMessages({
    notificationMessage: {
      id: "notification.notificationAltMessage",
      defaultMessage: altMessage
    }
  });
  return messages;
}

export default getMessages;