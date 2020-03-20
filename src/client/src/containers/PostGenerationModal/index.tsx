import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import ReactMarkdown from "react-markdown";
import { ReactComponent as Checkmark } from "../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../assets/errorred.svg";
import { ReactComponent as Close } from "../../assets/cancel.svg";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  ROUTES,
  WEB_TEMPLATE_STUDIO_LINKS,
  TELEMETRY
} from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { AppState } from "../../reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath, getProjectName } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { MODAL_TYPES } from "../../actions/modalActions/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { resetWizardAction } from "../../actions/wizardInfoActions/resetWizardAction";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
interface LinksDict {
  [serviceId: string]: string;
}
const links: LinksDict = {
  "Cosmos DB":
    "[View](https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts)",
  "App Service":
    "[View](https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites)"
};

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
  projectName: string;
}

interface IDispatchProps {
  resetWizard: () => any;
}

type Props = IStateProps &
  InjectedIntlProps &
  IDispatchProps &
  RouteComponentProps;

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
  resetWizard,
  history
}: Props) => {
  const { formatMessage } = intl;
  let serviceFailed = false;
  const templateGenerated = isTemplateGenerated && !isTemplatesFailed;
  const templateGenerationInProgress =
    !isTemplateGenerated && !isTemplatesFailed;

  const LinkRenderer = (props: any) => (
    <a href={props.href} className={styles.link} onKeyUp={keyUpHandler}>
      {props.children}
    </a>
  );

  const handleOpenProjectOrRestartWizard = () => {
    if (isTemplatesFailed) {
      resetWizard();
      history.push(ROUTES.NEW_PROJECT);
      return;
    }
    if (isTemplateGenerated) {
      const fullpath = outputPath;
      vscode.postMessage({
        module: EXTENSION_MODULES.GENERATE,
        command: EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE,
        track: true,
        payload: {
          outputPath:fullpath
        }
      });
    }
  };

  const openProjectOrRestartWizardMessage = () => {
    if (isTemplatesFailed) {
      return formatMessage(messages.restartWizard);
    }
    return formatMessage(messages.openInCode);
  };

  const closeModalAndCreateAnotherProject = (param: any) => {
    trackCreateNewProjectTelemetry(param);
    resetWizard();
    history.push(ROUTES.NEW_PROJECT);

  };

  const closeKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModalAndCreateAnotherProject({ fromCloseButton:true });
    }
  };

  const trackCreateNewProjectTelemetry = ({ fromCloseButton, fromCreateNewProjectButton }: any) => 
  {
    let entryPoint = '';

    if (fromCloseButton){
      entryPoint = TELEMETRY.CLOSE_GENERATION_MODAL_BUTTON;
    }

    if (fromCreateNewProjectButton){
      entryPoint = TELEMETRY.CREATE_NEW_PROJECT_BUTTON;
    }
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_CREATE_NEW_PROJECT, {entryPoint});
  }

  const postGenMessage = () => {
    return (
      <div>
        {isServicesSelected && (
          <p className={styles.sectionLine}>
            {formatMessage(messages.generationCompleteWithAzure)}
          </p>
        )}
        <p className={styles.sectionLine}>
          {formatMessage(
            isServicesSelected
              ? messages.seeReadMePrefixWithAzure
              : messages.seeReadMePrefix
          )}
          <span className={styles.readMeText}>
            {formatMessage(messages.readMe)}
          </span>
          {formatMessage(messages.seeReadMeSuffix)}
        </p>
      </div>
    );
  };

  const renderTemplatesError = () => {
    return (
      <div className={styles.sectionLine}>
        {formatMessage(messages.failedToGenerate)}
      </div>
    );
  };

  const renderTemplatesStatus = () => {
    return (
      <div className={styles.checkmarkStatusRow}>
        <React.Fragment>
          <div>{formatMessage(messages.projectCreation)}</div>
          {templateGenerationInProgress && (
            <div role="img" aria-label="project creation in progress">
              <Spinner className={styles.spinner} />
            </div>
          )}
          {templateGenerated && (
            <div role="img" aria-label="project creation done">
              <Checkmark className={styles.iconCheck} />
            </div>
          )}
          {isTemplatesFailed && (
            <div role="img" aria-label="project creation failed">
              <ErrorRed className={styles.iconError} />
            </div>
          )}
        </React.Fragment>
      </div>
    );
  };

  const renderServiceError = () => {
    if (isTemplatesFailed) {
      return (
        <div className={styles.sectionLine}>
          {isServicesSelected && formatMessage(messages.deploymentHalted)}
        </div>
      );
    }
    return Object.keys(serviceStatus).map((service: string, idx: number) => {
      const serviceTitle = formatMessage(serviceStatus[service].title);
      if (
        serviceStatus[service].isSelected &&
        serviceStatus[service].isFailed
      ) {
        serviceFailed = true;
        return (
          <div
            className={styles.sectionLine}
            key={`${messages.error.defaultMessage}${idx}`}
          >{`${formatMessage(messages.error)} ${serviceTitle} ${formatMessage(
            messages.deploymentFailure
          )}`}</div>
        );
      }
    });
  };

  const renderServiceStatus = () => {
    if (isTemplatesFailed) {
      return Object.keys(serviceStatus).map((service: string, idx: number) => {
        const serviceTitle = formatMessage(serviceStatus[service].title);
        if (serviceStatus[service].isSelected) {
          const halted = `${serviceTitle} deployment halted`;
          return (
            <div
              className={styles.checkmarkStatusRow}
              key={`${messages.isDeploying.defaultMessage}${idx}`}
            >
              <React.Fragment>
                <div>{serviceTitle}</div>
                <div role="img" aria-label={halted}>
                  <ErrorRed className={styles.iconError} />
                </div>
              </React.Fragment>
            </div>
          );
        }
      });
    }
    return Object.keys(serviceStatus).map((service: string, idx: number) => {
      const serviceTitle = formatMessage(serviceStatus[service].title);
      if (serviceStatus[service].isSelected) {
        if (serviceStatus[service].isFailed) {
          const failed = `${serviceTitle} deployment failed`;
          return (
            <div
              className={styles.checkmarkStatusRow}
              key={`${messages.isDeploying.defaultMessage}${idx}`}
            >
              <React.Fragment>
                <div>{serviceTitle}</div>
                <div role="img" aria-label={failed}>
                  <ErrorRed className={styles.iconError} />
                </div>
              </React.Fragment>
            </div>
          );
        }
        if (serviceStatus[service].isDeployed) {
          const deployed = `${serviceTitle} deployment done`;
          return (
            <div className={styles.checkmarkStatusRow}>
              <div>{serviceTitle}</div>
              <div className={styles.inLine}>
                <ReactMarkdown
                  source={`${links[serviceTitle]}`}
                  key={`${messages.deploymentSuccess.defaultMessage}${idx}`}
                  renderers={{ link: LinkRenderer }}
                />
                <div role="img" aria-label={deployed}>
                  <Checkmark className={styles.iconCheck} />
                </div>
              </div>
            </div>
          );
        }
        const inProgress = `${serviceTitle} deployment in progress`;
        return (
          <div
            className={styles.checkmarkStatusRow}
            key={`${messages.isDeploying.defaultMessage}${idx}`}
          >
            <React.Fragment>
              <div>{serviceTitle}</div>
              <div role="img" aria-label={inProgress}>
                <Spinner className={styles.spinner} />
              </div>
            </React.Fragment>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {formatMessage(messages.creatingYourProject)}
        </div>      
        <Close
            tabIndex={0}
            className={styles.closeIcon}
            onClick={() => closeModalAndCreateAnotherProject({ fromCloseButton:true })}
            onKeyDown={closeKeyDownHandler}
          />
      </div>

      <div className={styles.section}>
        {templateGenerationInProgress && (
          <div className={styles.sectionLine}>{templateGenStatus}</div>
        )}
        {templateGenerated && postGenMessage()}
        {isTemplatesFailed && renderTemplatesError()}
        {isServicesSelected && renderServiceError()}
      </div>

      <div className={classnames(styles.section, styles.checkmarkSection)}>
        <div className={styles.containerWithMargin}>
          {renderTemplatesStatus()}
          {isServicesSelected && renderServiceStatus()}
        </div>
      </div>

      <div className={styles.footerContainer}>
        {(isTemplatesFailed || serviceFailed) && (
          <a
            className={styles.link}
            href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES}
            onKeyUp={keyUpHandler}
          >
            {formatMessage(messages.help)}
          </a>
        )}

        {templateGenerated && isServicesDeployed && (
          <button
            className={classnames(styles.button, buttonStyles.buttonDark)}
            onClick={() => closeModalAndCreateAnotherProject({ fromCreateNewProjectButton:true })}
          >
            {formatMessage(messages.createAnotherProject)}
          </button>
        )}

        <button
          className={classnames(styles.button, {
            [buttonStyles.buttonDark]: templateGenerationInProgress,
            [buttonStyles.buttonHighlighted]: !templateGenerationInProgress
          })}
          onClick={handleOpenProjectOrRestartWizard}
          disabled={templateGenerationInProgress}
        >
          {openProjectOrRestartWizardMessage()}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isPostGenModalOpenSelector(state),
  isServicesDeployed: PostGenSelectors.isServicesDeployedOrFinishedSelector(
    state
  ),
  isServicesSelected: PostGenSelectors.isServicesSelectedSelector(state),
  isTemplateGenerated: PostGenSelectors.isTemplateGeneratedSelector(state),
  isTemplatesFailed: PostGenSelectors.isTemplatesFailedSelector(state),
  outputPath: getOutputPath(state),
  serviceStatus: PostGenSelectors.servicesToDeploySelector(state),
  templateGenStatus: PostGenSelectors.getSyncStatusSelector(state),
  vscode: getVSCodeApiSelector(state),
  projectName: getProjectName(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  resetWizard: () => {
    dispatch(resetWizardAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(asModal(injectIntl(PostGenerationModal), MODAL_TYPES.POST_GEN_MODAL))
);