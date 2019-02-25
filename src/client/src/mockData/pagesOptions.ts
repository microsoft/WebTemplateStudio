import blogpage from "../assets/blogpage.svg";
import contactpage from "../assets/contactpage.svg";
import homepage from "../assets/homepage.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + homepage,
    title: "Home Page",
    body:
      "The introductory page of a website, typically serving as a table of contents for a site.",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + blogpage,
    title: "Blog Page",
    body:
      "A discussion or an informational website consisting of discrete, often informational diary-style text entries",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + contactpage,
    title: "Contact Page",
    body:
      "A page used to allow the visitor to contact the website or people who are responsible for the maintenance of the site.",
    selected: false
  }
];

const getPagesOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
}

export default getPagesOptions;
