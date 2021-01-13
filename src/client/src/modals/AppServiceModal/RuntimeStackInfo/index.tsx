import * as React from "react";
import { useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import modalStyles from "../../../css/modal.module.css";
import styles from "./styles.module.css";
import messages from "./messages";

import { AppState } from "../../../store/combineReducers";
import { getRuntimeStackSelector } from "../../../store/userSelection/app/selector";

const RuntimeStackInfo = ({ intl }: InjectedIntlProps) => {
  const { formatMessage } = intl;
  const runtimeStack = useSelector((state: AppState) => getRuntimeStackSelector(state));
  return (
    <div className={styles.container}>
      <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
      {formatMessage(messages.runtimeStack, { runtimeStack })}
    </div>
  );
};

export default injectIntl(RuntimeStackInfo);
