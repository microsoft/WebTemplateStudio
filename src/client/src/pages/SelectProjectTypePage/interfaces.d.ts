import { IOption } from "../../types/option";

interface IStoreProps {
  options: IOption[];
}

interface IIntlProps {
  intl: InjectedIntl;
}

interface IProps {
  isModal: boolean;
}

export { IIntlProps, IStoreProps, IProps };
