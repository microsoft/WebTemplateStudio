import { IOption } from "../../../types/option";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../store/combineReducers";
import RootAction from "../../../store/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { ISelected } from "../../../types/selected";
import { setPagesAction } from "../../../store/selection/pages/action";
import { setDetailPageAction, setPageWizardPageAction } from "../../../store/templates/pages/action";
import { ROUTES } from "../../../utils/constants";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setPages: (pages: ISelected[]) => {
    dispatch(setPagesAction(pages));
  },
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(detailPageInfo, false, ROUTES.SELECT_PAGES));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  //const { frontendFramework, backendFramework } = state.selection;
  return {
    selectedPages: state.selection.pages,
    selectedFrontend: state.selection.frontendFramework,
    pageOutOfBounds: state.selection.pages.length>=20
  };
};

export {mapDispatchToProps, mapStateToProps};