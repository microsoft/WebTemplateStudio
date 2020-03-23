import { WIZARD_INFO_TYPEKEYS } from "../../store/wizardContent/typeKeys";
import WizardInfoType from "../../store/wizardContent/wizardInfoActionType";
import { IDetail } from "../../store/wizardContent/pages/model";

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
    position: 0,
    svgUrl: undefined,
    licenses: [],
    selected: false,
    author: "",
    tags: undefined
  }
};

const detailPage = (state: IDetail = initialState, action: WizardInfoType) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default detailPage;
