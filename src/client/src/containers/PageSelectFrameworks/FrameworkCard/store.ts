import { AppState } from "../../../store/combineReducers";
import { IStateProps } from "./interfaces";

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.config;
  const { frontendFramework, backendFramework } = state.userSelection;
  return {
    isPreview: previewStatus,
    frontEndSelect: frontendFramework,
    backEndSelect: backendFramework
  };
};

export {mapStateToProps};