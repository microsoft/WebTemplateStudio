import { ISelected } from "../../types/selected";

const FRONT_END_SELECTION: ISelected = {
  author: "Facebook",
  internalName: "ReactJS",
  licenses:
    "[ReactJS](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)",
  title: "React",
  version: "v16.8.4"
};

const BACK_END_SELECTION: ISelected = {
  author: "Various",
  internalName: "NodeJS",
  licenses:
    "[NodeJS](https://github.com/nodejs/node/blob/master/LICENSE)  \n[ExpressJS](https://github.com/expressjs/express/blob/master/LICENSE)  \n[ExpressJS Generator](https://github.com/expressjs/generator/blob/master/LICENSE)",
  title: "Node.js/Express",
  version: "v10.15.0"
};

const PAGES_SELECTION: ISelected[] = [
  {
    title: "Blank",
    internalName: "wts.Page.React.Blank",
    id: "Blank",
    defaultName: "Blank",
    isValidTitle: true,
    licenses: [
      {
        text: "Bootstrap",
        url: "https://github.com/twbs/bootstrap/blob/master/LICENSE"
      }
    ],
    author: "Microsoft"
  }
];

export { FRONT_END_SELECTION, BACK_END_SELECTION, PAGES_SELECTION };
