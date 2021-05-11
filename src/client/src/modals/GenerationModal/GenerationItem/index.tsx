import classnames from "classnames";
import * as React from "react";
import { useEffect } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { AppContext } from "../../../AppContext";
import { ReactComponent as Checkmark } from "../../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../../assets/errorred.svg";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import buttonStyles from "../../../css/button.module.css";
import { GenerationItemData, GenerationItemStatus } from "../../../types/generationStatus";
import { EXTENSION_COMMANDS } from "../../../utils/constants/commands";
import {
  openLogFile,
  subscribeToExtensionEvents,
  unsubscribeToExtensionEvents,
} from "../../../utils/extensionService/extensionService";
import keyUpHandler from "../../../utils/keyUpHandler";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  item: GenerationItemData;
}

type Props = IProps & InjectedIntlProps;

const GenerationItem = ({ intl, item }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const [status, setStatus] = React.useState(GenerationItemStatus.Generating);

  useEffect(() => {
    function getGenerationEvents(event: any) {
      const { command, payload } = event.data;
      if (command === EXTENSION_COMMANDS.GEN_STATUS && payload.name === item.name) {
        setStatus(payload.status);
        if (payload.status === GenerationItemStatus.Generating && payload.message) item.message.next(payload.message);
        if (payload.status === GenerationItemStatus.Failed) item.message.error(payload.message);
        if (payload.status === GenerationItemStatus.Success) {
          if (payload.message) item.message.next(payload.message);
          if (payload.data && payload.data.generationPath && item.generationPath)
            item.generationPath.next(payload.data.generationPath);
          item.message.complete();
        }
      }
    }

    subscribeToExtensionEvents(getGenerationEvents);

    return () => {
      unsubscribeToExtensionEvents(getGenerationEvents);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>{item.title}</div>
      {status === GenerationItemStatus.Generating && (
        <div role="img" aria-label={formatMessage(messages.generationInProgress, { name: item.title })}>
          <Spinner className={styles.spinner} data-testid="spinner-icon" />
        </div>
      )}
      {status === GenerationItemStatus.Success && (
        <div className={styles.inLine}>
          {item.link && (
            <a href={item.link} onKeyUp={keyUpHandler}>
              {formatMessage(messages.view)}
            </a>
          )}
          <div role="img" aria-label={formatMessage(messages.generationSuccess, { name: item.title })}>
            <Checkmark className={styles.iconCheck} data-testid="checkmark-icon" />
          </div>
        </div>
      )}
      {status === GenerationItemStatus.Failed && (
        <div className={styles.inLine}>
          <button className={classnames(buttonStyles.buttonLink, styles.link)} onClick={() => openLogFile(vscode)}>
            {formatMessage(messages.showLog)}
          </button>
          <div role="img" aria-label={formatMessage(messages.generationFailed, { name: item.title })}>
            <ErrorRed className={styles.iconError} data-testid="error-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default injectIntl(GenerationItem);
