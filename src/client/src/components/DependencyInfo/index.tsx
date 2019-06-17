import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";

/*
 * Props:
 * - frameworkName: "node" | "flask"
 * - installationState: boolean, true if correct version installed, otherwise false
 */
const DependencyInfo: any = (props: any) => {
  let frameworkName = props.frameworkName;
  let installationState = props.installationState;

  let dependencyMessage: string;

  if (installationState) {
    dependencyMessage = " detected!";
  } else {
    dependencyMessage = " not detected. Click to install.";
  }
  let downloadLink: string = "";
  let icon: any = getSvg.getGreenCheckSvg();

  if (frameworkName === "NodeJS") {
    downloadLink = "https://nodejs.org/en/download/";
  } else if (frameworkName === "Flask") {
    downloadLink = "https://www.python.org/downloads/";
  }

  if (installationState) {
    icon = getSvg.getGreenCheckSvg();
  } else {
    icon = getSvg.getWarningSvg();
  }

  return (
    <a
      target={"_blank"}
      href={downloadLink}
      className={classnames(styles.dependencyContainer, {
        [styles.disabled]: installationState,
        [styles.borderGreen]: installationState,
        [styles.borderYellow]: !installationState
      })}
    >
      <img className={styles.icon} src={icon} alt="" />
      {/*TODO: react-intl */}
      <div
        className={classnames(styles.body, {
          [styles.bodyGreen]: installationState,
          [styles.bodyYellow]: !installationState
        })}
      >
        {`${frameworkName} ${dependencyMessage}`}
      </div>
    </a>
  );
};

export default DependencyInfo;
