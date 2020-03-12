import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";
import { azureMessages as azureModalMessages } from "../../../mockData/azureServiceOptions";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { AppState } from "../../../reducers";
import { connect } from "react-redux";
import { AppServiceContext } from "../AppServiceContext";

interface IStateProps {
  subscriptions: [any];
}

type Props = IStateProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscriptions } = props;
  const { subscription } = React.useContext(AppServiceContext);

  const isMicrosoftLearnSubscription = (): boolean => {
    const s = subscriptions.find(s => s.value === subscription.value);
    return s && s.isMicrosoftLearnSubscription;
  };

  return (
    <div className={styles.aspInfoContainer}>
      <div className={classNames(styles.selectionHeaderContainer, styles.leftHeader)}>
        {intl.formatMessage(azureModalMessages.appServicePlanLabel)}
      </div>

      <div>
        {isMicrosoftLearnSubscription()
          ? intl.formatMessage(azureModalMessages.appServiceFreeTierInfo)
          : intl.formatMessage(azureModalMessages.appServiceBasicTierInfo)}
      </div>
      <a
        className={styles.link}
        target={"_blank"}
        rel="noreferrer noopener"
        href={WEB_TEMPLATE_STUDIO_LINKS.APP_SERVICE_PLAN}
      >
        {intl.formatMessage(azureModalMessages.appServiceLearnMore)}
      </a>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  subscriptions: state.azureProfileData.profileData.subscriptions,
});

export default connect(mapStateToProps)(injectIntl(AppServicePlanInfo));
