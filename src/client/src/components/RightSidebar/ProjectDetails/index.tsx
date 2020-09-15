import * as React from "react";
import { useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { AppState } from "../../../store/combineReducers";
import { getOutputPath } from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

import styles from "./styles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const ProjectDetails = (props: Props)=>{
  const outputPath: string = useSelector((state: AppState) => getOutputPath(state));

  const {
    intl
  } = props;
  const { formatMessage } = intl;

  return (
    <React.Fragment>
      <div className={styles.title}>
        {formatMessage(messages.yourProjectDetails)}
      </div>
      <div className={styles.statics}>
        <div className={styles.projectStatic}>
          {formatMessage(messages.location)}:
          <span title={outputPath} className={styles.value}>
            {outputPath}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default injectIntl(ProjectDetails);