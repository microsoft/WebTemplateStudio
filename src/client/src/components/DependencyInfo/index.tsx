import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";

/*
 * Props:
 * - frameworkName: "node" | "flask"
 * - installationState: one of -1 (not installed), 0 (outdated), 1 (installed)
 */
const DependencyInfo: any = (props: any) => {
  let frameworkName = props.frameworkName;
  let installationState = props.installationState;

  let dependencyMessage: string;

  if (installationState === 1) {
    dependencyMessage = " detected!";
  } else if (installationState === 0) {
    dependencyMessage = " is outdated. Click here to install.";
  } else {
    dependencyMessage = " not detected. Click here to install.";
  }
  let downloadLink: string = "";
  let icon: any = getSvg.getGreenCheckSvg();

  if (frameworkName === "node") {
    downloadLink = "https://nodejs.org/en/download/";
  } else if (frameworkName === "python") {
    downloadLink = "https://www.python.org/downloads/";
  }

  if (installationState === 1) {
    icon = getSvg.getGreenCheckSvg();
  } else {
    icon = getSvg.getWarningSvg();
  }

  return (
    <a
      target={"_blank"}
      href={downloadLink}
      className={classnames(styles.dependencyContainer, {
        [styles.disabled]: installationState === 1,
        [styles.borderGreen]: installationState === 1,
        [styles.borderYellow]:
          installationState === -1 || installationState === 0
      })}
    >
      <img className={styles.icon} src={icon} alt="" />
      {/*TODO: react-intl */}
      <div
        className={classnames(styles.body, {
          [styles.bodyGreen]: installationState === 1,
          [styles.bodyYellow]:
            installationState === -1 || installationState === 0
        })}
      >
        {`${frameworkName} ${dependencyMessage}`}
      </div>
    </a>
  );
};

export default DependencyInfo;
