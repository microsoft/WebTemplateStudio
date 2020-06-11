import { FormattedMessage } from "react-intl";

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

export enum GenerationItemStatus {
  Stopped = "Stopped",
  Generating = "Generating",
  Failed = "Failed",
  Success = "Success"
}

export interface GenerationItem {
  name: string;
  title: string;
  status: GenerationItemStatus;
  link?: string;
}