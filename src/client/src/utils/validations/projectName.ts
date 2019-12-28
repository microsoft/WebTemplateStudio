import { defineMessages, Messages, FormattedMessage } from "react-intl";

export const messages:Messages = defineMessages({
  nameTooLong: {
    id: "projectNameError.nameTooLong",
    defaultMessage: `Project name can only be {maxLength} characters long`
  },
  emptyName:{
    id: "projectNameError.emptyName",
    defaultMessage: "Project name is required"
  }
});

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:FormattedMessage.MessageDescriptor;
}

export const validateProjectName = (projectName:string, validations:Object):IStateValidationProjectName => {
  let stateValidation:IStateValidationProjectName = {
    isValid:true,
    errorMessage:messages.default
  };

  if (projectName==""){
    stateValidation.isValid = false;
    stateValidation.errorMessage = messages.emptyName;
  }
  return stateValidation;
};