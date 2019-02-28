import NET from "../assets/net.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + NET,
    title: "ASP.NET",
    internalName: "Node",
    body:
      "ASP.NET creates websites based on HTML5, CSS and JavaScript that are simple, fast and scalable.",
    selected: false,
    unselectable: true
  }
];


const getBackendFrameworks = (): Promise<IOption[]> => {
  return Promise.resolve(options);
}

export default getBackendFrameworks;