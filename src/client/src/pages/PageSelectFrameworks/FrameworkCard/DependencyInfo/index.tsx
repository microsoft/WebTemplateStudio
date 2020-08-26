import * as React from "react";
import styles from "./styles.module.css";
import classnames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Notification from "../../../../components/Notification";
import messages from "./messages";
import { DependencyContext } from "../../DependencyContext";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../../utils/constants/internalNames";

export interface IDependency {
  dependencyStoreKey: string;
  dependencyName: string;
  dependencyMinimumVersion: string;
  downloadLink: string;
  privacyStatementLink: string;
  downloadLinkLabel: string;
}

interface IDependencies {
  [key: string]: IDependency;
}

const dependencies: IDependencies = {
  Node: {
    dependencyStoreKey: "node",
    dependencyName: "Node",
    dependencyMinimumVersion: "v12.0+",
    downloadLink: "https://nodejs.org/en/download/",
    privacyStatementLink: "https://nodejs.org/en/about/privacy/",
    downloadLinkLabel: "Node download link"
  },
  Python: {
    dependencyStoreKey: "python",
    dependencyName: "Python",
    dependencyMinimumVersion: "v3.5+",
    downloadLink: "https://www.python.org/downloads/",
    privacyStatementLink: "https://www.python.org/privacy/",
    downloadLinkLabel: "Python download link"
  },
  NetCore: {
    dependencyStoreKey: "netCore",
    dependencyName: ".NET Core",
    dependencyMinimumVersion: "v3.1+",
    downloadLink: "https://dotnet.microsoft.com/download",
    privacyStatementLink: "https://dotnet.microsoft.com/privacy",
    downloadLinkLabel: ".NET Core download link"
  }
};

const frameworkNameToDependencyMap: Map<string, IDependency> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, dependencies.Python],
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.ASPNET, dependencies.NetCore]
]);

interface IProps {
  frameworkName: string;
}

type Props = IProps & InjectedIntlProps;

const DependencyInfo = (props: Props) => {
  const {
    frameworkName,
    intl
  } = props;

  const [installed, setInstalled] = React.useState(false);
  const [dependency, setDependency] = React.useState<IDependency | undefined>();
  const [dependencyMessage, setDependencyMessage] = React.useState("");
  const dependencyContext = React.useContext(DependencyContext);

  React.useEffect(()=>{
    const localDepency = frameworkNameToDependencyMap.get(frameworkName);
    setDependency(localDepency);

    if (localDepency){
      const { dependencyName, dependencyStoreKey, dependencyMinimumVersion } = localDepency;
      switch (dependencyStoreKey.toLocaleLowerCase()) {
        case "node":
          setInstalled(dependencyContext.node);
          break;
        case "python":
          setInstalled(dependencyContext.python);
          break;
        case "netcore":
          setInstalled(dependencyContext.netcore);
          break;
      }
        setDependencyMessage(intl.formatMessage(messages.notInstalled, {
          dependencyName: dependencyName,
          minimumVersion: dependencyMinimumVersion
        }));
    }
  },[dependencyContext]);

  return (
    <div>
      {!installed && dependency && dependencyMessage && (
      <a
        href={dependency.downloadLink}
        className={classnames(
          styles.dependencyContainer,
          styles.borderYellow
        )}
        target={"_blank"}
        rel="noreferrer noopener"
      >
        <Notification
          showWarning={true}
          text={dependencyMessage}
          altMessage={intl.formatMessage(messages.iconAltMessage)}
        />
      </a>
    )
    }</div>);
}

export default injectIntl(DependencyInfo);