import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants";

interface IStateProps {
  subscription: any;
}

type Props = IStateProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscription } = props;
  return (
    <div className={styles.aspInfoContainer}>
      <div
        className={classNames(
          styles.selectionHeaderContainer,
          styles.leftHeader
        )}
      >
        {intl.formatMessage(azureModalMessages.appServicePlanLabel)}
      </div>

      <div>
        {subscription.isMicrosoftLearnSubscription
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
export default injectIntl(AppServicePlanInfo);
