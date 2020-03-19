import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { AppState } from "../../../reducers";
import { useSelector } from "react-redux";
import { getSubscriptions } from "../../../selectors/subscriptionSelector";

interface IProps {
  subscription: string;
}

type Props = IProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscription } = props;
  const { formatMessage } = intl;
  const subscriptions = useSelector((state: AppState) => getSubscriptions(state));

  const isMicrosoftLearnSubscription = (): boolean => {
    const s = subscriptions.find(s => s.name === subscription);
    return s !== undefined && s.isMicrosoftLearn;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{formatMessage(messages.title)}</div>
      <div>
        {isMicrosoftLearnSubscription()
          ? formatMessage(messages.basicTierMessage)
          : formatMessage(messages.freeTierMessage)}
      </div>
      <a
        className={styles.link}
        target={"_blank"}
        rel="noreferrer noopener"
        href={WEB_TEMPLATE_STUDIO_LINKS.APP_SERVICE_PLAN}
      >
        {formatMessage(messages.learnMore)}
      </a>
    </div>
  );
};

export default injectIntl(AppServicePlanInfo);
