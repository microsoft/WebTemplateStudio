import { PAGE_NAME_ERROR_MESSAGES } from "./constants";

export function validateName(title: string): boolean {
  if (/^[ ]*$/.test(title)) {
    throw new Error(PAGE_NAME_ERROR_MESSAGES.EMPTY_NAME);
  } else if (!/^[A-Za-z0-9][A-Za-z0-9 ]*$/i.test(title)) {
    if (title[0] == " ") {
      throw new Error(PAGE_NAME_ERROR_MESSAGES.NAME_STARTS_WITH_SPACE);
    } else {
      throw new Error(PAGE_NAME_ERROR_MESSAGES.INVALID_REGEX);
    }
  }
  return true;
}
