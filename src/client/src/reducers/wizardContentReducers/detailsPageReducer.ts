import * as Actions from "../../actions/types";
import { IMetadata } from "../../types/metadata";

/* State Shape
{
    details: {
      data: IOption,
      isIntlFormatted: boolean
    }
}
*/

const initialState = {
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
};

const detailPage = (state: IMetadata = initialState, action: any) => {
  switch (action.type) {
    case Actions.SET_DETAILS_PAGE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default detailPage;
