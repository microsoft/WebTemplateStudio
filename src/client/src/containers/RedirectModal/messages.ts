import { defineMessages } from "react-intl";

const messages = defineMessages({
  beingRedirected: {
    id: "redirectModal.beingRedirected",
    defaultMessage: "You are being redirected"
  },
  thirdPartyWebsite: {
    id: "redirectModal.thirdPartyWebsite",
    defaultMessage:
      "You will be taken to {thirdPartyWebsite} which is a non-Microsoft service."
  },
  noneThirdPartyWebsite: {
    id: "redirectModal.noneThirdPartyWebsite",
    defaultMessage: "The link will take you to {noneThirdPartyWebsite}."
  },
  toContinue: {
    id: "redirectModal.toContinue",
    defaultMessage: "To continue, press ok."
  },
  privacyStatement: {
    id: "redirectModal.privacyStatement",
    defaultMessage: "Privacy Statement"
  },
  OK: {
    id: "redirectModal.OK",
    defaultMessage: "OK"
  }
});
export default messages;