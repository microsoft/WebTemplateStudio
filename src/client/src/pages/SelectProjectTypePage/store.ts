import { AppState } from "../../store/combineReducers";

import { IStoreProps } from "./interfaces";

const mapStateToProps = (state: AppState): IStoreProps => {
  return {
    options: state.templates.projectTypesOptions,
  };
};

export { mapStateToProps };
