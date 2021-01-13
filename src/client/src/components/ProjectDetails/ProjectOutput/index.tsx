import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import {
  getOutputPath,
  getOutputPathValidation,
} from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { setOutputPathAction } from "../../../store/userSelection/app/action";
import { getOutputPathFromConfig, browseNewOutputPath } from "../../../utils/extensionService/extensionService";

import OutputPath from "../../OutputPath";
import { AppContext } from "../../../AppContext";

import styles from "./styles.module.css";
import messages from "./messages";
import rightsidebarStyles from "../../RightSidebar/rightsidebarStyles.module.css";

interface IProps {
  isRightsidebar?: boolean;
}

type Props = IProps & InjectedIntlProps;

const ProjectOutput = (props: Props) => {
  const dispatch = useDispatch();
  const { formatMessage } = props.intl;
  const { vscode } = React.useContext(AppContext);
  const outputPath = useSelector(getOutputPath);
  const projectPathValidation = useSelector(getOutputPathValidation);

  React.useEffect(() => {
    if (outputPath === "" && !props.isRightsidebar) {
      getOutputPathFromConfig(vscode).then((event) => {
        const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== null) {
          dispatch(setOutputPathAction(message.payload.outputPath));
        }
      });
    }
  }, [vscode]);

  const handleSaveClick = () => {
    browseNewOutputPath(vscode).then((event) => {
      const message = event.data;
      if (message.payload !== null && message.payload.outputPath !== undefined) {
        dispatch(setOutputPathAction(message.payload.outputPath));
      }
    });
  };

  return (
    <>
      <div className={props.isRightsidebar ? styles.inputContainer : rightsidebarStyles.inputContainer}>
        <h3>{formatMessage(messages.outputPathTitle)}</h3>
        <div>
          <OutputPath
            handleSaveClick={handleSaveClick}
            value={outputPath}
            validation={projectPathValidation}
            isEmpty={projectPathValidation && outputPath.length === 0}
          />
        </div>
      </div>
    </>
  );
};

export default injectIntl(ProjectOutput);
