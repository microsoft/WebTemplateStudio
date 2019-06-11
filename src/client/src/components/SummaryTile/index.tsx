import classnames from "classnames";
import * as React from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages
} from "react-intl";

import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";
import { ReactComponent as EditSVG } from "../../assets/edit.svg";
import { ReactComponent as ReorderSVG } from "../../assets/reorder.svg";
import { ReactComponent as FolderSVG } from "../../assets/folder.svg";

import styles from "./styles.module.css";
import getSvgUrl, { getSvg } from "../../utils/getSvgUrl";

const messages = defineMessages({
  changeItemName: {
    id: "summaryTile.changeItemName",
    defaultMessage: "Change Item Name"
  }
});

interface IProps {
  withIndent?: boolean;
  title: string;
  originalTitle?: string;
  author?: string;
  serviceTitle?: FormattedMessage.MessageDescriptor;
  version?: string;
  isEditable?: boolean;
  svgUrl?: string;
  internalName?: string;
  withoutEditIcon?: boolean;
  handleCloseClick?: (idx: number) => void;
  handleInputChange?: (newTitle: string, idx: number) => void;
  idx?: number;
  isDraggable?: boolean;
  showFolderIcon?: boolean;
  subTitle?: string;
  error?: string | FormattedMessage.MessageDescriptor;
  canDelete?: boolean;
}

type Props = IProps & InjectedIntlProps;

const SummaryTile = ({
  withIndent,
  title,
  originalTitle,
  author,
  serviceTitle,
  version,
  isEditable,
  internalName,
  svgUrl,
  withoutEditIcon,
  handleCloseClick,
  idx,
  handleInputChange,
  isDraggable,
  showFolderIcon,
  subTitle,
  intl,
  error,
  canDelete
}: Props) => {
  const [componentTitle, setTitle] = React.useState(title);
  const [isDisabled, setDisabled] = React.useState(true);
  const [showEditable, setEditable] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (!isDisabled && inputRef && inputRef.current) {
      inputRef.current.select();
    }
  }, [isDisabled]);
  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (handleInputChange && idx) {
      handleInputChange(target.value, idx - 1);
    }
    setTitle(target.value);
  };
  const handleClick = () => {
    if (isEditable && !canDelete) {
      setDisabled(false);
    }
  };
  const handleFocusOut = () => {
    setDisabled(true);
  };
  const handleMouseEnter = () => {
    if (isEditable) {
      setEditable(isEditable);
    }
  };
  const handleMouseLeave = () => {
    setEditable(false);
  };
  const handleOnFocus = () => {
    if (isEditable) {
      setEditable(isEditable);
    }
  };
  const onCloseClick = () => {
    if (handleCloseClick && idx) {
      // component index based at 1, so -1 for correction
      handleCloseClick(idx - 1);
    }
  };
  const onCloseKeyDown = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      onCloseClick();
    } else if (event.keyCode === 9) {
      setEditable(false);
    }
  };
  const onEditKeyDown = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      handleClick();
    }
  };
  const onSummaryTileLeave = (event: any) => {
    if (event.shiftKey && event.keyCode === 9) {
      setEditable(false);
    }
  };
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleFocusOut();
    }
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOnFocus}
    >
      {isDraggable && <ReorderSVG className={styles.reorder} />}
      <div
        className={classnames(styles.container, {
          [styles.indent]: withIndent
        })}
      >
        <div
          role="button"
          tabIndex={isEditable ? 0 : -1}
          className={classnames({
            [styles.summaryTileContainer]: isEditable,
            [styles.disableHover]: !isEditable
          })}
          onKeyDown={onSummaryTileLeave}
        >
          <div className={styles.leftContainer}>
            {showFolderIcon ? (
              <FolderSVG className={styles.leftIcon} />
            ) : (
              getSvg(internalName as string, styles.leftIcon) || (
                <img
                  alt=""
                  src={getSvgUrl(internalName as string)}
                  className={styles.leftIcon}
                />
              )
            )}
            <div className={styles.tileContent}>
              <div className={styles.errorStack} onDoubleClick={handleClick}>
                <input
                  aria-label={intl.formatMessage(messages.changeItemName)}
                  ref={inputRef}
                  className={styles.tileInput}
                  value={componentTitle}
                  onChange={handleChange}
                  disabled={isDisabled}
                  onBlur={handleFocusOut}
                  onKeyDown={handleKeyDown}
                />
                {error && <div className={styles.errorMessage}>{error}</div>}
              </div>
              <div className={styles.metaData}>
                {
                  <React.Fragment>
                    {subTitle ? (
                      <input
                        className={styles.subTitle}
                        value={subTitle}
                        disabled={true}
                      />
                    ) : (
                      originalTitle && (
                        <React.Fragment>
                          <div>{originalTitle}</div>
                        </React.Fragment>
                      )
                    )}
                    {author && (
                      <React.Fragment>
                        {author && (
                          <div>
                            {(subTitle || originalTitle) && (
                              <span>&nbsp;|&nbsp;</span>
                            )}
                            {author}
                          </div>
                        )}
                        {version && (
                          <React.Fragment>
                            <div>&nbsp;|&nbsp;</div>
                            <div>{version}</div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
          <div className={styles.editSpacer}>
            {showEditable && !withoutEditIcon && !canDelete && (
              <EditSVG
                tabIndex={0}
                className={styles.rightIcon}
                onClick={handleClick}
                onKeyDown={onEditKeyDown}
              />
            )}
          </div>
        </div>
        <div className={styles.spacer}>
          <CloseSVG
            tabIndex={0}
            onClick={onCloseClick}
            onKeyDown={onCloseKeyDown}
            className={classnames(styles.closeIcon, {
              [styles.hidden]: !showEditable || !isEditable
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(SummaryTile);
