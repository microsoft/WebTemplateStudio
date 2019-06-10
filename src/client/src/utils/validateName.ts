import { defineMessages, FormattedMessage } from "react-intl";

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
  },
  invalidProjectName: {
    id: "projectNameError.invalidRegex",
    defaultMessage:
      "Name may only contain letters, numbers, dashes or underscores"
  },
  functionNameInvalidFirstLetter: {
    id: "FunctionNameError.invalidFunctionStartLetter",
    defaultMessage: "Name may only start with letters or numbers"
  },
  invalidFunctionName: {
    id: "FunctionNameError.invalidRegex",
    defaultMessage: "Name may only contain letters, numbers or dashes"
  }
});

export function validateName(title: string, type: string): any {
  let isValid = true;
  let error: FormattedMessage.MessageDescriptor | undefined;

  if (/^[ ]*$/.test(title)) {
    isValid = false;
    error = messages.emptyName;
  }

  if (type === "page") {
    if (!/^[A-Za-z][A-Za-z0-9_\- ]*$/i.test(title)) {
      isValid = false;
      if (/^[_\-0-9 ]*$/i.test(title[0])) {
        error = messages.nameStartLetter;
      } else {
        error = messages.invalidRegex;
      }
    }
  } else if (type === "project") {
    if (!/^[A-Za-z][A-Za-z0-9_\-]*$/i.test(title)) {
      isValid = false;
      if (/^[_\-0-9]*$/i.test(title[0])) {
        error = messages.nameStartLetter;
      } else {
        error = messages.invalidProjectName;
      }
    }
  } else if (type === "function") {
    if (!/^[A-Za-z0-9][A-Za-z0-9-]*[a-zA-Z0-9]$/.test(title)) {
      isValid = false;
      if (/^[-]$/.test(title[0])) {
        error = messages.functionNameInvalidFirstLetter;
      } else {
        error = messages.invalidFunctionName;
      }
    }
  }
  return {
    isValid,
    error
  };
}
