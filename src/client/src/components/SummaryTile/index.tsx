import classnames from "classnames";
import * as React from "react";

import styles from "./styles.module.css";

import { withLocalPath } from "../../utils/getSvgUrl";

import edit from "../../assets/edit.svg";
import cancel from "../../assets/cancel.svg";

interface IProps {
  withIndent?: boolean;
  title: string;
  originalTitle?: string;
  company?: string;
  version: string;
  isEditable?: boolean;
  svgUrl?: string;
  withoutEditIcon?: boolean;
  handleCloseClick?: (idx: number) => void;
  handleInputChange?: (newTitle: string, idx: number) => void;
  idx?: number;
}

const SummaryTile = ({
  withIndent,
  title,
  originalTitle,
  company,
  version,
  isEditable,
  svgUrl,
  withoutEditIcon,
  handleCloseClick,
  idx,
  handleInputChange
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
      <div
        className={classnames({
          [styles.indent]: withIndent,
          [styles.summaryTileContainer]: isEditable,
          [styles.disableHover]: !isEditable
        })}
      >
        <div className={styles.leftContainer}>
          <img src={svgUrl} className={styles.leftIcon} />
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
              {originalTitle && (
                <React.Fragment>
                  <div>{originalTitle}</div>
                  <div>&nbsp;|&nbsp;</div>
                </React.Fragment>
              )}
              {company && (
                <React.Fragment>
                  <div>{company}</div>
                  <div>&nbsp;|&nbsp;</div>
                </React.Fragment>
              )}
              <div>{version}</div>
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
