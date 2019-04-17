import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";
import { IDetail } from "../../actions/wizardInfoActions/setDetailsPage";

/* State Shape
{
    details: {
      data: IOption,
      isIntlFormatted: boolean
    }
}
*/

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
