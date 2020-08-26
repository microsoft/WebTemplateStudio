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
  position?: number;
  svgUrl: string | undefined;
  licenses?: string[];
  selected?: boolean;
  author?: string;
  version?: string;
  linuxVersion?: string;
  latestVersion?: string="";
  latestVersionLoaded?: boolean = false;
  checkVersionPackageName?: string="";
  checkVersionPackageSource?: string="";
  unselectable?: boolean;
  isValidTitle?: boolean;
  author?: string;
  group?: string;
  expectedTime?: string | FM.MessageDescriptor;
  expectedPrice?: string | FM.MessageDescriptor;
  editable?: boolean;
}
