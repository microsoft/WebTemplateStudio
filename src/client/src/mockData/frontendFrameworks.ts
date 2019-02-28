import Angular from "../assets/angular.svg";
import Vue from "../assets/vueJS.svg";

import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + Vue,
    title: "Vue.JS",
    internalName: "Vue",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false,
    unselectable: true
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + Angular,
    title: "AngularJS",
    internalName: "Angular",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false,
    unselectable: true
  }
];

const getFrontendFrameworks = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getFrontendFrameworks;
