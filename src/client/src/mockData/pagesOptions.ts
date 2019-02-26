import masterdetail from "../assets/masterdetailwhite.svg";
import contentgrid from "../assets/contentgrid.svg";
import list from "../assets/list.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + masterdetail,
    title: "Master Detail",
    originalTitle: "Master Detail",
    internalName: "wts.Page.React.MasterDetail",
    body:
      "The introductory page of a website, typically serving as a table of contents for a site.",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + contentgrid,
    title: "Content Grid",
    originalTitle: "Content Grid",
    internalName: "wts.Page.React.ContentGrid",
    body:
      "A discussion or an informational website consisting of discrete, often informational diary-style text entries",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + list,
    title: "List",
    originalTitle: "List",
    internalName: "wts.Page.ReactNode.List",
    body:
      "A page used to allow the visitor to contact the website or people who are responsible for the maintenance of the site.",
    selected: false
  }
];

const getPagesOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getPagesOptions;
