import { IOption } from "../../types/option";

interface IStoreProps {
  options: IOption[];
  pageOutOfBounds: boolean;
}

interface IIntlProps {
  intl: InjectedIntl;
}

interface IProps {
  isModal: boolean;
}

export { IIntlProps, IStoreProps, IProps };
