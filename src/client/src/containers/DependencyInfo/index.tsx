import * as React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import * as getSvg from "../../utils/getSvgUrl";
import classnames from "classnames";
import { injectIntl, defineMessages, InjectedIntl } from "react-intl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import { AppState } from "../../reducers";
import { IDependenciesInstalled } from "../../reducers/dependencyInfoReducers";
import * as ModalActions from "../../actions/modalActions/modalActions";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

const messages = defineMessages({
  installed: {
    id: "dependencyChecker.installed",
    defaultMessage: "{dependencyName} detected!"
  },
  notInstalled: {
    id: "dependencyChecker.notInstalled",
    defaultMessage:
      "{dependencyName} {minimumVersion} not detected. Click to install."
  },
  iconAltMessage: {
    id: "dependencyChecker.iconAltMessage",
    defaultMessage: "Icon for dependency checker"
  }
});

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
  NodeJS: {
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
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_JS, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE, dependencies.NodeJS],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, dependencies.Python],
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS, dependencies.NodeJS]
]);

interface IDependencyInfoProps {
  dependenciesStore: IDependenciesInstalled;
  frameworkName: string;
  intl: InjectedIntl;
}

interface IDispatchProps {
  openPrivacyModal: (dependency: IDependency | undefined) => any;
}

type Props = IDependencyInfoProps & IDispatchProps;

/*
 * Props:
 * - frameworkName: string
 */
class DependencyInfo extends React.Component<Props> {
  public render() {
    let {
      frameworkName,
      intl,
      dependenciesStore,
      openPrivacyModal
    } = this.props;
    let dependency: IDependency | undefined = frameworkNameToDependencyMap.get(
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
    const installed: boolean = dependenciesStore[dependencyStoreKey].installed;

    let dependencyMessage: string = installed
      ? intl.formatMessage(messages.installed, {
          dependencyName: dependencyName
        })
      : intl.formatMessage(messages.notInstalled, {
          dependencyName: dependencyName,
          minimumVersion: dependencyMinimumVersion
        });

    let icon: any = installed
      ? getSvg.getGreenCheckSvg()
      : getSvg.getWarningSvg();

    return (
      <div
        role="button"
        onClick={() => openPrivacyModal(dependency)}
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
          {`${dependencyMessage}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): any => {
  return {
    dependenciesStore: state.dependencyInfo.dependencies
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openPrivacyModal: (dependency: IDependency | undefined) => {
    dispatch(ModalActions.openPrivacyModalAction(dependency));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DependencyInfo));
