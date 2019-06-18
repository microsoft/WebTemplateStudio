import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";

interface IDependencyInfoProps {
  frameworkName: string;
  installed: boolean;
}

type Props = IDependencyInfoProps;

/*
 * Props:
 * - frameworkName: "NodeJS" | "flask"
 * - installed: boolean, true if correct version installed, otherwise false
 */
class DependencyInfo extends React.Component<Props> {
  public render() {
    let { frameworkName, installed } = this.props;

    let dependencyMessage: string;
    if (installed) {
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

    if (installed) {
      icon = getSvg.getGreenCheckSvg();
    } else {
      icon = getSvg.getWarningSvg();
    }

    return (
      <a
        target={"_blank"}
        href={downloadLink}
        className={classnames(styles.dependencyContainer, {
          [styles.disabled]: installed,
          [styles.borderGreen]: installed,
          [styles.borderYellow]: !installed
        })}
      >
        <img className={styles.icon} src={icon} alt="" />
        {/*TODO: react-intl */}
        <div
          className={classnames(styles.body, {
            [styles.bodyGreen]: installed,
            [styles.bodyYellow]: !installed
          })}
        >
          {`${frameworkName} ${dependencyMessage}`}
        </div>
      </a>
    );
  }
}

export default DependencyInfo;
