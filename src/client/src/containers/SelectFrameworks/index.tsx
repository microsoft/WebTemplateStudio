import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

import SelectBackEndFramework from "../SelectBackendFramework";
import SelectFrontEndFramework from "../SelectFrontEndFramework";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import DependencyInfo from "../../components/DependencyInfo";

import { AppState } from "../../reducers";

interface ISelectFrameworksProps {
  vscode: any;
  dependencies: any;
  selectedBackend: any;
}

type Props = ISelectFrameworksProps;

class SelectFrameworks extends React.Component<Props> {
  componentDidMount() {
    const { vscode } = this.props;
    // send messages to extension to check dependency info when this page loads
    vscode.postMessage({
      module: "DependencyChecker",
      command: "check-dependency",
      payload: {
        dependency: "node"
      }
    });
    vscode.postMessage({
      module: "DependencyChecker",
      command: "check-dependency",
      payload: {
        dependency: "python"
      }
    });
    console.log("posting message");
    console.log(this.props.dependencies);
  }

  render() {
    console.log(this.props.selectedBackend);
    return (
      <div className={styles.container}>
        {this.props.dependencies.node && (
          <DependencyInfo
            frameworkName={"node"}
            installationState={this.props.dependencies.node.installationState}
          />
        )}
        {this.props.dependencies.python &&
          this.props.selectedBackend &&
          // dependency info for python will only be shown if Flask is selected
          this.props.selectedBackend.internalName === "Flask" && (
            <DependencyInfo
              frameworkName={"python"}
              installationState={
                this.props.dependencies.python.installationState
              }
            />
          )}
        <SelectFrontEndFramework />
        <SelectBackEndFramework />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): any => {
  const { backendFramework } = state.selection;

  return {
    vscode: getVSCodeApiSelector(state),
    dependencies: state.dependencyInfo.dependencies,
    selectedBackend: backendFramework
  };
};

export default connect(mapStateToProps)(SelectFrameworks);
