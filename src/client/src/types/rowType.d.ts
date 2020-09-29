import { FormattedMessage } from "react-intl";

export interface RowType {
  title: string;
  svgUrl?: string;
  svgBase64?: string;
  company?: string;
  originalTitle?: string;
  serviceTitle?: FormattedMessage.MessageDescriptor;
  id?: string;
  version: string;
  internalName?: string;
  author?: string;
}
