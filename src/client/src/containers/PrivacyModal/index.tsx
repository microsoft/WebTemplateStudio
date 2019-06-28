import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isPrivacyModalOpenSelector } from "../../selectors/modalSelector";

import { ISelected } from "../../types/selected";
import { AppState } from "../../reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../selectors/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { resetWizardAction } from "../../actions/wizardInfoActions/resetWizardAction";
import { closeModalAction } from "../../actions/modalActions/modalActions";

import { frameworkNameToDependencyMap, IDependency } from "../DependencyInfo";

interface IStateProps {
  isModalOpen: boolean;
  selectedFrontendFramework: ISelected;
  selectedBackendFramework: ISelected;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps;

const PrivacyModal = (props: Props) => {
  const cancelKeyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      props.closeModal();
    }
  };

  const dependency: IDependency | undefined = frameworkNameToDependencyMap.get(
    props.selectedFrontendFramework.internalName
  );

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>{"You are being redirected"}</div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={props.closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <div className={styles.section}>
        {
          "You will be taken to a third-party website which is a non-Microsoft service."
        }
      </div>
      <div className={styles.footerContainer}>
        <a
          target={"_blank"}
          className={styles.link}
          href={dependency.privacyStatementLink}
        >
          {"Privacy Statement"}
        </a>
        <a
          target={"_blank"}
          href={dependency.downloadLink}
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
        >
          {"OK"}
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const { frontendFramework, backendFramework } = state.selection;

  return {
    isModalOpen: isPrivacyModalOpenSelector(state),
    selectedFrontendFramework: frontendFramework,
    selectedBackendFramework: backendFramework
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(PrivacyModal));
