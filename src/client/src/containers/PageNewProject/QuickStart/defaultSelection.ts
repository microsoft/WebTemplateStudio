import { ISelected } from "../../../types/selected";

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

export {
  FRONT_END_SELECTION,
  BACK_END_SELECTION
};
