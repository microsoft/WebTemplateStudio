import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import modalStyles from "../../../css/modal.module.css";
import { AppState } from "../../../store/combineReducers";
import { getRuntimeStackSelector } from "../../../store/userSelection/app/selector";
import messages from "./messages";
import styles from "./styles.module.css";

const RuntimeStackInfo = ({ intl }: InjectedIntlProps) => {
  const { formatMessage } = intl;
  const runtimeStack = useSelector((state: AppState) => getRuntimeStackSelector(state));
  return (
    <div className={styles.container}>
      <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
      <div className={modalStyles.subtitle}>{formatMessage(messages.runtimeStack, { runtimeStack })}</div>
    </div>
  );
};

export default injectIntl(RuntimeStackInfo);
