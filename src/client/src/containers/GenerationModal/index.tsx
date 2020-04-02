import classnames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import ReactMarkdown from "react-markdown";
import { ReactComponent as Checkmark } from "../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../assets/errorred.svg";
import { ReactComponent as Close } from "../../assets/cancel.svg";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import * as PostGenSelectors from "../../store/generationStatus/selector";
import {IAzureServiceStatus} from "../../store/generationStatus/model";
import { isPostGenModalOpenSelector } from "../../store/modals/selector";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  ROUTES,
  WEB_TEMPLATE_STUDIO_LINKS,
  TELEMETRY
} from "../../utils/constants";

import { AppState } from "../../store/combineReducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { MODAL_TYPES } from "../../store/modals/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { sendTelemetry, generateProject } from "../../utils/extensionService/extensionService";
import { resetWizardAction } from "../../store/wizardContent/wizardContent/action";
import { AppContext } from "../../AppContext";
import { rootSelector } from "../../store/selection/app/selector";
import { isCosmosResourceCreatedSelector, getCosmosDbSelectionSelector } from "../../store/azureProfileData/cosmosDb/selector";
import { isAppServiceSelectedSelector, getAppServiceSelectionSelector } from "../../store/azureProfileData/appService/selector";
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
  isModalOpen: boolean;
}

interface IDispatchProps {
  resetWizard: () => any;
}

type Props = IStateProps &
  InjectedIntlProps &
  IDispatchProps &
  RouteComponentProps;

const GenerationModal = ({
  intl,
  resetWizard,
  history
}: Props) => {
  const { formatMessage } = intl;
  let serviceFailed = false;
  const [templateGenStatus, setTemplateGenStatus] = React.useState("");
  const [generationStatus, setGenerationStatus] = React.useState<any>({});

  const isTemplateGenerated = generationStatus.templates && generationStatus.templates.success;
  const isTemplatesFailed = generationStatus.templates && generationStatus.templates.failure;
  const templateGenerated = isTemplateGenerated && !isTemplatesFailed;
  const templateGenerationInProgress =
    !isTemplateGenerated && !isTemplatesFailed;
  const { vscode } = React.useContext(AppContext);
  const [isServicesDeployed, setIsServicesDeployed] = React.useState(false);

  const engine = useSelector((state: AppState) => rootSelector(state));
  const isCosmosSelected = useSelector((state: AppState) => isCosmosResourceCreatedSelector(state));
  const cosmos = useSelector((state: AppState) => getCosmosDbSelectionSelector(state));
  const isAppServiceSelected = useSelector((state: AppState) => isAppServiceSelectedSelector(state));
  const appService = useSelector((state: AppState) => getAppServiceSelectionSelector(state));
  const isServicesSelected = useSelector((state: AppState) => PostGenSelectors.isServicesSelectedSelector(state));
  const outputPath = useSelector((state: AppState) => getOutputPath(state));
  const [serviceStatus, setServiceStatus] = React.useState<IAzureServiceStatus>(getInitialServiceStatus());

  React.useEffect(()=>{
    let localServiceStatus = getInitialServiceStatus();
    if (generationStatus.templates){
      if (isCosmosSelected && generationStatus.cosmo.success!=undefined){
        localServiceStatus.cosmosdb.isDeployed = generationStatus.cosmo.success;
        localServiceStatus.cosmosdb.isFailed = generationStatus.cosmo.failure;
      }

      if (isAppServiceSelected && generationStatus.appService.success!=undefined){
        localServiceStatus.appService.isDeployed = generationStatus.appService.success;
        localServiceStatus.appService.isFailed = generationStatus.appService.failure;
      }

      if ((isCosmosSelected && !isAppServiceSelected && localServiceStatus.cosmosdb.isDeployed) ||
      (!isCosmosSelected && isAppServiceSelected && localServiceStatus.appService.isDeployed)||
      (!isCosmosSelected && !isAppServiceSelected) ||
      (!isCosmosSelected && isAppServiceSelected && localServiceStatus.appService.isDeployed && localServiceStatus.cosmosdb.isDeployed))
        setIsServicesDeployed(true);

      setServiceStatus(localServiceStatus);
    }
  },[generationStatus]);

  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    generateProject(engine,
      isCosmosSelected,
      cosmos,
      isAppServiceSelected,
      appService,
      vscode);
      messageEventsFromExtension();
  },[]);

  function getInitialServiceStatus(){
    return {
      "cosmosdb":{
        "title":{"id":"cosmosDb.title","defaultMessage":"Cosmos DB"},
        "isSelected":isCosmosSelected,
        "isDeployed":false,
        "isFailed":false
      },
      "appService":
        {"title":{"id":"appService.title","defaultMessage":"App Service"},
        "isSelected":isAppServiceSelected,
        "isDeployed":false,
        "isFailed":false
      }
    };
  }

  function messageEventsFromExtension(){
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          setTemplateGenStatus(message.payload.status);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          setGenerationStatus(message.payload);
          break;
      }
    });
  }

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
    dispatch(resetWizardAction());
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
          <div className={styles.sectionLine}>
            {templateGenStatus}</div>
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
});

export default withRouter(
  connect(
    mapStateToProps
  )(asModal(injectIntl(GenerationModal), MODAL_TYPES.POST_GEN_MODAL))
);