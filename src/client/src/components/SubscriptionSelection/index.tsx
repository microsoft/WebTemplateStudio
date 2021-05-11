import * as React from "react";
import { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import modalStyles from "../../css/modal.module.css";
import { AppState } from "../../store/combineReducers";
import { getDropdownSubscriptionsSelector } from "../../store/config/azure/selector";
import { AZURE_LINKS } from "../../utils/constants/azure";
import Dropdown from "../Dropdown";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  initialSubscription: string;
  onSubscriptionChange(selectedSubscription: string): void;
}

type Props = IProps & InjectedIntlProps;

const SubscriptionSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialSubscription, onSubscriptionChange } = props;
  const subscriptions = useSelector((state: AppState) => getDropdownSubscriptionsSelector(state));
  const [selectedSubscription, setSelectedSubscription] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const subscription = subscriptions.find((s) => s.value === initialSubscription);
    if (subscription) {
      setSelectedSubscription(subscription);
    }
  }, []);

  React.useEffect(() => {
    if (selectedSubscription) {
      onSubscriptionChange(selectedSubscription.value);
    }
  }, [selectedSubscription]);

  return (
    <div className={styles.container}>
      <div className={modalStyles.header}>
        <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
        <a href={AZURE_LINKS.CREATE_NEW_SUBSCRIPTION}>{formatMessage(messages.newSubscriptionLink)}</a>
      </div>
      <div className={modalStyles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={subscriptions}
        handleChange={(subscription) => setSelectedSubscription(subscription)}
        value={selectedSubscription}
      />
    </div>
  );
};

export default injectIntl(SubscriptionSelection);
