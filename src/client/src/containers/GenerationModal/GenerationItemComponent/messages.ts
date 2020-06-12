import { defineMessages } from "react-intl";

const messages = defineMessages({ 
  showLog: {
    id: "generationItemComponent.showLog",
    defaultMessage: "Show Log"
  },
  view: {
    id: "generationItemComponent.view",
    defaultMessage: "View"
  },
  generationInProgress: {
    id: "generationItemComponent.generationInProgress",
    defaultMessage: "{name} generation in progress"
  },
  generationSuccess: {
    id: "generationItemComponent.generationSuccess",
    defaultMessage: "{name} generation Success"
  },
  generationFailed: {
    id: "generationItemComponent.generationFailed",
    defaultMessage: "{name} generation failed"
  },
});
export default messages;