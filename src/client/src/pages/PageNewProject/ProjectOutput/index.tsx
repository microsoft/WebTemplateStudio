import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import OutputPath from "../../../components/OutputPath";

import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getOutputPathValidation,
  getValidations
} from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

import styles from "./styles.module.css";

import {
  injectIntl,
  InjectedIntlProps
} from "react-intl";

import { AppState } from "../../../store/combineReducers";
import { IValidation} from "../../../utils/validations/validations";
import messages from "./messages";
import { getOutputPath as getOutputPathFromExtension } from "../../../utils/extensionService/extensionService";
import { setOutputPathAction } from "../../../store/userSelection/app/action";
import { IValidations } from "../../../store/config/validations/model";
import { AppContext } from "../../../AppContext";
import { EXTENSION_MODULES, EXTENSION_COMMANDS } from "../../../utils/constants/commands";

type Props = InjectedIntlProps;

const ProjectNameAndOutput = (props: Props) => {

  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const outputPath = useSelector(getOutputPath);
  const projectPathValidation = useSelector(getOutputPathValidation);

  React.useEffect(() => {
    if (outputPath === "") {
      getOutputPathFromExtension(vscode).then((event)=>{
        const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== null) {
          dispatch(setOutputPathAction(message.payload.outputPath));
        }
      })
    }
  }, [vscode]);

  const handleSaveClick = () => {
    vscode.postMessage({
      module: EXTENSION_MODULES.VALIDATOR,
      command: EXTENSION_COMMANDS.GET_OUTPUT_PATH,
      track: false
    });
  };

  return (
    <React.Fragment>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.outputPathTitle)}
        </div>
        <div>
          <OutputPath
            handleSaveClick={handleSaveClick}
            value={outputPath}
            validation={projectPathValidation}
            isEmpty={projectPathValidation && outputPath.length === 0}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(ProjectNameAndOutput);