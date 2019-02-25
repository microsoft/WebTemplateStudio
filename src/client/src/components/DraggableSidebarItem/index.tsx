import * as React from "react";

import styles from "./styles.module.css";

const DraggableSidebarItem = ({
  text,
  closeSvgUrl,
  reorderSvgUrl,
  itemTitle
}: {
  text: string;
  reorderSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
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
          <div>
            <input />
            {text}
          </div>
          <img className={styles.cancelIcon} src={closeSvgUrl} />
        </div>
      </div>
    </div>
  );
};

export default DraggableSidebarItem;
