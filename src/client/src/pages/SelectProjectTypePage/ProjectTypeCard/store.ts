import { AppState } from "../../../store/combineReducers";
import { IStateProps } from "./interfaces";

const mapStateToProps = (state: AppState): IStateProps => {
  const { projectType} = state.userSelection;
  return {
    projectTypeSelect: projectType,
  };
};

export { mapStateToProps };
