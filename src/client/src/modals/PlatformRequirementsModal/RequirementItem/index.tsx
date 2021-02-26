import classnames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { ReactComponent as Checkmark } from "../../../assets/checkgreen.svg";
import { ReactComponent as Warning } from "../../../assets/warning.svg";
import { IPlatformRequirement } from "../../../store/config/platform/model";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  item: IPlatformRequirement;
}

type Props = IProps & InjectedIntlProps;

const RequirementItem = ({ intl, item }: Props) => {
  const { formatMessage } = intl;
  return (
    <div className={styles.container}>
      {item.isInstalled && (
        <div className={styles.inLine}>
          <div role="img" aria-label={formatMessage(messages.requirementInstalled)}>
            <Checkmark className={styles.iconCheck} />
          </div>
        </div>
      )}
      {!item.isInstalled && (
        <div className={styles.inLine}>
          <div role="img" aria-label={formatMessage(messages.requirementNotInstalled)}>
            <Warning className={styles.iconWarning} />
          </div>
        </div>
      )}
      <div className={classnames({ [styles.warningText]: !item.isInstalled })}>{item.name}</div>
    </div>
  );
};

export default injectIntl(RequirementItem);
