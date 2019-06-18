import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";
import { InjectedIntlProps, injectIntl, defineMessages } from "react-intl";

interface IDependencyInfoProps {
  frameworkName: string;
  installed: boolean;
  intl: any;
}

type Props = IDependencyInfoProps;

const messages = defineMessages({
  installed: {
    id: "dependencyChecker.installed",
    defaultMessage: " detected!"
  },
  notInstalled: {
    id: "dependencyChecker.notInstalled",
    defaultMessage: " not detected. Click to install."
  }
});

/*
 * Props:
 * - frameworkName: "NodeJS" | "Flask"
 * - installed: boolean, true if correct version installed, otherwise false
 */
class DependencyInfo extends React.Component<Props> {
  public render() {
    let { frameworkName, installed, intl } = this.props;

    let dependencyMessage: string = installed
      ? intl.formatMessage(messages.installed)
      : intl.formatMessage(messages.notInstalled);

    let icon: any = installed
      ? getSvg.getGreenCheckSvg()
      : getSvg.getWarningSvg();

    // map framework name to dependency name
    let dependencyName = frameworkName === "Flask" ? "Python" : "Node";

    let downloadLink: string = "";
    if (dependencyName === "Node") {
      downloadLink = "https://nodejs.org/en/download/";
    } else if (dependencyName === "Python") {
      downloadLink = "https://www.python.org/downloads/";
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
        <div
          className={classnames(styles.body, {
            [styles.bodyGreen]: installed,
            [styles.bodyYellow]: !installed
          })}
        >
          {`${dependencyName} ${dependencyMessage}`}
        </div>
      </a>
    );
  }
}

export default injectIntl(DependencyInfo);
