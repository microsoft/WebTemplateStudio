import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import Dropdown from "../../../components/Dropdown";
import { AZURE } from "../../../utils/constants/azure";
import messages from "./messages";

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
        openDropdownUpwards={!isAdvancedMode}      
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={ApiValues}        
        handleChange={api => setSelectedApi(api)}
        value={selectedApi}
      />
    </div>
  );
};

export default injectIntl(ApiSelection);
