import * as React from "react";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>Web Template Studio</div>
      <div className={styles.headerTitleSmall}>WebTS</div>
    </div>
  );
};

export default Header;