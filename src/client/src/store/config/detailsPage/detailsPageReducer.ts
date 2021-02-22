import { IDetail } from "./model";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../../navigation/typeKeys";
import RootAction from "../../ActionType";

const initialState = {
  isIntlFormatted: false,
  data: {
    title: "",
    internalName: "",
    body: "",
    name: "",
    displayName: "",
    summary: "",
    longDescription: "",
    order: 0,
    icon: "",
    licenses: [],
    selected: false,
    author: "",
    tags: undefined,
  },
  originRoute: "",
};

const detailPage = (state: IDetail = initialState, action: RootAction): IDetail => {
  switch (action.type) {
    case NAVIGATION_ROUTES_TYPEKEYS.SET_DETAILS_PAGE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default detailPage;
