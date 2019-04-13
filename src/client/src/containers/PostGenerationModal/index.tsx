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
  serviceStatus: PostGenSelectors.IAzureServiceStatus;
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
  help: {
    id: "postGenerationModal.help",
    defaultMessage: "Report an issue"
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
  serviceStatus,
  isTemplateGenerated,
  templateGenStatus,
  outputPath,
  vscode,
  intl,
  isTemplatesFailed,
  isServicesSelected
}: Props) => {
  const handleOpenProject = () => {
    if (isTemplateGenerated) {
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
      return "Restart Wizard";
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
  const renderServiceStatus = () => {
    if (isTemplatesFailed) {
      return "ERROR: Halted due to template error.";
    }
    return Object.keys(serviceStatus).map((service: string) => {
      const serviceTitle = intl.formatMessage(serviceStatus[service].title);
      if (serviceStatus[service].isSelected) {
        if (serviceStatus[service].isFailed) {
          return <div>{`ERROR: ${serviceTitle} failed to deploy.`}</div>;
        }
        if (serviceStatus[service].isDeployed) {
          return <div>{`${serviceTitle} is deployed on Azure.`}</div>;
        }
        return (
          <div className={styles.loading}>
            {`Deploying ${intl.formatMessage(serviceStatus[service].title)}`}
          </div>
        );
      }
    });
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
        <div>
          {isTemplatesFailed && "ERROR: Templates could not be generated"}
        </div>
        {!isTemplateGenerated && !isTemplatesFailed && (
          <div>{templateGenStatus}</div>
        )}
        {isTemplateGenerated && (
          <div>{intl.formatMessage(messages.generationComplete)}</div>
        )}
        {isTemplateGenerated && (
          <button className={styles.openProject} onClick={handleOpenProject}>
            {intl.formatMessage(messages.openInCode)}
          </button>
        )}
      </div>
      {isServicesSelected && (
        <div>
          <div className={styles.section}>
            {intl.formatMessage(messages.azureServices)}
          </div>
          {renderServiceStatus()}
        </div>
      )}
      <div className={styles.footerContainer}>
        <a
          className={styles.link}
          href="https://github.com/Microsoft/WebTemplateStudio/issues"
        >
          {intl.formatMessage(messages.help)}
        </a>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleOpenProject}
        >
          {generationMessage()}
        </button>
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
  serviceStatus: PostGenSelectors.isServicesDeployedSelector(state),
  vscode: getVSCodeApiSelector(state),
  outputPath: getOutputPath(state)
});

export default connect(mapStateToProps)(
  asModal(injectIntl(PostGenerationModal))
);
