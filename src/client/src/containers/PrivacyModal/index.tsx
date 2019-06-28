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
import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { closeModalAction } from "../../actions/modalActions/modalActions";

import { frameworkNameToDependencyMap, IDependency } from "../DependencyInfo";

interface IStateProps {
  isModalOpen: boolean;
  dependency: IDependency;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps;

const PrivacyModal = (props: Props) => {
  const { dependency } = props;

  if (dependency == null) {
    return null;
  }

  const cancelKeyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      props.closeModal();
    }
  };

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
  const dependency = state.modals.openModal && state.modals.openModal.modalData;
  return {
    isModalOpen: isPrivacyModalOpenSelector(state),
    dependency: dependency
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(PrivacyModal));
