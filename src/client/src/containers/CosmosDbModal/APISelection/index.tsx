import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import Dropdown from "../../../components/Dropdown";
import { COSMOS_APIS } from "../../../utils/constants";
import messages from "./messages";

const ApiValues: IDropDownOptionType[] = [
  {
    label: COSMOS_APIS.MONGO,
    value: COSMOS_APIS.MONGO,
  },
  {
    label: COSMOS_APIS.SQL,
    value: COSMOS_APIS.SQL,
  },
];

interface IProps {
  initialApi: string;
  onApiChange(selectedApi: string): void;
}

type Props = IProps & InjectedIntlProps;

const ApiSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialApi, onApiChange } = props;
  const [selectedApi, setSelectedApi] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const api = ApiValues.find(s => s.value === initialApi);
    if (api) {
      setSelectedApi(api);
    }
  }, []);

  React.useEffect(() => {
    if (selectedApi) {
      onApiChange(selectedApi.value);
    }
  }, [selectedApi]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={ApiValues}
        handleChange={setSelectedApi}
        value={selectedApi}
      />
    </div>
  );
};

export default injectIntl(ApiSelection);
