import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants";
import fullstack from "../assets/fullstackwhite.svg";
import react from "../assets/react.svg";
import node from "../assets/nodeJS.svg";
import masterdetailwhite from "../assets/masterdetailwhite.svg";
import grid from "../assets/contentgridwhite.svg";
import list from "../assets/listwhite.svg";
import azurefunctions from "../assets/azurefunctions.svg";
import cosmosdb from "../assets/cosmosdbwhite.svg";
import blankpage from "../assets/blankpagewhite.svg";

const SVG_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP]: fullstack,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_JS]: react,
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS]: node,
  [WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL]: masterdetailwhite,
  [WIZARD_CONTENT_INTERNAL_NAMES.CONTENT_GRID]: grid,
  [WIZARD_CONTENT_INTERNAL_NAMES.LIST]: list,
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: azurefunctions,
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: cosmosdb,
  [WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE]: blankpage
};

const withLocalPath = (absolutePath: string): string => {
  return process.env.REACT_APP_RELATIVE_PATH + absolutePath;
};

export default (internalName: string): string | undefined => {
  if (SVG_MAPPINGS[internalName] !== undefined) {
    return withLocalPath(SVG_MAPPINGS[internalName]);
  }
};
