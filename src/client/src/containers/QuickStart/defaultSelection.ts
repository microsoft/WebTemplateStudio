import { ISelected } from "../../types/selected";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";

const FRONT_END_SELECTION: ISelected = {
  author: "Facebook",
  internalName: "React",
  licenses:
    "[React](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)",
  title: "React",
  version: "v16.8.4"
};

const BACK_END_SELECTION: ISelected = {
  author: "Various",
  internalName: "Node",
  licenses:
    "[Node](https://github.com/nodejs/node/blob/master/LICENSE)  \n[Express](https://github.com/expressjs/express/blob/master/LICENSE)  \n[Express Generator](https://github.com/expressjs/generator/blob/master/LICENSE)",
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

const PAGE_TYPE_COUNT: IPageCount = {
  "wts.Page.React.Blank": 1
};

export {
  FRONT_END_SELECTION,
  BACK_END_SELECTION,
  PAGES_SELECTION,
  PAGE_TYPE_COUNT
};
