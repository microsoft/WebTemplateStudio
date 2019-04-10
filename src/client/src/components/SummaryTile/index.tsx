import classnames from "classnames";
import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";

import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";
import { ReactComponent as EditSVG } from "../../assets/edit.svg";
import { ReactComponent as ReorderSVG } from "../../assets/reorder.svg";
import { ReactComponent as FolderSVG } from "../../assets/folder.svg";

import styles from "./styles.module.css";
import getSvgUrl, { getSvg } from "../../utils/getSvgUrl";

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
  error
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
    setDisabled(false);
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
  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isDraggable && <ReorderSVG className={styles.reorder} />}
      <div
        className={classnames({
          [styles.indent]: withIndent,
          [styles.summaryTileContainer]: isEditable,
          [styles.disableHover]: !isEditable
        })}
      >
        <div className={styles.leftContainer}>
          {showFolderIcon ? (
            <FolderSVG className={styles.leftIcon} />
          ) : (
            getSvg(internalName as string, styles.leftIcon) || (
              <img
                src={getSvgUrl(internalName as string)}
                className={styles.leftIcon}
              />
            )
          )}
          <div className={styles.tileContent}>
            <input
              ref={inputRef}
              className={styles.tileInput}
              value={componentTitle}
              onChange={handleChange}
              disabled={isDisabled}
              onBlur={handleFocusOut}
              onClick={handleClick}
            />
            <div className={styles.metaData}>
              {(error && (
                <div className={styles.errorMessage}>{error}</div>
              )) || (
                <React.Fragment>
                  {subTitle
                    ? subTitle
                    : originalTitle && (
                        <React.Fragment>
                          <div>{originalTitle}</div>
                          <div>&nbsp;|&nbsp;</div>
                        </React.Fragment>
                      )}
                  {author && (
                    <React.Fragment>
                      {author && <div>{author}</div>}
                      {version && (
                        <React.Fragment>
                          <div>&nbsp;|&nbsp;</div>
                          <div>{version}</div>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {showEditable && !withoutEditIcon && (
          <EditSVG className={styles.rightIcon} onClick={handleClick} />
        )}
      </div>
      <CloseSVG
        onClick={() => {
          if (handleCloseClick && idx) {
            // component index based at 1, so -1 for correction
            handleCloseClick(idx - 1);
          }
        }}
        className={classnames(styles.closeIcon, {
          [styles.hidden]: !showEditable || !isEditable
        })}
      />
      {!showEditable && <div className={styles.spacer} />}
    </div>
  );
};

export default injectIntl(SummaryTile);
