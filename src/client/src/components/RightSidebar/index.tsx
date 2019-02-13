import * as React from "react";

import Dropdown from "./Dropdown";

import styles from "./styles.module.css";

class RightSidebar extends React.Component {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Your Project Details</div>
        <Dropdown />
        <div className={styles.title}>Front End Framework</div>
      </div>
    );
  }
}

export default RightSidebar;
