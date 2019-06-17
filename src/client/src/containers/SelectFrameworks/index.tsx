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
    // send messages to extension to check dependency info when this component loads
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
    return (
      <div className={styles.container}>
        <SelectFrontEndFramework />
        <SelectBackEndFramework />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): any => {
  return {
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(SelectFrameworks);
