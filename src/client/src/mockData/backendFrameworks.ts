import NET from "../assets/net.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + NET,
    title: "ASP.NET",
    internalName: "Node",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false,
    unselectable: true
  }
];

const getBackendFrameworks = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getBackendFrameworks;
