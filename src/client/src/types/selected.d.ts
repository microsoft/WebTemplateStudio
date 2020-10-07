import { FormattedMessage } from "react-intl";

export interface ISelected {
  title: string;
  defaultName?: string;
  internalName: string;
  id?: string;
  icon: string;
  isValidTitle?: boolean;
  error?: FormattedMessage.MessageDescriptor;
  version?: string;
  licenses?: License;
  author?: string;
  originalTitle?: string;
  version?: string;
  ref?: any;
  isDirty?: boolean = false;
  editable?: boolean = true;
}
