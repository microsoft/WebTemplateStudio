import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

import SelectBackEndFramework from "../SelectBackendFramework";
import SelectFrontEndFramework from "../SelectFrontEndFramework";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { EXTENSION_MODULES, EXTENSION_COMMANDS } from "../../utils/constants";

interface ISelectFrameworksProps {
  vscode: IVSCodeObject;
}

type Props = ISelectFrameworksProps;

class SelectFrameworks extends React.Component<Props> {
  componentDidMount() {
    const { vscode } = this.props;
    // send messages to extension to check dependency info when this component loads
    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "node"
      }
    });
    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "python"
      }
    });
  }

  render() {
    return (
      <div>
        <SelectFrontEndFramework />
        <SelectBackEndFramework />
      </div>
    );
  }
}

interface IStateProps {
  vscode: IVSCodeObject;
}

const mapStateToProps = (state: AppState): IStateProps => {
  return {
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(SelectFrameworks);
