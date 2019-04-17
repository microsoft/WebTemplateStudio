import { IVersions } from "../types/version";
import { WIZARD_INFO_TYPEKEYS } from "../actions/wizardInfoActions/typeKeys";

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
    case WIZARD_INFO_TYPEKEYS.GET_VERSIONS:
      return action.payload;
    default:
      return state;
  }
};

export default versions;
