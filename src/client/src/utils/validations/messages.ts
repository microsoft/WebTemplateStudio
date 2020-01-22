
import { defineMessages } from "react-intl";

export const validationMessages = defineMessages({
  default:{
    id: "default",
    defaultMessage: "default"
  },
  emptyName: {
    id: "validations.common.emptyName",
    defaultMessage: "Name cannot be empty"
  },
  duplicateItemName: {
    id: "validations.name.duplicateName",
    defaultMessage: "Name has to be unique"
  },
  duplicateProjectName: {
    id: "validations.project.duplicateName",
    defaultMessage: "Directory already exists in the specified path. Please choose a unique name."
  },
  reservedName: {
    id: "validations.common.reservedName",
    defaultMessage: "Name is reserved"
  },
  nameStartLetter: {
    id: "validations.common.nameStartLetter",
    defaultMessage: "Name may only start with letters"
  },
  nameContainLettersNumbersDashes: {
    id: "validations.name.nameContainLettersNumbersDashes",
    defaultMessage: "Name may only contain letters, numbers or dashes"
  }
});