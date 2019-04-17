import { FormattedMessage } from "react-intl";

export interface ISelected {
  title: string;
  defaultName?: string;
  internalName: string;
  id?: string;
  isValidTitle?: boolean;
  error?: string;
  version?: string;
  licenses?: License;
  author?: string;
  originalTitle?: string;
  version?: string;
}
