import { FormattedMessage as FM } from "react-intl";

export interface IOption {
  title: string | FM.MessageDescriptor;
  templateGroupIdentity?: string;
  isPreview?: boolean;
  type?: string;
  internalName: string;
  defaultName?: string;
  body: string | FM.MessageDescriptor;
  longDescription?: string | FM.MessageDescriptor;
  order?: number;
  icon: string;
  licenses?: string[];
  selected?: boolean;
  author?: string;
  version?: string;
  linuxVersion?: string;
  latestVersion?: string = "";
  latestVersionLoaded?: boolean = false;
  checkVersionPackage?: IVersionPackage;
  requirement?: IRequirement;
  unselectable?: boolean;
  isValidTitle?: boolean;
  author?: string;
  group?: string;
  expectedTime?: string | FM.MessageDescriptor;
  expectedPrice?: string | FM.MessageDescriptor;
  editable?: boolean;
}

export interface IVersionPackage {
  source: string;
  name: string;
}

export interface IRequirement {
  name: string;
  version: string;
  isInstalled: boolean;
}
