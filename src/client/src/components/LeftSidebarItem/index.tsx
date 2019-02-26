import * as React from "react";

import Check from "../../assets/check.svg";

import styles from "./styles.module.css";

const SidebarItem = ({
  text,
  showCheck
}: {
  text: string;
  showCheck: boolean;
}) => {
  return (
    <div className={styles.container}>
      {showCheck ? (
        <img
          src={process.env.REACT_APP_RELATIVE_PATH + Check}
          className={styles.icon}
        />
      ) : (
        <div className={styles.spacer} />
      )}
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default SidebarItem;
