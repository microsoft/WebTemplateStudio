import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { getDropdownSubscriptions } from "../../selectors/subscriptionSelector";
import { useState } from "react";
import { AppState } from "../../reducers";

const createSubscriptionLink = "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade";

interface IProps {
  initialSubscription: string;
  onChangeSubscription(selectedSubscription: string): void;
}

type Props = IProps & InjectedIntlProps;

const SubscriptionSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialSubscription, onChangeSubscription } = props;
  const subscriptions = useSelector((state: AppState) => getDropdownSubscriptions(state));
  const [selectedSubscription, setSelectedSubscription] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const subscription = subscriptions.find(s => s.value === initialSubscription);
    if (subscription) {
      setSelectedSubscription(subscription);
    }
  }, []);

  React.useEffect(() => {
    if (selectedSubscription) {
      onChangeSubscription(selectedSubscription.value);
    }
  }, [selectedSubscription]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
        <a className={styles.link} href={createSubscriptionLink}>
          {formatMessage(messages.newSubscriptionLink)}
        </a>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={subscriptions}
        handleChange={setSelectedSubscription}
        value={selectedSubscription}
      />
    </div>
  );
};

export default injectIntl(SubscriptionSelection);
