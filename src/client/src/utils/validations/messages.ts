
import { defineMessages } from "react-intl";

export const validationMessages = defineMessages({
  default:{
    id: "default",
    defaultMessage: "default"
  },
  emptyName: {
    id: "validations.comun.emptyName",
    defaultMessage: "Name cannot be empty"
  },
  duplicateName: {
    id: "validations.comun.duplicateName",
    defaultMessage: "Name has to be unique"
  },
  reservedName: {
    id: "validations.comun.duplicateName",
    defaultMessage: "Name is reserved"
  },
  nameStartWith$:{
    id: "validations.comun.nameStartWith$",
    defaultMessage: "Name cannot begin with $"
  },
  nameStartLetter: {
    id: "validations.comun.nameStartLetter",
    defaultMessage: "Name may only start with letters"
  },
  nameContainLettersNumbersDashes: {
    id: "validations.name.nameContainLettersNumbersDashes",
    defaultMessage: "Name may only contain letters, numbers or dashes"
  }
});