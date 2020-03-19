import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { AppState } from "../../../reducers";
import { connect } from "react-redux";
import { getSubscriptions } from "../../../selectors/subscriptionSelector";

interface IProps {
  subscription: string;
}

interface IStateProps {
  subscriptions: Subscription[];
}

type Props = IProps & IStateProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscription, subscriptions } = props;

  const isMicrosoftLearnSubscription = (): boolean => {
    const s = subscriptions.find(s => s.name === subscription);
    return s !== undefined && s.isMicrosoftLearn;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {intl.formatMessage(messages.title)}
      </div>
      <div>
        {isMicrosoftLearnSubscription()
          ? intl.formatMessage(messages.basicTierMessage)
          : intl.formatMessage(messages.freeTierMessage)}
      </div>
      <a
        className={styles.link}
        target={"_blank"}
        rel="noreferrer noopener"
        href={WEB_TEMPLATE_STUDIO_LINKS.APP_SERVICE_PLAN}
      >
        {intl.formatMessage(messages.learnMore)}
      </a>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  subscriptions: getSubscriptions(state),
});

export default connect(mapStateToProps)(injectIntl(AppServicePlanInfo));
