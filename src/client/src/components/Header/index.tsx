import * as React from "react";
import styles from "./styles.module.css";

const Header = () : JSX.Element => {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>Web Template Studio</h1>
      <h1 className={styles.headerTitleSmall}>WebTS</h1>
    </div>
  );
};

export default Header;
