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
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isViewLicensesModalOpenSelector } from "../../selectors/modalSelector";
import { MODAL_TYPES } from "../../actions/modalActions/typeKeys";
import { KEY_EVENTS } from "../../utils/constants";

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
  },
  licenses: {
    id: "licenses.licenses",
    defaultMessage: "Licenses"
  }
});

const ViewLicensesModal = ({ intl, closeModal }: Props) => {
  const { formatMessage } = intl;

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {intl.formatMessage(messages.licenses)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <Licenses />
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
