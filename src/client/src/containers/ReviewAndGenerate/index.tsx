import * as React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import * as ModalActions from "../../actions/modalActions/modalActions";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";

import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import keyUpHandler from "../../utils/keyUpHandler";

interface IDispatchProps {
  openViewLicensesModal: () => any;
}

type Props = IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  viewLicenses: {
    id: "licenses.viewLicenses",
    defaultMessage: "View Licenses"
  },
  launchYourProject: {
    id: "instructionHeading.launchYourProject",
    defaultMessage: "Launch Your Project"
  },
  almostDone: {
    id: "context.almostDone",
    defaultMessage:
      "You're almost done - review your project details on the right and make any necessary adjustments!"
  }
});

const ReviewAndGenerate = (props: Props) => {
  const { intl, openViewLicensesModal } = props;
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <div className={styles.reviewContextContainer}>
        <div className={styles.selectionContainer}>
          <h1>{formatMessage(messages.launchYourProject)}</h1>
          <p>{formatMessage(messages.almostDone)}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={classnames(buttonStyles.buttonHighlighted)}
            onClick={openViewLicensesModal}
          >
            {formatMessage(messages.viewLicenses)}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openViewLicensesModal: () => {
    dispatch(ModalActions.openViewLicensesModalAction());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(ReviewAndGenerate));
