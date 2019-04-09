import * as Actions from "../actions/types";
import { IVersions } from "../types/version";

/* State Shape
{
    {
        templatesVersion: string,
        wizardVersion: string
    }
}
*/

const initialState = {
  templatesVersion: "",
  wizardVersion: ""
};

const versions = (state: IVersions = initialState, action: any) => {
  switch (action.type) {
    case Actions.GET_VERSIONS:
      return action.payload;
    default:
      return state;
  }
};

export default versions;
