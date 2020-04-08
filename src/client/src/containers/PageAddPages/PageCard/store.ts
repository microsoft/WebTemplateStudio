import { AppState } from "../../../store/combineReducers";
import { IStateProps } from "./interfaces";


const mapStateToProps = (state: AppState): IStateProps => {
  //const { frontendFramework, backendFramework } = state.selection;
  return {
    selectedPages: state.userSelection.pages,
    selectedFrontend: state.userSelection.frontendFramework,
    pageOutOfBounds: state.userSelection.pages.length>=20
  };
};

export {mapStateToProps};