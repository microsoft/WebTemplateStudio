import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";

/* State Shape
{
    pages: ISelected[]
}
*/

const DEFAULT_PAGE_NAME = "Blank";
const DEFAULT_LICENSE = {
  text: "Bootstrap",
  url: "https://github.com/twbs/bootstrap/blob/master/LICENSE"
};

const pagesReducer = (
  state: ISelected[] = [
    {
      title: DEFAULT_PAGE_NAME,
      internalName: WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE,
      defaultName: DEFAULT_PAGE_NAME,
      id: DEFAULT_PAGE_NAME,
      isValidTitle: true,
      licenses: [DEFAULT_LICENSE],
      author: "Microsoft"
    }
  ],
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES:
      const newPages: ISelected[] = [...action.payload];
      return newPages;
    default:
      return state;
  }
};

export default pagesReducer;
