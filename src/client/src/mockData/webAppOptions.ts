import { IOption } from "../types/option";

const options: IOption[] = [
  {
    title: "Full Stack App",
    internalName: "FullstackApp",
    body: "A single page application with a local backend server.",
    selected: false,
    icon: "",

  },
  {
    title: "RESTful API",
    internalName: "RestulfApi",
    body: "A RESTful API with no frontend user interface.",
    selected: false,
    icon: "",
  }
];

const getWebAppOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getWebAppOptions;
