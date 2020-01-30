import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import { IDispatchProps, ISelectProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";
import { updatePageCountAction } from "../../actions/wizardSelectionActions/selectPages";

const mapStateToProps = (state: AppState): ISelectProps => {
  return {
    vscode: getVSCodeApiSelector(state),
    options: state.wizardContent.pageOptions,
    selectedBackend: state.selection.backendFramework,
    selectedFrontend: state.selection.frontendFramework,
    selectedPages: state.selection.pages
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
  }
});

export {mapDispatchToProps, mapStateToProps};