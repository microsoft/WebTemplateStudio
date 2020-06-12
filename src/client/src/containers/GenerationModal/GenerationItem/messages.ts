import { defineMessages } from "react-intl";

const messages = defineMessages({ 
  showLog: {
    id: "generationItem.showLog",
    defaultMessage: "Show Log"
  },
  view: {
    id: "generationItem.view",
    defaultMessage: "View"
  },
  generationInProgress: {
    id: "generationItem.generationInProgress",
    defaultMessage: "{name} generation in progress"
  },
  generationSuccess: {
    id: "generationItem.generationSuccess",
    defaultMessage: "{name} generation Success"
  },
  generationFailed: {
    id: "generationItem.generationFailed",
    defaultMessage: "{name} generation failed"
  },
});
export default messages;