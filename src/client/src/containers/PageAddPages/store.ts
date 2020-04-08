import { AppState } from "../../store/combineReducers";

import { IStoreProps } from "./interfaces";

const mapStateToProps = (state: AppState): IStoreProps => {
  return {
    options: state.templates.pageOptions,
    pageOutOfBounds: state.selection.pages.length>=20
  };
};

export { mapStateToProps};