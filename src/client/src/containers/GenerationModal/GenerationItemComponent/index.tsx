import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { GenerationItemData, GenerationItemStatus } from "../../../types/generationStatus";
import classnames from "classnames";
import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import messages from "./messages";
import keyUpHandler from "../../../utils/keyUpHandler";

import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as Checkmark } from "../../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../../assets/errorred.svg";
import {
  openLogFile,
  subscribeToExtensionEvents,
  unsubscribeToExtensionEvents,
} from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";
import { useEffect } from "react";
import { EXTENSION_COMMANDS } from "../../../utils/constants";

interface IProps {
  item: GenerationItemData;
  onStatusChange(name: string, newStatus: GenerationItemStatus): void;
  onStatusMessage(message: string): void;
  onErrorMessage(message: string): void;
}

type Props = IProps & InjectedIntlProps;

const GenerationItemComponent = ({ intl, item, onStatusChange, onErrorMessage, onStatusMessage }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const [status, setStatus] = React.useState(item.status);

  useEffect(() => {
    function getGenerationEvents(event: any) {
      const { command } = event.data;
      const { name, status, message } = event.data.payload;

      if (command === EXTENSION_COMMANDS.GEN_STATUS && name === item.name) {
        setStatus(status);

        if (message) {
          if (status === GenerationItemStatus.Failed) {
            onErrorMessage(message);
          } else {
            onStatusMessage(message);
          }
        }
      }
    }

    subscribeToExtensionEvents(getGenerationEvents);
    return () => {
      unsubscribeToExtensionEvents(getGenerationEvents);
    };
  }, []);

  useEffect(() => {
    if (status !== item.status) {
      onStatusChange(item.name, status);
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div>{item.title}</div>
      {status === GenerationItemStatus.Generating && (
        <div role="img" aria-label={formatMessage(messages.generationInProgress, { name: item.title })}>
          <Spinner className={styles.spinner} />
        </div>
      )}
      {status === GenerationItemStatus.Success && (
        <div className={styles.inLine}>
          {item.link && (
            <a className={styles.link} href={item.link} onKeyUp={keyUpHandler}>
              {formatMessage(messages.view)}
            </a>
          )}
          <div role="img" aria-label={formatMessage(messages.generationSuccess, { name: item.title })}>
            <Checkmark className={styles.iconCheck} />
          </div>
        </div>
      )}
      {status === GenerationItemStatus.Failed && (
        <div className={styles.inLine}>
          <button className={classnames(buttonStyles.buttonLink, styles.link)} onClick={() => openLogFile(vscode)}>
            {formatMessage(messages.showLog)}
          </button>
          <div role="img" aria-label={formatMessage(messages.generationFailed, { name: item.title })}>
            <ErrorRed className={styles.iconError} />
          </div>
        </div>
      )}
    </div>
  );
};

export default injectIntl(GenerationItemComponent);
