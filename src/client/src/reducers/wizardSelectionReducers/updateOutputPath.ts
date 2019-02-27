import * as Actions from "../../actions/types";

/* State Shape
{
    outputPath: ""
}
*/

const outputPathReducer = (state = "Output_Path", action: any) => {
  switch (action.type) {
    case Actions.UPDATE_OUTPUT_PATH:
      return action.payload;
    default:
      return state;
  }
};

export default outputPathReducer;
