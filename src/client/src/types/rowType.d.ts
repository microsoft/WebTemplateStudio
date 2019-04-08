import { FormattedMessage } from "react-intl";

export interface RowType {
  type: string;
  title: string;
  svgUrl?: string;
  functionNames?: string[];
  company?: string;
  originalTitle?: string;
  serviceTitle?: FormattedMessage.MessageDescriptor;
  id?: string;
  version: string;
  internalName?: string;
  author?: string;
}
