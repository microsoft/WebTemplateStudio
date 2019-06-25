import * as React from "react";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";
import { injectIntl, defineMessages } from "react-intl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

interface IDependencyInfoProps {
  frameworkName: string;
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
  },
  iconAltMessage: {
    id: "dependencyChecker.iconAltMessage",
    defaultMessage: "Icon for dependency checker"
  }
});

interface IDependency {
  [key: string]: string;
}

interface IDependencies {
  [key: string]: IDependency;
}

const dependencies: IDependencies = {
  NodeJS: {
    dependencyName: "node",
    displayName: "Node",
    downloadLink: "https://nodejs.org/en/download/",
    privacyStatementLink: "https://nodejs.org/en/about/privacy/"
  },
  Python: {
    dependencyName: "python",
    displayName: "Python",
    downloadLink: "https://www.python.org/downloads/",
    privacyStatementLink: "https://www.python.org/privacy/"
  }
};

const frameworkNameToDependencyMap: Map<string, IDependency> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, dependencies.Python],
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_JS, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS, dependencies.NodeJS]
]);

/*
 * Props:
 * - frameworkName: string
 */
class DependencyInfo extends React.Component<Props> {
  public render() {
    let { frameworkName, intl } = this.props;
    let dependency: IDependency | undefined = frameworkNameToDependencyMap.get(
      frameworkName
    );

    if (dependency === undefined) {
      return null;
    }

    let dependencyName: string = dependency.displayName;
    let downloadLink: string = dependency.downloadLink;
    let privacyStatementLink: string = dependency.privacyStatementLink;

    // grab this from redux store uisng dependencyName
    let installed = true;

    let dependencyMessage: string = installed
      ? intl.formatMessage(messages.installed)
      : intl.formatMessage(messages.notInstalled);

    let icon: any = installed
      ? getSvg.getGreenCheckSvg()
      : getSvg.getWarningSvg();

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
        <img
          className={styles.icon}
          src={icon}
          alt={intl.formatMessage(messages.iconAltMessage)}
        />
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
