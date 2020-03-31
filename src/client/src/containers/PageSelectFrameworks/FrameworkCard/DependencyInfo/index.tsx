import * as React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import classnames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../../../utils/constants";
import { AppState } from "../../../../store/combineReducers";
import Notification from "../../../../components/Notification";
import messages from "./messages";

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
    dependencyMinimumVersion: "v10.15+",
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
  }
};

const frameworkNameToDependencyMap: Map<string, IDependency> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, dependencies.Python],
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, dependencies.Node],
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, dependencies.Node]
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
  const dependenciesStore = useSelector((state: AppState) => state.dependencyInfo.dependencies);

  React.useEffect(()=>{
    const localDepency = frameworkNameToDependencyMap.get(frameworkName);
    setDependency(localDepency);

    if (localDepency){
      const {
        dependencyName,
        dependencyStoreKey,
        dependencyMinimumVersion
      } = localDepency;
      if (dependenciesStore[dependencyStoreKey]){
        setInstalled(dependenciesStore[dependencyStoreKey].installed);
        setDependencyMessage(installed
          ? ""
          : intl.formatMessage(messages.notInstalled, {
              dependencyName: dependencyName,
              minimumVersion: dependencyMinimumVersion
            }));
      }
    }
  },[]);

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