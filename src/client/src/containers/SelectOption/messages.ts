import { defineMessages } from "react-intl";

const messages = defineMessages({
  limitedPages: {
    id: "pages.limitedPagesMessage",
    defaultMessage: "You can select up to 20 pages"
  },
  overlimitPages: {
    id: "pages.overlimitPagesMessage",
    defaultMessage: "You cannot add more than 20 pages to the project"
  },
  noPageGeneration: {
    id: "pages.noPageGeneration",
    defaultMessage: "At least 1 page must be selected"
  },
  iconAltMessage: {
    id: "pages.maxPagesText",
    defaultMessage: "Notification"
  }
});
export default messages;