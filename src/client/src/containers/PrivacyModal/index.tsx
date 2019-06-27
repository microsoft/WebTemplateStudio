import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
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
import { closeModalAction } from "../../actions/modalActions/modalActions";

interface IStateProps {
  isModalOpen: boolean;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps;

/*
 * Props:
 * - downloadLink: string
 * - privacyStatementLink: string
 */

const PrivacyModal = () => {
  return (
    <div>
      <div className={styles.title}>{"You are being redirected."}</div>
      <div className={styles.section}>
        <div>
          {
            "You are going to be taken to a third-party website which is a non-Microsoft service."
          }
        </div>
      </div>
      <div className={styles.footerContainer}>
        <a
          target={"_blank"}
          className={styles.link}
          href="https://nodejs.org/en/about/privacy/"
        >
          {"Privacy Statement"}
        </a>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
        >
          {"OK"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): any => ({
  isModalOpen: isPrivacyModalOpenSelector(state)
});

const mapDispatchToProps = (dispatch: any): any => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(PrivacyModal));
