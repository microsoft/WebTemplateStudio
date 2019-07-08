import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";

import { AppState } from "../../reducers";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import asModal from "../../components/Modal";
import RootAction from "../../actions/ActionType";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import Licenses from "../Licenses";
import { isViewLicensesModalOpenSelector } from "../../selectors/modalSelector";
import { MODAL_TYPES } from "../../actions/modalActions/typeKeys";

interface IStateProps {
  isModalOpen: boolean;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & InjectedIntlProps & IDispatchProps;

const messages = defineMessages({
  closeModalLabel: {
    id: "viewLicensesModal.closeModalLabel",
    defaultMessage: "Close"
  }
});

const ViewLicensesModal = ({ intl, closeModal }: Props) => {
  const { formatMessage } = intl;

  return (
    <div>
      <Licenses />
      <div className={styles.footerContainer}>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={closeModal}
        >
          {formatMessage(messages.closeModalLabel)}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isViewLicensesModalOpenSelector(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(ViewLicensesModal), MODAL_TYPES.VIEW_LICENSES_MODAL));
