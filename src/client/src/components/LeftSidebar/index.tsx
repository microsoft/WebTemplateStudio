import * as React from "react";

import SidebarItem from "../SidebarItem";

import styles from "./styles.module.css";

const LeftSidebar = ({ sidebarItems }: { sidebarItems: string[] }) => {
  return (
    <div className={styles.container}>
      {sidebarItems.map(sidebartitle => (
        <div className={styles.itemBorder}>
          <SidebarItem text={sidebartitle} />
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
