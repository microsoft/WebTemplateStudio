import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { GenerationItem, GenerationItemStatus } from "../../../types/generationStatus";
import classnames from "classnames";
import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import messages from "./messages";

import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as Checkmark } from "../../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../../assets/errorred.svg";
import { openLogFile } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";

interface IProps {
  item: GenerationItem;
}

type Props = IProps & InjectedIntlProps;

const GenerationItemComponent = ({intl, item}: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);

  return (
    <div className={styles.checkmarkStatusRow}>
        <React.Fragment>
          <div>{item.title}</div>
          {item.status === GenerationItemStatus.Generating && (
            <div role="img" aria-label="project creation in progress">
              <Spinner className={styles.spinner} />
            </div>
          )}
          {item.status === GenerationItemStatus.Sucess && (
            <div role="img" aria-label="project creation done">
              <Checkmark className={styles.iconCheck} />
            </div>
          )}
          {item.status === GenerationItemStatus.Failed && (
            <div className={styles.inLine}>
            <button
              className={classnames(buttonStyles.buttonLink, styles.link)}
              onClick={() => openLogFile(vscode)}>
              {formatMessage(messages.showLog)}
            </button>
            <div role="img" aria-label="project creation failed">
              <ErrorRed className={styles.iconError} />
            </div>
          </div>            
          )}
        </React.Fragment>
      </div>
  );
};

export default injectIntl(GenerationItemComponent);
