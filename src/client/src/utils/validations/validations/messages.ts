
import { defineMessages } from "react-intl";

export const validationMessages = defineMessages({
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
  default:{
    id: "default",
    defaultMessage: "default"
  }
});