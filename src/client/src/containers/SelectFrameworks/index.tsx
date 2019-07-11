import * as React from "react";
import { connect } from "react-redux";

import SelectBackEndFramework from "../SelectBackendFramework";
import SelectFrontEndFramework from "../SelectFrontEndFramework";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";

interface ISelectFrameworksProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
}

type Props = ISelectFrameworksProps;

class SelectFrameworks extends React.Component<Props> {
  componentDidMount() {
    const { vscode, isPreview } = this.props;
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
    // send extension commands to load frameworks
    vscode.postMessage({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
      payload: {
        isPreview: isPreview,
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
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
  isPreview: boolean;
}

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(SelectFrameworks);
