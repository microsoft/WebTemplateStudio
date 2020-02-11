import { IOption } from "../../../types/option";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../reducers";
import RootAction from "../../../actions/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { ISelected } from "../../../types/selected";
import { setDetailPageAction } from "../../../actions/wizardInfoActions/setDetailsPage";
import {
  selectPagesAction
} from "../../../actions/wizardSelectionActions/selectPages";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  //const { frontendFramework, backendFramework } = state.selection;
  return {
    vscode: getVSCodeApiSelector(state),
    selectedPages: state.selection.pages,
    selectedFrontend: state.selection.frontendFramework,
    pageOutOfBounds: state.selection.pages.length>=20
  };
};

export {mapDispatchToProps, mapStateToProps};