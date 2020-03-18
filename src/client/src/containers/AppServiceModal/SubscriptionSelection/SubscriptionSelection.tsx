import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";
import { azureMessages as messages } from "../../../mockData/azureServiceOptions";
import Dropdown from "../../../components/Dropdown";
import { AppState } from "../../../reducers";
import { connect } from "react-redux";
import { getDropdownSubscriptions } from "../../../selectors/subscriptionSelector";
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
  const { intl, subscriptions, initialSubscription, onChangeSubscription } = props;
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptions[0]);

  React.useEffect(() => {
    const subscription = subscriptions.find(s => s.value === initialSubscription);
    if (subscription) {
      setSelectedSubscription(subscription);
    }
  }, []);

  React.useEffect(() => onChangeSubscription(selectedSubscription.value), [selectedSubscription]);

  return (
    <div className={classNames([styles.selectionContainer])}>
      <div className={styles.selectionHeaderContainer}>
        <div className={styles.leftHeader}>{intl.formatMessage(messages.azureModalSubscriptionLabel)}</div>
        <a className={styles.link} href={createSubscriptionLink}>
          {intl.formatMessage(messages.azureModalCreateNew)}
        </a>
      </div>
      <div className={styles.subLabel}>{intl.formatMessage(messages.azureModalSubscriptionSubLabel)}</div>
      <Dropdown
        ariaLabel={intl.formatMessage(messages.azureModalAriaSubscriptionLabel)}
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
