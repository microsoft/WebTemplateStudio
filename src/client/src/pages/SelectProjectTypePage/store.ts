import { AppState } from "../../store/combineReducers";

import { IStoreProps } from "./interfaces";

//TODO: THIS VS selector??
const mapStateToProps = (state: AppState): IStoreProps => {
  return {
    options: state.templates.projectTypesOptions,
  };
};

export { mapStateToProps };
