import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { AppContext } from "../../../AppContext";
import { setOutputPathAction } from "../../../store/userSelection/app/action";
import {
  getOutputPath,
  getOutputPathValidation,
} from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { browseNewOutputPath, getOutputPathFromConfig } from "../../../utils/extensionService/extensionService";
import OutputPath from "../../OutputPath";
import rightsidebarStyles from "../../RightSidebar/rightsidebarStyles.module.css";
import InputTitle from "../../Titles/TitleForInput";
import messages from "./messages";
import styles from "./styles.module.css";

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
        <InputTitle>{formatMessage(messages.outputPathTitle)}</InputTitle>
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
