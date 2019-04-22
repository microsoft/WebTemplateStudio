import { FormattedMessage } from "react-intl";
import { IFunctionName } from "../containers/AzureFunctionsSelection";

export interface RowType {
  title: string;
  svgUrl?: string;
  functionNames?: IFunctionName[];
  company?: string;
  originalTitle?: string;
  serviceTitle?: FormattedMessage.MessageDescriptor;
  id?: string;
  version: string;
  internalName?: string;
  author?: string;
}
