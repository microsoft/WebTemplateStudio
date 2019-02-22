import blankpage from "../assets/blankpage.svg";
import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl:
      "C:\\ProgramData\\CoreTemplateStudio\\Templates\\LocalEnv\\0.0.0.0\\_catalog\\projectTypes\\FullStackWebApp.svg",
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

const getWebAppOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getWebAppOptions;
