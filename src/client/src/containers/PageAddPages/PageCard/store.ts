import { AppState } from "../../../store/combineReducers";
import { IStateProps } from "./interfaces";


const mapStateToProps = (state: AppState): IStateProps => {
  //const { frontendFramework, backendFramework } = state.selection;
  return {
    selectedPages: state.selection.pages,
    selectedFrontend: state.selection.frontendFramework,
    pageOutOfBounds: state.selection.pages.length>=20
  };
};

export {mapStateToProps};