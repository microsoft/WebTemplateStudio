import * as React from "react";

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
  idx
}: {
  page?: ISelected;
  text?: string;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
  handleInputChange?: (e: any, idx: number) => void;
  idx?: number;
}) => {
  return (
    <div>
      {!!itemTitle && (
        <div className={styles.draggablePage}>
          <div className={styles.iconContainer} />
          <div className={styles.itemContainer}>
            <div>{itemTitle}</div>
          </div>
        </div>
      )}
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={reorderSvgUrl} />
        </div>
        <div className={styles.pagesTextContainer}>
          <div className={styles.inputContainer}>
            {!!pageSvgUrl && <img className={styles.icon} src={pageSvgUrl} />}
            {!!handleInputChange && !!page && !!idx && (
              <input
                className={styles.input}
                defaultValue={page.title}
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
    </div>
  );
};

export default DraggableSidebarItem;
