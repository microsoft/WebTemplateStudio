import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ISelected } from "../../../types/selected";
import styles from "../styles.module.css";
import classNames from "classnames";
import { AppState } from "../../../reducers";
import { azureMessages as azureModalMessages } from "../../../mockData/azureServiceOptions";
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
    <div className={styles.selectionContainer}>
      <div className={classNames(styles.selectionHeaderContainer, styles.leftHeader)}>
        {intl.formatMessage(azureModalMessages.appServiceRuntimeStackLabel)}
      </div>
      <div>
        {intl.formatMessage(azureModalMessages.appServiceRuntimeStackSubLabel, {
          runtimeStack: backendFrameworkNameToAppServiceRuntimeStack.get(selectedBackend.internalName),
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  selectedBackend: state.selection.backendFramework,
});

export default connect(mapStateToProps)(injectIntl(RuntimeStackInfo));
