import { PAGE_NAME_ERROR_MESSAGES } from "./constants";

export function validateName(title: string): any {
  let isValid = true;
  let error = "";

  if (/^[ ]*$/.test(title)) {
    isValid = false;
    error = PAGE_NAME_ERROR_MESSAGES.EMPTY_NAME;
  } else if (!/^[A-Za-z][A-Za-z0-9_\- ]*$/i.test(title)) {
    isValid = false;
    if (title[0] == " ") {
      error = PAGE_NAME_ERROR_MESSAGES.NAME_STARTS_WITH_SPACE;
    } else {
      error = PAGE_NAME_ERROR_MESSAGES.INVALID_REGEX;
    }
  }
  return {
    isValid,
    error
  };
}
