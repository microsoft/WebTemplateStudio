import { AppState } from "../../reducers";
import { IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";


const mapStateToProps = (state: AppState): IStateProps => {
  const { frontendOptions, backendOptions } = state.wizardContent;
  return {
    frontendOptions,
    backendOptions,
    vscode: getVSCodeApiSelector(state)
  };
};

export {mapStateToProps};