import classNames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import modalStyles from "../../../css/modal.module.css";
import { AppState } from "../../../store/combineReducers";
import { getSubscriptionsSelector } from "../../../store/config/azure/selector";
import { AZURE_LINKS } from "../../../utils/constants/azure";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  subscription: string;
}

type Props = IProps & InjectedIntlProps;

const AppServicePlanInfo = (props: Props) => {
  const { intl, subscription } = props;
  const { formatMessage } = intl;
  const subscriptions = useSelector((state: AppState) => getSubscriptionsSelector(state));

  const isMicrosoftLearnSubscription = (): boolean => {
    const s = subscriptions.find((s) => s.name === subscription);
    return s !== undefined && s.isMicrosoftLearn;
  };

  return (
    <div className={styles.container}>
      <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
      <div className={classNames(modalStyles.subtitle, styles.subtitle)}>
        {isMicrosoftLearnSubscription()
          ? formatMessage(messages.freeTierMessage)
          : formatMessage(messages.basicTierMessage)}
      </div>
      <a target={"_blank"} rel="noreferrer noopener" href={AZURE_LINKS.APP_SERVICE_PLAN}>
        {formatMessage(messages.learnMore)}
      </a>
    </div>
  );
};

export default injectIntl(AppServicePlanInfo);
