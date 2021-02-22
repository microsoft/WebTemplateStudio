import classnames from "classnames";
import React, { ReactNode } from "react";
import { injectIntl } from "react-intl";

import { ReactComponent as Checkmark } from "../../assets/checkgreen.svg";
import { ReactComponent as Warning } from "../../assets/warning.svg";
import styles from "./styles.module.css";

interface IProps {
  children: ReactNode;
  showWarning: boolean;
  altMessage: string;
}

const Notification = ({ children, showWarning, altMessage }: IProps) => {
  return (
    <React.Fragment>
      <div role="img" aria-label={altMessage}>
        {showWarning ? <Warning className={styles.iconWarning} /> : <Checkmark className={styles.iconCheck} />}
      </div>
      <div
        className={classnames(styles.text, {
          [styles.bodyGreen]: !showWarning,
          [styles.bodyYellow]: showWarning,
        })}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Notification);
