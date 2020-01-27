import * as React from "react";
import { connect } from "react-redux";

import SelectBackEndFramework from "./SelectBackendFramework";
import SelectFrontEndFramework from "./SelectFrontEndFramework";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  FRAMEWORK_TYPE
} from "../../utils/constants";

import {getFrameworks} from "../../utils/extensionService/extensionService";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { IOption } from "../../types/option";
import { parseFrameworksPayload } from "../../utils/parseFrameworksPayload";
import { getBackendFrameworksSuccess } from "../../actions/wizardContentActions/getBackendFrameworks";
import { getFrontendFrameworksSuccess } from "../../actions/wizardContentActions/getFrontendFrameworks";

interface ISelectFrameworksProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
}

interface IDispatchProps {
  getBackendFrameworksSuccess: (frameworks: IOption[]) => any;
  getFrontendFrameworksSuccess: (frameworks: IOption[]) => any;
}

type Props = ISelectFrameworksProps & IDispatchProps;

const SelectFrameworks = (props:Props) => {
  React.useEffect(()=>{
    const { vscode, isPreview, getFrontendFrameworksSuccess, getBackendFrameworksSuccess } = props;
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
    getFrameworks({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
      payload: {
        isPreview: isPreview,
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
      }
    }, vscode).then((event:any)=>{
      let message = event.data;
      getFrontendFrameworksSuccess(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.FRONTEND,
          message.payload.isPreview
        )
      );
      getBackendFrameworksSuccess(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.BACKEND,
          message.payload.isPreview
        )
    );
    });
  },[]);

  return (
    <div>
      <SelectFrontEndFramework />
      <SelectBackEndFramework />
    </div>
  );
}

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  getBackendFrameworksSuccess: (frameworks: IOption[]) => {
    dispatch(getBackendFrameworksSuccess(frameworks));
  },
  getFrontendFrameworksSuccess: (frameworks: IOption[]) => {
    dispatch(getFrontendFrameworksSuccess(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrameworks);
