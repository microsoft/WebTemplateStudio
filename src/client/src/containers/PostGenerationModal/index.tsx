import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import {
  getSyncStatusSelector,
  isTemplateGeneratedSelector,
  isServicesDeployedSelector
} from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import { EXTENSION_COMMANDS } from "../../utils/constants";

interface IStateProps {
  isTemplateGenerated: boolean;
  templateGenStatus: string;
  isModalOpen: boolean;
  isServicesDeployed: boolean;
  vscode: any;
  outputPath: string;
}

type Props = IStateProps;

const PostGenerationModal = (props: Props) => {
  const {
    isServicesDeployed,
    isTemplateGenerated,
    templateGenStatus,
    outputPath,
    vscode
  } = props;
  const handleOpenProject = () => {
    if (isTemplateGenerated) {
      // @ts-ignore
      vscode.postMessage({
        command: EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE,
        payload: {
          outputPath
        }
      });
    }
  };
  return (
    <div>
      <div className={styles.title}>Generation Status</div>
      <div className={styles.section}>Template Generation</div>
      <div className={styles.templateStatus}>
        {!isTemplateGenerated && <div>{templateGenStatus}</div>}
        {isTemplateGenerated && <div>Generation complete</div>}
        {isTemplateGenerated && (
          <button className={styles.openProject} onClick={handleOpenProject}>
            Open Project in VSCode
          </button>
        )}
      </div>
      <div className={styles.section}>Azure Services</div>
      {!isServicesDeployed && (
        <div className={styles.loading}>Deploying services</div>
      )}
      {isServicesDeployed && <div>Services deployed</div>}
      <div className={styles.footerContainer}>
        <div>Help</div>
        <div
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleOpenProject}
        >
          {!isTemplateGenerated && (
            <React.Fragment>
              <Spinner className={styles.spinner} />
              Working
            </React.Fragment>
          )}
          {isTemplateGenerated && `Open Project in VSCode`}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isModalOpen: isPostGenModalOpenSelector(state),
  isTemplateGenerated: isTemplateGeneratedSelector(state),
  templateGenStatus: getSyncStatusSelector(state),
  isServicesDeployed: isServicesDeployedSelector(state),
  vscode: state.vscode.vscodeObject,
  outputPath: state.selection.outputPath
});

export default connect(mapStateToProps)(asModal(PostGenerationModal));
