import { AppState } from "../../reducers";

import { IStoreProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

const mapStateToProps = (state: AppState): IStoreProps => {
  return {
    vscode: getVSCodeApiSelector(state),
    options: state.wizardContent.pageOptions,
    selectedBackend: state.selection.backendFramework,
    selectedFrontend: state.selection.frontendFramework,
    selectedPages: state.selection.pages
  };
};

export { mapStateToProps};