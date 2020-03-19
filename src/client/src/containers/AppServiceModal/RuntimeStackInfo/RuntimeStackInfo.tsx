import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ISelected } from "../../../types/selected";
import styles from "./styles.module.css";
import { AppState } from "../../../reducers";
import messages from "./messages";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";

const backendFrameworkNameToAppServiceRuntimeStack: Map<string, string> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, WIZARD_CONTENT_INTERNAL_NAMES.PYTHON],
]);

interface IStateProps {
  selectedBackend: ISelected;
}

type Props = IStateProps & InjectedIntlProps;

const RuntimeStackInfo = (props: Props) => {
  const { intl, selectedBackend } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {intl.formatMessage(messages.title)}
      </div>
      {intl.formatMessage(messages.runtimeStack, {
        runtimeStack: backendFrameworkNameToAppServiceRuntimeStack.get(selectedBackend.internalName),
      })}
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  selectedBackend: state.selection.backendFramework,
});

export default connect(mapStateToProps)(injectIntl(RuntimeStackInfo));
