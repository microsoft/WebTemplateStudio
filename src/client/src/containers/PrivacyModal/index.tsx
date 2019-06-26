import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import ReactMarkdown from "react-markdown";

import asModal from "../../components/Modal";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPrivacyModalOpenSelector } from "../../selectors/modalSelector";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  ROUTES
} from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { AppState } from "../../reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../selectors/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { resetWizardAction } from "../../actions/wizardInfoActions/resetWizardAction";

interface IStateProps {
  isModalOpen: boolean;
  // isPostGenModalOpen: boolean;
  // vscode: IVSCodeObject;
  // outputPath: string;
}

// interface IDispatchProps {
//   resetWizard: () => any;
// }

type Props = IStateProps;

const PrivacyModal = () => {
  return (
    <div>
      <a
        className={styles.link}
        href="https://github.com/Microsoft/WebTemplateStudio/issues"
      >
        {"hello"}
      </a>
      <button
        className={classnames(buttonStyles.buttonHighlighted, styles.button)}
      >
        {"hello"}
      </button>
    </div>
  );
};

const mapStateToProps = (state: AppState): any => ({
  isModalOpen: isPrivacyModalOpenSelector(state)
  // vscode: getVSCodeApiSelector(state)
});

const mapDispatchToProps = (dispatch: any): any => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(PrivacyModal));
