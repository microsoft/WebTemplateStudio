import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";
import { AppState } from "../../reducers";
import { getOutputPath } from "../../selectors/wizardSelectionSelector";

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

type Props = IStateProps & InjectedIntlProps;

const messages = defineMessages({
  failedToGenerate: {
    id: "postGenerationModal.failedToGenerate",
    defaultMessage: "Templates failed to generate."
  },
  working: {
    id: "postGenerationModal.working",
    defaultMessage: "Working"
  },
  openInCode: {
    id: "postGenerationModal.openInCode",
    defaultMessage: "Open Project in VSCode"
  },
  unknownStatus: {
    id: "postGenerationModal.unknownStatus",
    defaultMessage: "Unknown Status"
  },
  noServicesToDeploy: {
    id: "postGenerationModal.noServicesToDeploy",
    defaultMessage: "No services to deploy."
  },
  failedDeploy: {
    id: "postGenerationModal.failedDeploy",
    defaultMessage: "Services failed to deploy."
  },
  deployedServices: {
    id: "postGenerationModal.deployedServices",
    defaultMessage: "Deployed services."
  },
  deployingServices: {
    id: "postGenerationModal.deployingServices",
    defaultMessage: "Deploying services"
  },
  help: {
    id: "postGenerationModal.help",
    defaultMessage: "Help"
  },
  azureServices: {
    id: "postGenerationModal.azureServices",
    defaultMessage: "Azure Services"
  },
  generationStatus: {
    id: "postGenerationModal.generationStatus",
    defaultMessage: "Generation Status"
  },
  generationComplete: {
    id: "postGenerationModal.generationComplete",
    defaultMessage: "Generation complete"
  },
  templateGeneration: {
    id: "postGenerationModal.templateGeneration",
    defaultMessage: "Template Generation"
  }
});

const PostGenerationModal = ({
  isServicesDeployed,
  isTemplateGenerated,
  templateGenStatus,
  outputPath,
  vscode,
  intl,
  isTemplatesFailed,
  isServicesFailed,
  isServicesSelected
}: Props) => {
  const handleOpenProject = () => {
    if (isTemplateGenerated) {
      // @ts-ignore
      vscode.postMessage({
        module: EXTENSION_MODULES.GENERATE,
        command: EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE,
        track: true,
        payload: {
          outputPath
        }
      });
    }
  };
  const generationMessage = () => {
    if (isTemplatesFailed) {
      return intl.formatMessage(messages.failedToGenerate);
    } else if (!isTemplateGenerated) {
      return (
        <React.Fragment>
          <Spinner className={styles.spinner} />
          {intl.formatMessage(messages.working)}
        </React.Fragment>
      );
    } else if (isTemplateGenerated) {
      return intl.formatMessage(messages.openInCode);
    }
    return intl.formatMessage(messages.unknownStatus);
  };
  const servicesMessage = () => {
    if (!isServicesSelected) {
      return intl.formatMessage(messages.noServicesToDeploy);
    }
    if (isServicesFailed) {
      return intl.formatMessage(messages.failedDeploy);
    } else if (isServicesDeployed) {
      return intl.formatMessage(messages.deployedServices);
    }
    return (
      <div className={styles.loading}>
        {intl.formatMessage(messages.deployingServices)}
      </div>
    );
  };
  return (
    <div>
      <div className={styles.title}>
        {intl.formatMessage(messages.generationStatus)}
      </div>
      <div className={styles.section}>
        {intl.formatMessage(messages.templateGeneration)}
      </div>
      <div className={styles.templateStatus}>
        {!isTemplateGenerated && <div>{templateGenStatus}</div>}
        {isTemplateGenerated && (
          <div>{intl.formatMessage(messages.generationComplete)}</div>
        )}
        {isTemplateGenerated && (
          <button className={styles.openProject} onClick={handleOpenProject}>
            {intl.formatMessage(messages.openInCode)}
          </button>
        )}
      </div>
      <div className={styles.section}>
        {intl.formatMessage(messages.azureServices)}
      </div>
      {servicesMessage()}
      <div className={styles.footerContainer}>
        <div>{intl.formatMessage(messages.help)}</div>
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

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isPostGenModalOpenSelector(state),
  isTemplateGenerated: PostGenSelectors.isTemplateGeneratedSelector(state),
  isTemplatesFailed: PostGenSelectors.isTemplatesFailedSelector(state),
  templateGenStatus: PostGenSelectors.getSyncStatusSelector(state),
  isServicesSelected: PostGenSelectors.isServicesSelectedSelector(state),
  isServicesDeployed: PostGenSelectors.isServicesDeployedSelector(state),
  isServicesFailed: PostGenSelectors.isServicesFailureSelector(state),
  vscode: getVSCodeApiSelector(state),
  outputPath: getOutputPath(state)
});

export default connect(mapStateToProps)(
  asModal(injectIntl(PostGenerationModal))
);
