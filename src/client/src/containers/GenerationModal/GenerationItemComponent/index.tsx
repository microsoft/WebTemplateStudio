import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import ReactMarkdown from "react-markdown";
import { GenerationItem, GenerationItemStatus } from "../../../types/generationStatus";
import classnames from "classnames";
import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import messages from "./messages";
import keyUpHandler from "../../../utils/keyUpHandler";

import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as Checkmark } from "../../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../../assets/errorred.svg";
import { openLogFile } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";
import { useEffect } from "react";
import { EXTENSION_COMMANDS } from "../../../utils/constants";

interface IProps {
  item: GenerationItem;
  onStatusChange(itemId: string, newStatus: GenerationItemStatus): void;
}

type Props = IProps & InjectedIntlProps;

const GenerationItemComponent = ({ intl, item, onStatusChange }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const [status, setStatus] = React.useState(item.status);

  useEffect(() => {
    function eventCallback(event: any) {
      const message = event.data;

      if (message.command === EXTENSION_COMMANDS.GEN_STATUS && message.payload.name === item.id) {
        setStatus(message.payload.status);
      }
    }

    window.addEventListener("message", eventCallback);
    return () => {
      window.removeEventListener("message", eventCallback);
    };
  }, []);

  useEffect(() => {
    if (status !== item.status) {
      onStatusChange(item.id, status);
    }
  }, [status]);

  return (
    <div className={styles.checkmarkStatusRow}>
      <React.Fragment>
        <div>{item.title}</div>
        {status === GenerationItemStatus.Generating && (
          <div role="img" aria-label="project creation in progress">
            <Spinner className={styles.spinner} />
          </div>
        )}
        {status === GenerationItemStatus.Sucess && (
          <div className={styles.inLine}>
            {item.link && (
              <ReactMarkdown
                source={`[View](${item.link})`}
                renderers={{
                  link: (props: any) => (
                    <a href={props.href} className={styles.link} onKeyUp={keyUpHandler}>
                      {props.children}
                    </a>
                  ),
                }}
              />
            )}
            <div role="img" aria-label="project creation done">
              <Checkmark className={styles.iconCheck} />
            </div>
          </div>
        )}
        {status === GenerationItemStatus.Failed && (
          <div className={styles.inLine}>
            <button className={classnames(buttonStyles.buttonLink, styles.link)} onClick={() => openLogFile(vscode)}>
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
