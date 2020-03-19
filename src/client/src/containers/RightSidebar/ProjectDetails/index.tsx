import * as React from "react";
import { useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import messages from "../strings";
import { getOutputPath, getProjectName } from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../../reducers";

type Props = InjectedIntlProps;

const ProjectDetails = (props: Props)=>{
  const outputPath: string = useSelector((state: AppState) => getOutputPath(state));
  const projectName: string = useSelector((state: AppState) => getProjectName(state));

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
          {formatMessage(messages.projectName)}:
          <span title={projectName} className={styles.value}>
            {projectName}
          </span>
        </div>
        <div className={styles.projectStatic}>
          {formatMessage(messages.location)}:
          <span title={outputPath} className={styles.value}>
            {outputPath}
          </span>
        </div>
      </div>
      <div className={styles.decoratedLine} />
    </React.Fragment>
  );
}

export default injectIntl(ProjectDetails);