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
  isPreview: boolean;
}

type Props = ISelectFrameworksProps;

class SelectFrameworks extends React.Component<Props> {
  componentDidMount() {
    const { vscode, isPreview } = this.props;
    if (isPreview) {
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
    }
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
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(SelectFrameworks);
