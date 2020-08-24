import * as React from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";

import * as ModalActions from "../../store/navigation/modals/action";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";

import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";

type Props = InjectedIntlProps;

const ReviewAndGenerate = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  
  return (
    <div className={styles.container}>
      <div className={styles.reviewContextContainer}>
        <div className={styles.selectionContainer}>
          <h1>{formatMessage(messages.launchYourProject)}</h1>
          <p>{formatMessage(messages.almostDone)}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={classnames(buttonStyles.buttonDark, styles.button)}
            onClick={()=> dispatch(ModalActions.openViewLicensesModalAction())}
          >
            {formatMessage(messages.viewLicenses)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ReviewAndGenerate);
