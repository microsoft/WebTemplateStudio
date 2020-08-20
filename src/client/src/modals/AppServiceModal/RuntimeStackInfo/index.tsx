import * as React from "react";
import { useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import { AppState } from "../../../store/combineReducers";
import messages from "./messages";
import { getRuntimeStackSelector } from "../../../store/userSelection/app/selector";

const RuntimeStackInfo = ({ intl }: InjectedIntlProps) => {
  const { formatMessage } = intl;
  const runtimeStack = useSelector((state: AppState) => getRuntimeStackSelector(state));
  return (
    <div className={styles.container}>
      <div className={styles.title}>{formatMessage(messages.title)}</div>
      {formatMessage(messages.runtimeStack, { runtimeStack })}
    </div>
  );
};

export default injectIntl(RuntimeStackInfo);
