import masterdetail from "../assets/masterdetailwhite.svg";
import contentgrid from "../assets/contentgrid.svg";
import list from "../assets/list.svg";

import { IOption } from "../types/option";
import svgUrlLoader from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

const options: IOption[] = [
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL),
    title: "Master Detail",
    originalTitle: "Master Detail",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL,
    body:
      "The introductory page of a website, typically serving as a table of contents for a site.",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + contentgrid,
    title: "Content Grid",
    originalTitle: "Content Grid",
    internalName: "wts.Page.React.Grid",
    body:
      "A discussion or an informational website consisting of discrete, often informational diary-style text entries",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + list,
    title: "List",
    originalTitle: "List",
    internalName: "wts.Page.ReactNode.LongList",
    body:
      "A page used to allow the visitor to contact the website or people who are responsible for the maintenance of the site.",
    selected: false
  }
];

const getPagesOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getPagesOptions;
