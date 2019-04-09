import { defineMessages } from "react-intl";

const messages = defineMessages({
  duplicateName: {
    id: "pageNameError.duplicateName",
    defaultMessage: "Name has to be unique"
  },
  emptyName: {
    id: "pageNameError.emptyName",
    defaultMessage: "Name cannot be empty"
  },
  invalidRegex: {
    id: "pageNameError.invalidRegex",
    defaultMessage:
      "Name may only contain letters, numbers, spaces, dashes or underscores"
  },
  nameStartLetter: {
    id: "pageNameError.nameStartLetter",
    defaultMessage: "Name may only start with letters"
  }
});

const INVALID_PROJECT_NAME =
  "Name may only contain letters, numbers, dashes or underscores";

export function validateName(title: string, type: string): any {
  let isValid = true;
  let error;

  if (/^[ ]*$/.test(title)) {
    isValid = false;
    error = PAGE_NAME_ERROR_MESSAGES.EMPTY_NAME;
  }

  if (type === "page") {
    if (!/^[A-Za-z][A-Za-z0-9_\- ]*$/i.test(title)) {
      isValid = false;
      if (/^[_\-0-9 ]*$/i.test(title[0])) {
        error = messages.nameStartLetter;
      } else {
        error = messages.invalidRegex;;
      }
    }
  } else if (type === "project") {
    if (!/^[A-Za-z][A-Za-z0-9_\-]*$/i.test(title)) {
      isValid = false;
      if (/^[_\-0-9]*$/i.test(title[0])) {
        error = PAGE_NAME_ERROR_MESSAGES.NAME_DOES_NOT_START_WITH_LETTER;
      } else {
        error = INVALID_PROJECT_NAME;
      }
    }
  }
  return {
    isValid,
    error
  };
}
