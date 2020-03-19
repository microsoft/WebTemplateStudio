import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import { AppState } from "../../reducers";
import { connect } from "react-redux";
import { getDropdownSubscriptions } from "../../selectors/subscriptionSelector";
import { useState } from "react";

const createSubscriptionLink = "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade";

interface IProps {
  initialSubscription: string;
  onChangeSubscription(selectedSubscription: string): void;
}

interface IStateProps {
  subscriptions: IDropDownOptionType[];
}

type Props = IProps & IStateProps & InjectedIntlProps;

const SubscriptionSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { subscriptions, initialSubscription, onChangeSubscription } = props;
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

const mapStateToProps = (state: AppState): IStateProps => ({
  subscriptions: getDropdownSubscriptions(state),
});

export default connect(mapStateToProps)(injectIntl(SubscriptionSelection));
