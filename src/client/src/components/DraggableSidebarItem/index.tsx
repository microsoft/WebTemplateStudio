import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Reorder } from "../../assets/reorder.svg";
import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";

import { getSvg } from "../../utils/getSvgUrl";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";

/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */
const DraggableSidebarItem = ({
  page,
  text,
  pageSvgUrl,
  reorderSvgUrl,
  itemTitle,
  handleInputChange,
  idx,
  azureFunctionName,
  withIndent,
  withLargeIndent,
  handleCloseClick
}: {
  page?: ISelected;
  text?: string;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
  handleInputChange?: (e: any, idx: number) => void;
  idx?: number;
  azureFunctionName?: string;
  withIndent?: boolean;
  withLargeIndent?: boolean;
  handleCloseClick?: (idx: number) => void;
}) => {
  return (
    <div>
      {itemTitle && (
        <div className={styles.titleContainer}>
          {withIndent ? (
            <React.Fragment>
              <div className={styles.iconContainer} />
              <div className={styles.itemContainer}>
                <div>{itemTitle}</div>
              </div>
            </React.Fragment>
          ) : (
            itemTitle
          )}
        </div>
      )}
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          {!(withIndent || withLargeIndent) && (
            <Reorder className={styles.reorderIcon} />
          )}
        </div>
        <div className={styles.errorStack}>
          <div
            className={classnames({
              [styles.pagesTextContainer]: withIndent || reorderSvgUrl,
              [styles.textContainer]: !withIndent,
              [styles.largeIndentContainer]: withLargeIndent
            })}
          >
            <div className={styles.inputContainer}>
              {reorderSvgUrl &&
                (getSvg(page!.internalName, styles.icon) || (
                  <img className={styles.icon} src={pageSvgUrl} />
                ))}
              {handleInputChange && (page || azureFunctionName) && idx && (
                <input
                  className={classnames(styles.input, {
                    [styles.azureFunctionNameInput]: azureFunctionName
                  })}
                  value={page ? page.title : azureFunctionName}
                  onChange={e => {
                    if (handleInputChange && idx) {
                      handleInputChange(e.target.value, idx - 1);
                    }
                  }}
                />
              )}
              <div>{text}</div>
            </div>
          </div>
          {page && !page.isValidTitle && (
            <div
              className={classnames({
                [styles.errorTextContainer]: withIndent || reorderSvgUrl,
                [styles.textContainer]: !withIndent,
                [styles.largeIndentContainer]: withLargeIndent
              })}
            >
              {page.error}
            </div>
          )}
        </div>
        <CloseSVG
          onClick={() => {
            idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
          }}
          className={styles.cancelIcon}
        />
      </div>
    </div>
  );
};

export default DraggableSidebarItem;
