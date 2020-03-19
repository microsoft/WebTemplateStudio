import * as React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import classnames from "classnames";
import { injectIntl, InjectedIntl } from "react-intl";
import {
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../../../utils/constants";
import { AppState } from "../../../../reducers";
import { IDependenciesInstalled } from "../../../../reducers/dependencyInfoReducers";
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
  intl: InjectedIntl;
}

interface IState {
  dependenciesStore: IDependenciesInstalled;
}

type Props = IState & IProps;

class DependencyInfo extends React.Component<Props> {
  public render() {
    const {
      frameworkName,
      intl,
      dependenciesStore
    } = this.props;
    const dependency: IDependency | undefined = frameworkNameToDependencyMap.get(
      frameworkName
    );

    if (dependency === undefined) {
      return null; // don't render anything
    }

    const {
      dependencyName,
      dependencyStoreKey,
      dependencyMinimumVersion
    } = dependency;

    if (dependenciesStore[dependencyStoreKey] === undefined) {
      return null;
    }
    const installed: boolean = dependenciesStore[dependencyStoreKey].installed;

    const dependencyMessage: string = installed
      ? ""
      : intl.formatMessage(messages.notInstalled, {
          dependencyName: dependencyName,
          minimumVersion: dependencyMinimumVersion
        });


    return (
      !installed && (
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
    );
  }
}

const mapStateToProps = (state: AppState): IState => {
  return {
    dependenciesStore: state.dependencyInfo.dependencies
  };
};

export default connect(
  mapStateToProps
)(injectIntl(DependencyInfo));