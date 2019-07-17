import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import ReactMarkdown from "react-markdown";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../selectors/postGenerationSelector";
import { isPostGenModalOpenSelector } from "../../selectors/modalSelector";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  ROUTES,
  WEB_TEMPLATE_STUDIO_LINKS
} from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { AppState } from "../../reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../selectors/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { resetWizardAction } from "../../actions/wizardInfoActions/resetWizardAction";
import { MODAL_TYPES } from "../../actions/modalActions/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

interface LinksDict {
  [serviceId: string]: string;
}
const links: LinksDict = {
  "Azure Functions":
    "[Azure](https://portal.azure.com/#blade/WebsitesExtension/FunctionsIFrameBladeMain)",
  "Cosmos DB":
    "[Azure](https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts)"
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
  const LinkRenderer = (props: any) => (
    <a href={props.href} className={styles.link} onKeyUp={keyUpHandler}>
      {props.children}
    </a>
  );
  const handleCloseWizard = () => {
    vscode.postMessage({
      module: EXTENSION_MODULES.GENERATE,
      command: EXTENSION_COMMANDS.CLOSE_WIZARD
    });
  };

  const handleOpenProjectOrRestartWizard = () => {
    if (isTemplatesFailed) {
      resetWizard();
      history.push(ROUTES.NEW_PROJECT);
    }
    if (!isTemplatesFailed && isTemplateGenerated) {
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
  const openProjectOrRestartWizardMessage = () => {
    if (isTemplatesFailed) {
      return formatMessage(messages.restartWizard);
    }
    if (!isTemplatesFailed && isTemplateGenerated) {
      return formatMessage(messages.openInCode);
    }
    return (
      <React.Fragment>
        <Spinner className={styles.spinner} />
        {formatMessage(messages.working)}
      </React.Fragment>
    );
  };

  const handleCreateAnotherProject = () => {
    resetWizard();
    history.push(ROUTES.NEW_PROJECT);
  };

  const renderServiceStatus = () => {
    if (isTemplatesFailed) {
      return formatMessage(messages.deploymentHalted);
    }
    return Object.keys(serviceStatus).map((service: string, idx: number) => {
      const serviceTitle = formatMessage(serviceStatus[service].title);
      if (serviceStatus[service].isSelected) {
        if (serviceStatus[service].isFailed) {
          return (
            <div
              key={`${messages.error.defaultMessage}${idx}`}
            >{`${formatMessage(messages.error)} ${serviceTitle} ${formatMessage(
              messages.deploymentFailure
            )}`}</div>
          );
        }
        if (serviceStatus[service].isDeployed) {
          return (
            <ReactMarkdown
              source={`${serviceTitle} ${formatMessage(
                messages.deploymentSuccess
              )} ${links[serviceTitle]}`}
              key={`${messages.deploymentSuccess.defaultMessage}${idx}`}
              renderers={{ link: LinkRenderer }}
            />
          );
        }
        return (
          <div
            className={styles.loading}
            key={`${messages.isDeploying.defaultMessage}${idx}`}
          >
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
        {formatMessage(messages.creatingYourProject)}
      </div>
      <div className={styles.templateStatus}>
        <div className={styles.sectionLine}>
          {isTemplatesFailed && formatMessage(messages.failedToGenerate)}
        </div>
        {!isTemplateGenerated && !isTemplatesFailed && (
          <div className={styles.sectionLine}>{templateGenStatus}</div>
        )}
        {isTemplateGenerated && !isTemplatesFailed && (
          <div>
            <p className={styles.sectionLine}>
              {formatMessage(messages.generationComplete)}
            </p>
            <p className={styles.sectionLine}>
              {formatMessage(messages.openReadMe)}
              <span className={styles.readMeText}>
                {formatMessage(messages.readMe)}
              </span>
              {formatMessage(messages.toStart)}
            </p>
          </div>
        )}
      </div>
      {isServicesSelected && (
        <div className={styles.section}>
          <div className={styles.azureTitle}>
            {formatMessage(messages.azureServices)}
          </div>
          <div className={styles.sectionLine}>{renderServiceStatus()}</div>
        </div>
      )}
      <div className={styles.section}>
        <div className={styles.sectionLineButton}>
          {isTemplateGenerated && !isTemplatesFailed && isServicesDeployed && (
            <button
              className={styles.buttonToLink}
              onClick={handleCreateAnotherProject}
            >
              {formatMessage(messages.createAnotherProject)}
            </button>
          )}
        </div>
      </div>
      <div className={styles.sectionLineButton}>
        {isTemplateGenerated && !isTemplatesFailed && isServicesDeployed && (
          <button
            className={classnames(styles.buttonToLink)}
            onClick={handleCloseWizard}
          >
            {formatMessage(messages.closeWizard)}
          </button>
        )}
      </div>
      <div className={styles.sectionLine}>
        <a
          className={styles.link}
          href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES}
          onKeyUp={keyUpHandler}
        >
          {formatMessage(messages.help)}
        </a>
      </div>
      <div className={styles.footerContainer}>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleOpenProjectOrRestartWizard}
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
  vscode: getVSCodeApiSelector(state)
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
