import * as React from "react";
import { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import Dropdown from "../../../components/Dropdown";
import modalStyles from "../../../css/modal.module.css";
import { AZURE } from "../../../utils/constants/azure";
import messages from "./messages";
import styles from "./styles.module.css";

const ApiValues: IDropDownOptionType[] = [
  {
    label: AZURE.COSMOS_APIS.MONGO,
    value: AZURE.COSMOS_APIS.MONGO,
  },
  {
    label: AZURE.COSMOS_APIS.SQL,
    value: AZURE.COSMOS_APIS.SQL,
  },
];

interface IProps {
  initialApi: string;
  onApiChange(selectedApi: string): void;
  isAdvancedMode: boolean;
}

type Props = IProps & InjectedIntlProps;

const ApiSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialApi, onApiChange, isAdvancedMode } = props;
  const [selectedApi, setSelectedApi] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const api = ApiValues.find((s) => s.value === initialApi);
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
      <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
      <div className={modalStyles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        openDropdownUpwards={!isAdvancedMode}
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={ApiValues}
        handleChange={(api) => setSelectedApi(api)}
        value={selectedApi}
      />
    </div>
  );
};

export default injectIntl(ApiSelection);
