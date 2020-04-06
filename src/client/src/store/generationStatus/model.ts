import { WIZARD_INFO_TYPEKEYS } from "../typeKeys";
import { FormattedMessage } from "react-intl";

export interface IUpdateGenStatusMessageAction {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE;
  payload: string;
}

export interface IUpdateGenStatusAction {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS;
  payload: IServiceStatus;
}

export interface IStatus {
  success: boolean;
  failure: boolean;
}

export interface IServiceStatus {
  [key: string]: IStatus;
}

export interface IDeployStatus {
  title: FormattedMessage.MessageDescriptor;
  isSelected: boolean;
  isDeployed: boolean;
  isFailed: boolean;
}

export interface IAzureServiceStatus {
  [key: string]: IDeployStatus;
  cosmosdb: IDeployStatus;
  appService: IDeployStatus;
}
