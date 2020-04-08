import classnames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { ReactComponent as Checkmark } from "../../assets/checkgreen.svg";
import { ReactComponent as ErrorRed } from "../../assets/errorred.svg";
import { ReactComponent as Close } from "../../assets/cancel.svg";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import {IAzureServiceStatus} from "../../types/generationStatus";
import { isGenModalOpenSelector } from "../../store/modals/selector";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  WEB_TEMPLATE_STUDIO_LINKS,
  TELEMETRY
} from "../../utils/constants";

import { AppState } from "../../store/combineReducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { MODAL_TYPES } from "../../store/modals/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { sendTelemetry, generateProject } from "../../utils/extensionService/extensionService";
import { resetWizardAction } from "../../store/config/config/action";
import { AppContext } from "../../AppContext";
import { rootSelector } from "../../store/userSelection/app/selector";
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

type Props = IStateProps &
  InjectedIntlProps;

const GenerationModal = ({
  intl, isModalOpen
}: Props) => {
  const { formatMessage } = intl;
  const [templateGenStatus, setTemplateGenStatus] = React.useState("");
  const [generationStatus, setGenerationStatus] = React.useState<any>({});
  const [isTemplateGenerated, setIsTemplateGenerated] = React.useState(false);
  const [isTemplatesFailed, setIsTemplatesFailed] = React.useState(false);
  const [isServicesDeployed, setIsServicesDeployed] = React.useState(false);
  const [isServiceFailed, setIsServiceFailed] = React.useState(false);
  
  const [templateGenerated, setTemplateGenerated] = React.useState(false);
  const [templateGenerationInProgress, setTemplateGenerationInProgress] = React.useState(false);

  const { vscode } = React.useContext(AppContext);


  const engine = useSelector((state: AppState) => rootSelector(state));
  const isCosmosSelected = useSelector((state: AppState) => isCosmosResourceCreatedSelector(state));
  const cosmos = useSelector((state: AppState) => getCosmosDbSelectionSelector(state));
  const isAppServiceSelected = useSelector((state: AppState) => isAppServiceSelectedSelector(state));
  const appService = useSelector((state: AppState) => getAppServiceSelectionSelector(state));
  const outputPath = useSelector((state: AppState) => getOutputPath(state));
  const [isServicesSelected, setIsServicesSelected] = React.useState(false);
  const [serviceStatus, setServiceStatus] = React.useState<IAzureServiceStatus>(getInitialServiceStatus());

  React.useEffect(()=>{
    const localServiceStatus = getInitialServiceStatus();
    if (generationStatus.templates){
      if (isCosmosSelected && generationStatus.cosmos.success !== undefined){
        localServiceStatus.cosmosdb.isDeployed = generationStatus.cosmos.success;
        localServiceStatus.cosmosdb.isFailed = generationStatus.cosmos.failure;
      }

      if (isAppServiceSelected && generationStatus.appService.success !== undefined){
        localServiceStatus.appService.isDeployed = generationStatus.appService.success;
        localServiceStatus.appService.isFailed = generationStatus.appService.failure;
      }
      
      setIsServiceFailed(localServiceStatus.cosmosdb.isFailed || localServiceStatus.appService.isFailed);
      setIsServicesDeployed(isCosmosSelected && !isAppServiceSelected && localServiceStatus.cosmosdb.isDeployed || 
        !isCosmosSelected && isAppServiceSelected && localServiceStatus.appService.isDeployed ||
        isCosmosSelected && isAppServiceSelected && (localServiceStatus.cosmosdb.isDeployed && localServiceStatus.appService.isDeployed));

      setServiceStatus(localServiceStatus);

      setIsTemplateGenerated(generationStatus.templates.success);
      setIsTemplatesFailed(generationStatus.templates.failure);
    }
  },[generationStatus]);

  React.useEffect(()=>{
    setTemplateGenerated(isTemplateGenerated && !isTemplatesFailed);
    setTemplateGenerationInProgress(!isTemplateGenerated && !isTemplatesFailed);
  },[isTemplateGenerated, isTemplatesFailed]);

  React.useEffect(()=>{
    setIsServicesSelected(isCosmosSelected || isAppServiceSelected);
  },[])

  React.useEffect(()=>{
    window.removeEventListener("message",eventCallback);
  },[isModalOpen]);

  const dispatch = useDispatch();

  React.useEffect(()=>{
    generateProject(engine,
      isCosmosSelected,
      cosmos,
      isAppServiceSelected,
      appService,
      vscode);
    addMessageEventsFromExtension();
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

  function eventCallback(event: any) {
    const message = event.data;
    switch (message.command) {
      case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
        setTemplateGenStatus(message.payload.status);
        break;
      case EXTENSION_COMMANDS.GEN_STATUS:
        setGenerationStatus(message.payload);
        break;
    }
  };

  function addMessageEventsFromExtension(){
    window.addEventListener("message", eventCallback);
  }

  const LinkRenderer = (props: any) => (
    <a href={props.href} className={styles.link} onKeyUp={keyUpHandler}>
      {props.children}
    </a>
  );

  const handleOpenProjectOrRestartWizard = () => {
    if (isTemplatesFailed) {
      dispatch(resetWizardAction());
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

  const genMessage = () => {
    return (
      <div>
        {isServicesSelected && !isServicesDeployed && (
          <p className={styles.sectionLine}>
            {formatMessage(messages.generationCompleteWithAzure)}
          </p>
        )}
        <p className={styles.sectionLine}>
          {formatMessage(
            isServicesSelected && !isServicesDeployed
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

  const renderServiceStatusTemplateFailed = () => {
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

  const renderServiceStatusTemplateSuccess = () => {
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
        if (!serviceStatus[service].isDeployed) {
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
      }
    });
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {formatMessage(messages.creatingYourProject)}
        </div>
        {((templateGenerated && isServicesDeployed) || isServiceFailed || isTemplatesFailed) && (
          <Close
            tabIndex={0}
            className={styles.closeIcon}
            onClick={() => closeModalAndCreateAnotherProject({ fromCloseButton:true })}
            onKeyDown={closeKeyDownHandler}
          />
        )}
      </div>

      <div className={styles.section}>
        {templateGenerationInProgress && (
          <div className={styles.sectionLine}>
            {templateGenStatus}
          </div>
        )}
        {templateGenerated && genMessage()}
        {isTemplatesFailed && renderTemplatesError()}
        {isServicesSelected && renderServiceError()}
      </div>

      <div className={classnames(styles.section, styles.checkmarkSection)}>
        <div className={styles.containerWithMargin}>
          {renderTemplatesStatus()}
          {isServicesSelected && isTemplatesFailed && renderServiceStatusTemplateFailed()}
          {isServicesSelected && !isTemplatesFailed && renderServiceStatusTemplateSuccess()}
        </div>
      </div>

      <div className={styles.footerContainer}>
        {(isTemplatesFailed || isServiceFailed) && (
          <a
            className={styles.link}
            href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES}
            onKeyUp={keyUpHandler}
          >
            {formatMessage(messages.help)}
          </a>
        )}

        {((templateGenerated && isServicesDeployed) || isServiceFailed || isTemplatesFailed) && (
          <button
            className={classnames(styles.button, {
              [buttonStyles.buttonDark]: templateGenerated,
              [buttonStyles.buttonHighlighted]: !templateGenerated
            })}
            onClick={() => closeModalAndCreateAnotherProject({ fromCreateNewProjectButton:true })}
          >
            {formatMessage(messages.createAnotherProject)}
          </button>
        )}

        {(!isTemplatesFailed) && (
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
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isGenModalOpenSelector(state),
});

export default 
  connect(
    mapStateToProps
  )(asModal(injectIntl(GenerationModal), MODAL_TYPES.GEN_MODAL));