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
    defaultMessage: "Page name may only start with letters"
  }
});

export function validateName(title: string): any {
  let isValid = true;
  let error;

  if (/^[ ]*$/.test(title)) {
    isValid = false;
    error = messages.emptyName;
  } else if (!/^[A-Za-z][A-Za-z0-9_\- ]*$/i.test(title)) {
    isValid = false;
    if (/^[_\-0-9 ]*$/i.test(title[0])) {
      error = messages.nameStartLetter;
    } else {
      error = messages.invalidRegex;
    }
  }
  return {
    isValid,
    error
  };
}
