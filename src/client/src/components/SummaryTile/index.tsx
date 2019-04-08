import classnames from "classnames";
import * as React from "react";

import styles from "./styles.module.css";

import { withLocalPath } from "../../utils/getSvgUrl";

import cancel from "../../assets/cancel.svg";
import edit from "../../assets/edit.svg";
import reorder from "../../assets/reorder.svg";

interface IProps {
  withIndent?: boolean;
  title: string;
  originalTitle?: string;
  author?: string;
  version?: string;
  isEditable?: boolean;
  svgUrl?: string;
  withoutEditIcon?: boolean;
  handleCloseClick?: (idx: number) => void;
  handleInputChange?: (newTitle: string, idx: number) => void;
  idx?: number;
  isDraggable?: boolean;
  rotate?: boolean;
  subTitle?: string;
}

const SummaryTile = ({
  withIndent,
  title,
  originalTitle,
  author,
  version,
  isEditable,
  svgUrl,
  withoutEditIcon,
  handleCloseClick,
  idx,
  handleInputChange,
  isDraggable,
  rotate,
  subTitle
}: IProps) => {
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
      {isDraggable && (
        <img className={styles.reorder} src={withLocalPath(reorder)} />
      )}
      <div
        className={classnames({
          [styles.indent]: withIndent,
          [styles.summaryTileContainer]: isEditable,
          [styles.disableHover]: !isEditable
        })}
      >
        <div className={styles.leftContainer}>
          <img
            src={svgUrl}
            className={classnames(styles.leftIcon, {
              [styles.rotate]: rotate
            })}
          />
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
              {subTitle ? (
                subTitle
              ) : (
                <React.Fragment>
                  {originalTitle && (
                    <React.Fragment>
                      <div>{originalTitle}</div>
                      <div>&nbsp;|&nbsp;</div>
                    </React.Fragment>
                  )}
                  {author && (
                    <React.Fragment>
                      <div>{author}</div>
                      <div>&nbsp;|&nbsp;</div>
                    </React.Fragment>
                  )}
                  <div>{version}</div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {showEditable && !withoutEditIcon && (
          <img
            src={withLocalPath(edit)}
            className={styles.rightIcon}
            onClick={handleClick}
          />
        )}
      </div>
      <img
        src={withLocalPath(cancel)}
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

export default SummaryTile;
