import blankpage from "../../assets/blankpage.svg";
import { IOption } from "../../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + blankpage,
    title: "Full Stack App",
    body: "A single page application with a local back-end server.",
    selected: false
  },
  {
    svgUrl: undefined,
    title: "RESTful API",
    body: "A RESTful API with no front-end user interface.",
    selected: false
  }
];

export default options;
