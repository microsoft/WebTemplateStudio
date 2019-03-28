import blankpage from "../assets/blankpage.svg";
import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + blankpage,
    title: "Full Stack App",
    internalName: "FullstackApp",
    body: "A single page application with a local back-end server.",
    selected: false
  },
  {
    svgUrl: undefined,
    title: "RESTful API",
    internalName: "RestulfApi",
    body: "A RESTful API with no front-end user interface.",
    selected: false
  }
];

const getWebAppOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getWebAppOptions;
