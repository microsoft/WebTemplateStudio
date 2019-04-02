import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import { EXTENSION_COMMANDS } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

interface IStateProps {
  isTemplateGenerated: boolean;
  isTemplatesFailed: boolean;
  templateGenStatus: string;
  isModalOpen: boolean;
  isServicesDeployed: boolean;
  isServicesFailed: boolean;
  isServicesSelected: boolean;
  vscode: IVSCodeObject;
  outputPath: string;
}

type Props = IStateProps;

const PostGenerationModal = ({
  isServicesDeployed,
  isTemplateGenerated,
  templateGenStatus,
  outputPath,
  vscode,
  isTemplatesFailed,
  isServicesFailed,
  isServicesSelected
}: Props) => {
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
  const generationMessage = () => {
    if (isTemplatesFailed) {
      return "Templates failed to generate.";
    } else if (!isTemplateGenerated) {
      return (
        <React.Fragment>
          <Spinner className={styles.spinner} />
          Working
        </React.Fragment>
      );
    } else if (isTemplateGenerated) {
      return "Open Project in VSCode";
    }
    return "Unknown status";
  };
  const servicesMessage = () => {
    if (!isServicesSelected) {
      return "No services to deploy.";
    }
    if (isServicesFailed) {
      return "Services failed to deploy.";
    } else if (isServicesDeployed) {
      return "Deployed services.";
    }
    return <div className={styles.loading}>Deploying services</div>;
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
      {servicesMessage()}
      <div className={styles.footerContainer}>
        <div>Help</div>
        <div
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleOpenProject}
        >
          {generationMessage()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isModalOpen: isPostGenModalOpenSelector(state),
  isTemplateGenerated: PostGenSelectors.isTemplateGeneratedSelector(state),
  isTemplatesFailed: PostGenSelectors.isTemplatesFailedSelector(state),
  templateGenStatus: PostGenSelectors.getSyncStatusSelector(state),
  isServicesSelected: PostGenSelectors.isServicesSelectedSelector(state),
  isServicesDeployed: PostGenSelectors.isServicesDeployedSelector(state),
  isServicesFailed: PostGenSelectors.isServicesFailureSelector(state),
  vscode: getVSCodeApiSelector(state),
  outputPath: state.selection.outputPath
});

export default connect(mapStateToProps)(asModal(PostGenerationModal));
