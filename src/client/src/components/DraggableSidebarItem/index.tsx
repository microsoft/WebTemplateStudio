import * as React from "react";

import styles from "./styles.module.css";

const DraggableSidebarItem = ({ text, closeSvgUrl, reorderSvgUrl }: { text: string, reorderSvgUrl: string, closeSvgUrl: string }) => {
    return (
        <div className={styles.draggablePage}>
            <div className={styles.iconContainer}>
              <img className={styles.icon} src={reorderSvgUrl} />
            </div>
            <div className={styles.pagesTextContainer}>
              <div>
                {text}
              </div>
              <img className={styles.cancelIcon} src={closeSvgUrl} />
            </div>
          </div>
    )
}

export default DraggableSidebarItem;