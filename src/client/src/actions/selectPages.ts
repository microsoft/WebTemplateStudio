import * as Actions from "./types";
import { ISelected } from "../types/selected";

const selectPagesAction = (pages: ISelected[]) => ({
  type: Actions.SELECT_PAGES,
  payload: pages
});

export { selectPagesAction };
