import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { FRONT_END_SELECTION, BACK_END_SELECTION } from "./defaultSelection";
import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";

const getAllFrameworks = (vscode: IVSCodeObject, isPreview: boolean) => {
  vscode.postMessage({
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
    payload: {
      isPreview: isPreview,
      projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
    }
  });
};

const getAllPages = (vscode: IVSCodeObject) => {
  vscode.postMessage({
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_PAGES,
    payload: {
      projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
      frontendFramework: FRONT_END_SELECTION.internalName,
      backendFramework: BACK_END_SELECTION.internalName
    }
  });
};

export { getAllFrameworks, getAllPages };
