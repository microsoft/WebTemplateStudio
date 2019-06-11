import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";

const DependencyWarning = () => {
  return (
    <div className={classnames(styles.warningDiv)}>
      <img className={styles.warningSvg} src={getSvg.getWarningSvg()} alt="" />
      {/*TODO: react-intl */}
      <div className={styles.body}>{"Node required. Click to install."}</div>
    </div>
  );
};

export default DependencyWarning;
