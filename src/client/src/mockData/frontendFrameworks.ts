import Angular from "../assets/angular.svg";
import Vue from "../assets/vueJS.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + Vue,
    title: "Vue.JS",
    internalName: "Vue",
    body:
      "Vue.JS is an open-source JavaScript framework for building user interfaces and single page applications.",
    selected: false,
    unselectable: true
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + Angular,
    title: "AngularJS",
    internalName: "Angular",
    body:
      "AngularJS is an open-source, front-end web application maintained by Google to develop single-page applications.",
    selected: false,
    unselectable: true
  }
];

const getFrontendFrameworks = (): Promise<IOption[]> => {
  return Promise.resolve(options);
}

export default getFrontendFrameworks;
