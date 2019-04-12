import * as React from "react";

import styles from "./styles.module.css";

import SelectBackEndFramework from "../../containers/SelectBackendFramework";
import SelectFrontEndFramework from "../../containers/SelectFrontEndFramework";

const SelectFrameworks = () => {
  return (
    <div className={styles.container}>
      <SelectFrontEndFramework />
      <SelectBackEndFramework />
    </div>
  );
};

export default SelectFrameworks;
