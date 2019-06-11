import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";

/*
 * Props:
 * - frameworkName: name of framework
 * - installationState: must be one of "installed", "missing", "outdated"
 */
const DependencyInfo: any = (
  frameworkName: string,
  installationState: string
) => {
  frameworkName = "Flask";
  installationState = "outdated";

  let dependencyMessage: string = " required. Click to install.";
  let downloadLink: string = ""; // default link does nothing
  let icon: any = getSvg.getGreenCheckSvg();

  if (frameworkName === "Node") {
    downloadLink = "https://nodejs.org/en/download/";
  } else if (frameworkName === "Flask") {
    downloadLink = "https://www.python.org/downloads/";
  }

  if (installationState === "missing" || installationState === "outdated") {
    icon = getSvg.getWarningSvg();
  } else if (installationState === "installed") {
    icon = getSvg.getGreenCheckSvg();
  }

  return (
    <a
      target={"_blank"}
      href={downloadLink}
      className={classnames(styles.dependencyLink, {
        [styles.disabled]: installationState === "installed",
        [styles.borderGreen]: installationState === "installed",
        [styles.borderYellow]:
          installationState === "missing" || installationState === "outdated"
      })}
    >
      <img className={styles.icon} src={icon} alt="" />
      {/*TODO: react-intl */}
      <div
        className={classnames(styles.body, {
          [styles.bodyGreen]: installationState === "installed",
          [styles.bodyYellow]:
            installationState === "missing" || installationState === "outdated"
        })}
      >
        {`${frameworkName} ${dependencyMessage}`}
      </div>
    </a>
  );
};

export default DependencyInfo;
