import * as React from "react";
import classnames from "classnames";

import styles from "./styles.module.css";
import { ISelected } from "../../types/selected";

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
  withIndent?: boolean
}) => {
  return (
    <React.Fragment>
      {itemTitle != null && (
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
            [styles.textContainer]: !withIndent
        })}>
          <div className={styles.inputContainer}>
            {pageSvgUrl != null && <img className={styles.icon} src={pageSvgUrl} />}
            {handleInputChange != null && (page != null || functionName != null) && idx != null && (
              <input
                className={styles.input}
                defaultValue={page ? page.title : functionName}
                onChange={e => {
                  handleInputChange(e.target.value, idx - 1);
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
