import { AppState } from "../../reducers";

import { IStoreProps } from "./interfaces";

const mapStateToProps = (state: AppState): IStoreProps => {
  return {
    options: state.wizardContent.pageOptions,
    pageOutOfBounds: state.selection.pages.length>=20
  };
};

export { mapStateToProps};