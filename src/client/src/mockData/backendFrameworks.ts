import NET from "../assets/NET.svg";
import NodeJS from "../assets/NodeJS.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + NodeJS,
    title: "Node.JS",
    internalName: "Node",
    body:
      "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript outside of a browser.",
    selected: false
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + NET,
    title: "ASP.NET",
    internalName: "Node",
    body:
      "ASP.NET creates websites based on HTML5, CSS and JavaScript that are simple, fast and scalable.",
    selected: false
  }
];


const getBackendFrameworks = (): Promise<IOption[]> => {
  return Promise.resolve(options);
}

export default getBackendFrameworks;