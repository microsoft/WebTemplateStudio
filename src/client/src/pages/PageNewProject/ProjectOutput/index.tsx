import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import OutputPath from "../../../components/OutputPath";

import {
  getOutputPath,
  getOutputPathValidation
} from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

import styles from "./styles.module.css";

import {
  injectIntl,
  InjectedIntlProps
} from "react-intl";

import messages from "./messages";
import { getOutputPathFromConfig, browseNewOutputPath } from "../../../utils/extensionService/extensionService";
import { setOutputPathAction } from "../../../store/userSelection/app/action";
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
      getOutputPathFromConfig(vscode).then((event)=>{
        const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== null) {
          dispatch(setOutputPathAction(message.payload.outputPath));
        }
      })
    }
  }, [vscode]);

  const handleSaveClick = () => {
    browseNewOutputPath(vscode).then(event => {
      const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== undefined) {
          dispatch(setOutputPathAction(message.payload.outputPath));
        }
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