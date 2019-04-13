import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { AppState } from "../../reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../selectors/wizardSelectionSelector";
import { strings as messages } from "./strings";
import {
  resetWizardAction,
  IRESET_WIZARD
} from "../../actions/resetWizardAction";

interface IStateProps {
  isTemplateGenerated: boolean;
  isTemplatesFailed: boolean;
  isServicesDeployed: boolean;
  templateGenStatus: string;
  isModalOpen: boolean;
  serviceStatus: PostGenSelectors.IAzureServiceStatus;
  isServicesSelected: boolean;
  vscode: IVSCodeObject;
  outputPath: string;
}

interface IDispatchProps {
  resetWizard: () => any;
}

type Props = IStateProps & InjectedIntlProps & IDispatchProps;

const PostGenerationModal = ({
  serviceStatus,
  isTemplateGenerated,
  isServicesDeployed,
  templateGenStatus,
  outputPath,
  vscode,
  intl,
  isTemplatesFailed,
  isServicesSelected,
  resetWizard
}: Props) => {
  const { formatMessage } = intl;
  const LinkRenderer = (props: any) => (
    <a href={props.href} className={styles.link}>
      {props.children}
    </a>
  );
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
  const handleClick = () => {
    if (isTemplatesFailed) {
      resetWizard();
    }
    if (isTemplateGenerated && isServicesDeployed) {
      vscode.postMessage({
        module: EXTENSION_MODULES.GENERATE,
        command: EXTENSION_COMMANDS.CLOSE_WIZARD
      });
    }
  };
  const generationMessage = () => {
    if (isTemplatesFailed) {
      return formatMessage(messages.restartWizard);
    } else if (!isTemplateGenerated || !isServicesDeployed) {
      return (
        <React.Fragment>
          <Spinner className={styles.spinner} />
          {formatMessage(messages.working)}
        </React.Fragment>
      );
    } else if (isTemplateGenerated && isServicesDeployed) {
      return formatMessage(messages.closeWizard);
    }
    return formatMessage(messages.unknownStatus);
  };
  const renderServiceStatus = () => {
    if (isTemplatesFailed) {
      return formatMessage(messages.deploymentHalted);
    }
    return Object.keys(serviceStatus).map((service: string) => {
      const serviceTitle = formatMessage(serviceStatus[service].title);
      if (serviceStatus[service].isSelected) {
        if (serviceStatus[service].isFailed) {
          return (
            <div>{`${formatMessage(
              messages.error
            )} ${serviceTitle} ${formatMessage(
              messages.deploymentFailure
            )}`}</div>
          );
        }
        if (serviceStatus[service].isDeployed) {
          return (
            <ReactMarkdown
              source={`${serviceTitle} ${formatMessage(
                messages.deploymentSuccess
              )}`}
              renderers={{ link: LinkRenderer }}
            />
          );
        }
        return (
          <div className={styles.loading}>
            {`${formatMessage(messages.isDeploying)} ${formatMessage(
              serviceStatus[service].title
            )}`}
          </div>
        );
      }
    });
  };
  return (
    <div>
      <div className={styles.title}>
        {formatMessage(messages.generationStatus)}
      </div>
      <div className={styles.section}>
        {formatMessage(messages.templateGeneration)}
      </div>
      <div className={styles.templateStatus}>
        <div>
          {isTemplatesFailed && formatMessage(messages.failedToGenerate)}
        </div>
        {!isTemplateGenerated && !isTemplatesFailed && (
          <div>{templateGenStatus}</div>
        )}
        {isTemplateGenerated && !isTemplatesFailed && (
          <div>{formatMessage(messages.generationComplete)}</div>
        )}
        {isTemplateGenerated && !isTemplatesFailed && (
          <button className={styles.openProject} onClick={handleOpenProject}>
            {formatMessage(messages.openInCode)}
          </button>
        )}
      </div>
      {isServicesSelected && (
        <div>
          <div className={styles.section}>
            {formatMessage(messages.azureServices)}
          </div>
          {renderServiceStatus()}
        </div>
      )}
      <div className={styles.footerContainer}>
        <a
          className={styles.link}
          href="https://github.com/Microsoft/WebTemplateStudio/issues"
        >
          {formatMessage(messages.help)}
        </a>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleClick}
        >
          {generationMessage()}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isPostGenModalOpenSelector(state),
  isServicesDeployed: PostGenSelectors.isServicesDeployedSelector(state),
  isServicesSelected: PostGenSelectors.isServicesSelectedSelector(state),
  isTemplateGenerated: PostGenSelectors.isTemplateGeneratedSelector(state),
  isTemplatesFailed: PostGenSelectors.isTemplatesFailedSelector(state),
  outputPath: getOutputPath(state),
  serviceStatus: PostGenSelectors.servicesToDeploySelector(state),
  templateGenStatus: PostGenSelectors.getSyncStatusSelector(state),
  vscode: getVSCodeApiSelector(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  resetWizard: () => {
    dispatch(resetWizardAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(PostGenerationModal)));
