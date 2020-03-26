import { IOption } from "../../../types/option";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../store/combineReducers";
import RootAction from "../../../store/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { ISelected } from "../../../types/selected";
import { setPagesAction } from "../../../store/selection/pages/action";
import { setDetailPageAction } from "../../../store/wizardContent/pages/action";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setPages: (pages: ISelected[]) => {
    dispatch(setPagesAction(pages));
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