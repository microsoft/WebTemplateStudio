import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";
import { azureMessages as azureModalMessages } from "../../../mockData/azureServiceOptions";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { AppState } from "../../../reducers";
import { connect } from "react-redux";
import { AppServiceContext } from "../AppServiceContext";
import { getSubscriptions } from "../../../selectors/subscriptionSelector";

interface IStateProps {
  subscriptions: Subscription[];
}

type Props = IStateProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscriptions } = props;
  const { subscription } = React.useContext(AppServiceContext);

  const isMicrosoftLearnSubscription = (): boolean => {
    const s = subscriptions.find(s => s.name === subscription.value);
    return s !== undefined && s.isMicrosoftLearn;
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
  subscriptions: getSubscriptions(state),
});

export default connect(mapStateToProps)(injectIntl(AppServicePlanInfo));
