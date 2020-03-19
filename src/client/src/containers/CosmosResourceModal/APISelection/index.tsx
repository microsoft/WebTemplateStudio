import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import Dropdown from "../../../components/Dropdown";
import { COSMOS_APIS } from "../../../utils/constants";
import messages from "./messages";
"./node_modules/react";

const APIValues: IDropDownOptionType[] = [
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
  initialAPI: string;
  onAPIChange(selectedAPI: string): void;
}

type Props = IProps & InjectedIntlProps;

const APISelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialAPI, onAPIChange } = props;
  const [selectedAPI, setSelectedAPI] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const api = APIValues.find(s => s.value === initialAPI);
    if (api) {
      setSelectedAPI(api);
    }
  }, []);

  React.useEffect(() => {
    if (selectedAPI) {
      onAPIChange(selectedAPI.value);
    }
  }, [selectedAPI]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={APIValues}
        handleChange={setSelectedAPI}
        value={selectedAPI}
      />
    </div>
  );
};

export default injectIntl(APISelection);
