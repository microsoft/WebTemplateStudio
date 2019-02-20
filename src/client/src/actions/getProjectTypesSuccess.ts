import { IOption } from "../types/option";
import * as Actions from "./types";

const getProjectTypesSuccess = (items: IOption[]) => ({
  type: Actions.GET_PROJECT_TYPES_SUCCESS,
  payload: items
});

export { getProjectTypesSuccess };
