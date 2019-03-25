import classnames from "classnames";
import * as React from "react";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";

/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */
const DraggableSidebarItem = ({
  page,
  text,
  closeSvgUrl,
  pageSvgUrl,
  reorderSvgUrl,
  itemTitle,
  handleInputChange,
  idx,
  functionName,
  withIndent,
  withLargeIndent,
}: {
  page?: ISelected;
  text?: string;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
  handleInputChange?: (e: any, idx: number) => void;
  idx?: number;
  functionName?: string;
  withIndent?: boolean;
  withLargeIndent?: boolean
}) => {
  return (
    <React.Fragment>
      {itemTitle && (
        <div className={styles.titleContainer}>
          { withIndent ?
          <React.Fragment>
            <div className={styles.iconContainer} />
            <div className={styles.itemContainer}>
              <div>{itemTitle}</div>
            </div>
          </React.Fragment> : itemTitle }
        </div>
      )}
      <div className={styles.draggablePage}>
        {(withIndent || reorderSvgUrl) && <div className={styles.iconContainer}>
          <img className={styles.icon} src={reorderSvgUrl} />
        </div>}
        <div className={classnames({
            [styles.pagesTextContainer]: withIndent || reorderSvgUrl,
            [styles.textContainer]: !withIndent,
            [styles.largeIndentContainer]: withLargeIndent
        })}>
          <div className={styles.inputContainer}>
            {pageSvgUrl && <img className={styles.icon} src={pageSvgUrl} />}
            {handleInputChange && (page || functionName) && idx && (
              <input
                className={classnames(styles.input, {
                  [styles.functionNameInput]: functionName
                })}
                defaultValue={page ? page.title : functionName}
                onChange={e => {
                  if (handleInputChange && idx) {
                    handleInputChange(e.target.value, idx - 1);
                  }
                }}
              />
            )}
            <div>{text}</div>
          </div>
          <img className={styles.cancelIcon} src={closeSvgUrl} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DraggableSidebarItem;
