import { FormattedMessage as FM } from "react-intl";

export interface IOption {
  title: string | FM.MessageDescriptor;
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
  unselectable?: boolean;
  isValidTitle?: boolean;
  author?: string;
}
