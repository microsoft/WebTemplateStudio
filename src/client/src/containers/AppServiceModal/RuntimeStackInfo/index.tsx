import * as React from "react";
import { useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import { AppState } from "../../../store/combineReducers";
import messages from "./messages";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";

const backendFrameworkNameToAppServiceRuntimeStack: Map<string, string> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, WIZARD_CONTENT_INTERNAL_NAMES.PYTHON],
]);

const RuntimeStackInfo = ({ intl }: InjectedIntlProps) => {
  const { formatMessage } = intl;
  const selectedBackend = useSelector((state: AppState) => state.selection.backendFramework);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{formatMessage(messages.title)}</div>
      {formatMessage(messages.runtimeStack, {
        runtimeStack: backendFrameworkNameToAppServiceRuntimeStack.get(selectedBackend.internalName),
      })}
    </div>
  );
};

export default injectIntl(RuntimeStackInfo);
