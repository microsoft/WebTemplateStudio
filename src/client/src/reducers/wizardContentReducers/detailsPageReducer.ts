import * as Actions from "../../actions/types";

/* State Shape
{
    details: {
      data: IOption,
      isIntlFormatted: boolean
    }
}
*/

const detailPage = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SET_DETAILS_PAGE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default detailPage;
