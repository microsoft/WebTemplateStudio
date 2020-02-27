import React from "react";
import classnames from "classnames";
import { injectIntl } from "react-intl";

import { ReactComponent as Warning } from "../../assets/warning.svg";
import { ReactComponent as Checkmark } from "../../assets/checkgreen.svg";

import styles from "./styles.module.css";

interface IProps {
  showWarning: boolean;
  text: string;
  altMessage: string;
}

const Notification = ({ showWarning, text, altMessage }: IProps) => {
  return (
    <React.Fragment>
      <div role="img" aria-label={altMessage}>
        {showWarning ? (
          <Warning className={styles.iconWarning} />
        ) : (
          <Checkmark className={styles.iconCheck} />
        )}
      </div>
      <div
        className={classnames(styles.text, {
          [styles.bodyGreen]: !showWarning,
          [styles.bodyYellow]: showWarning
        })}
      >
        {text}
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Notification);
