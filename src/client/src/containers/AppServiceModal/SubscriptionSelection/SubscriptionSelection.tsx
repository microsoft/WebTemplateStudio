import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";
import { azureMessages as messages } from "../../../mockData/azureServiceOptions";
import Dropdown from "../../../components/Dropdown";
import { getAppServiceSelectionSelector } from "../../../selectors/appServiceSelector";
import { AppState } from "../../../reducers";
import { ISelectedAppService } from "../../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { connect } from "react-redux";

const createSubscriptionLink = "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade";

const DEFAULT_SUBSCRIPTION_VALUE = {
  value: "Select...",
  label: "Select...",
};

interface IProps {
  onSubscriptionChange(selectedSubscription: string): void;
}

interface IStateProps {
  subscriptions: [any];
  savedAppServiceSelection: ISelectedAppService | null;
}

type Props = IProps & IStateProps & InjectedIntlProps;

const SubscriptionSelection = (props: Props) => {
  const { intl, onSubscriptionChange, subscriptions, savedAppServiceSelection } = props;
  const [subscription, setSubscription] = React.useState(DEFAULT_SUBSCRIPTION_VALUE);

  React.useEffect(() => {
    if (savedAppServiceSelection) {
      const selectedSubscription = subscriptions.find(s => s.value === savedAppServiceSelection.subscription);
      setSubscription(selectedSubscription);
    }
  }, []);

  React.useEffect(() => onSubscriptionChange(subscription.value), [subscription]);

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
        handleChange={newSubscription => setSubscription(newSubscription)}
        value={subscription}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  subscriptions: state.azureProfileData.profileData.subscriptions,
  savedAppServiceSelection: getAppServiceSelectionSelector(state),
});

export default connect(mapStateToProps)(injectIntl(SubscriptionSelection));
