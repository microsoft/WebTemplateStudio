import masterdetail from "../assets/masterdetail.svg";
import contentgrid from "../assets/contentgrid.svg";
import longlist from "../assets/longlist.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + masterdetail,
    title: "Master Detail",
    internalName: "wts.Page.React.MasterDetail",
    body:
      "The introductory page of a website, typically serving as a table of contents for a site.",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + contentgrid,
    title: "Content Grid",
    internalName: "wts.Page.React.ContentGrid",
    body:
      "A discussion or an informational website consisting of discrete, often informational diary-style text entries",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + longlist,
    title: "Long List",
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
