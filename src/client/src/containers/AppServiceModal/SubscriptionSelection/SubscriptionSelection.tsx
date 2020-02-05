import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";
import { azureMessages as messages } from "../../../mockData/azureServiceOptions";
import Dropdown from "../../../components/Dropdown";
import { IAppServiceState } from "..";
import { AppState } from "../../../reducers";
import { connect } from "react-redux";

const createSubscriptionLink =
  "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade";

const DEFAULT_VALUE = {
  value: "Select...",
  label: "Select..."
};

interface IProps {
  selectedSubscription: IDropDownSubscriptionOptionType;
  appServiceFormData: IAppServiceState;
  onSubscriptionChange(
    formSectionId: string,
    option: IDropDownSubscriptionOptionType
  ): void;
}

interface IStateProps {
  subscriptions: [];
}

type Props = IProps & IStateProps & InjectedIntlProps;

const SubscriptionSelection = (props: Props) => {
  const {
    intl,
    onSubscriptionChange,
    selectedSubscription,
    subscriptions
  } = props;

  return (
    <div className={classNames([styles.selectionContainer])}>
      <div className={styles.selectionHeaderContainer}>
        <div className={styles.leftHeader}>
          {intl.formatMessage(messages.azureModalSubscriptionLabel)}
        </div>
        <a className={styles.link} href={createSubscriptionLink}>
          {intl.formatMessage(messages.azureModalCreateNew)}
        </a>
      </div>
      <div className={styles.subLabel}>
        {intl.formatMessage(messages.azureModalSubscriptionSubLabel)}
      </div>
      <Dropdown
        ariaLabel={intl.formatMessage(messages.azureModalAriaSubscriptionLabel)}
        options={subscriptions}
        handleChange={option => {
          onSubscriptionChange("subscription", option);
        }}
        value={
          selectedSubscription.value
            ? selectedSubscription
            : DEFAULT_VALUE
        }
      />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  subscriptions: state.azureProfileData.profileData.subscriptions
});

export default connect(mapStateToProps)(injectIntl(SubscriptionSelection));
