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

import {IAzureServiceStatus, GenerationItem, GenerationItemStatus} from "../../types/generationStatus";
import { isGenModalOpenSelector } from "../../store/navigation/modals/selector";
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
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { sendTelemetry, generateProject, openLogFile } from "../../utils/extensionService/extensionService";
import { resetWizardAction } from "../../store/config/config/action";
import { AppContext } from "../../AppContext";
import { getGenerationData } from "../../store/userSelection/app/selector";
import { getCosmosDB } from "../../store/userSelection/services/servicesSelector";
import { getAppService } from "../../store/userSelection/services/servicesSelector";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../store/userSelection/frameworks/action";
import { IOption } from "../../types/option";
import GenerationItemComponent from "./GenerationItemComponent";




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
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const [templateGenStatus, setTemplateGenStatus] = React.useState("");
  const [generationStatus, setGenerationStatus] = React.useState<any>({});
  const [isTemplateGenerated, setIsTemplateGenerated] = React.useState(false);
  const [isTemplatesFailed, setIsTemplatesFailed] = React.useState(false);
  const [isServicesDeployed, setIsServicesDeployed] = React.useState(false);
  const [isServiceFailed, setIsServiceFailed] = React.useState(false);
  const [showCreateNewProject, setShowCreateNewProject] = React.useState(false);
  
  const [templateGenerated, setTemplateGenerated] = React.useState(false);
  const [templateGenerationInProgress, setTemplateGenerationInProgress] = React.useState(false);

  const generationData = useSelector(getGenerationData);
  const cosmos = useSelector(getCosmosDB);
  const isCosmosSelected = cosmos !== null;
  const appService = useSelector(getAppService);
  const isAppServiceSelected = appService !== null;
  const outputPath = useSelector((state: AppState) => getOutputPath(state));
  const [isServicesSelected, setIsServicesSelected] = React.useState(false);
  const [serviceStatus, setServiceStatus] = React.useState<IAzureServiceStatus>(getInitialServiceStatus());
  const frontendOptions = useSelector((state: AppState) => state.templates.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.templates.backendOptions);

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

      setShowCreateNewProject(generationStatus.finished);
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

  React.useEffect(()=>{
    generateProject(generationData, vscode);
    addMessageEventsFromExtension();
  },[]);

  function getInitialServiceStatus(){
    return {
      "cosmosdb":{
        "title":messages.cosmosDbTitle,
        "isSelected":isCosmosSelected,
        "isDeployed":false,
        "isFailed":false
      },
      "appService":
        {"title":messages.appServiceTitle,
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

  const reset= () => {
    dispatch(resetWizardAction());
    const defaultOptionFront: IOption = frontendOptions[0];
    const defaultSelectedFrontEndFramework = {
      internalName: defaultOptionFront.internalName,
      title: defaultOptionFront.title as string,
      version: `v${defaultOptionFront.version || "1.0"}`,
      licenses: defaultOptionFront.licenses,
      author: defaultOptionFront.author,
    };

    const defaultOptionBack = backendOptions[0];
    const defaultSelectedBackEndFramework = {
      title: defaultOptionBack.title as string,
      internalName: defaultOptionBack.internalName,
      version: `v${defaultOptionBack.version || "1.0"}`,
      author: defaultOptionBack.author,
      licenses: defaultOptionBack.licenses
    };

    setTimeout(()=>{
      dispatch(setSelectedFrontendFrameworkAction(defaultSelectedFrontEndFramework));
      dispatch(setSelectedBackendFrameworkAction(defaultSelectedBackEndFramework));
    },1000)
  }

  const handleOpenProjectOrRestartWizard = () => {
    if (isTemplatesFailed) {
      reset();
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
    reset();
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
        {isServicesSelected && !isServicesDeployed && !isServiceFailed && (
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
            <div className={styles.inLine}>
            <button
              className={classnames(buttonStyles.buttonLink, styles.link)}
              onClick={() => openLogFile(vscode)}>
              {formatMessage(messages.showLog)}
            </button>
            <div role="img" aria-label="project creation failed">
              <ErrorRed className={styles.iconError} />
            </div>
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
              <div className={styles.inLine}>
                <button
                  className={classnames(buttonStyles.buttonLink, styles.link)}
                  onClick={() => openLogFile(vscode)}>
                  {formatMessage(messages.showLog)}
                </button>
                <div role="img" aria-label={halted}>
                  <ErrorRed className={styles.iconError} />
                </div>
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
            <div className={styles.checkmarkStatusRow} key={`${messages.isDeploying.defaultMessage}${idx}`}>
                <div>{serviceTitle}</div>
                <div className={styles.inLine}>
                <button
                  className={classnames(buttonStyles.buttonLink, styles.link)}
                  onClick={() => openLogFile(vscode)}>
                  {formatMessage(messages.showLog)}
                </button>
                <div role="img" aria-label={failed}>
                  <ErrorRed className={styles.iconError} />
                </div>
              </div>
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











  
  const initialGenerationItems = () => {
    const items: GenerationItem[] = [
      {
        id: "templates",
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.projectCreation)
      }
    ]
    return items;
  }

  const [generationItems, setGenerationItems] = React.useState(initialGenerationItems);

  
  const updateGenerationItemsWithServices = (hasAppService: boolean, hasCosmosDb: boolean) => {
    const items: GenerationItem[] = [...generationItems];

    if(hasAppService) {
      items.push({
        id: "appService",
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.appServiceTitle),
        link: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites",
      })
    }

    if(hasCosmosDb) {
      items.push({
        id: "cosmosDB",
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.cosmosDbTitle),
        link: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts"
      })
    }

    setGenerationItems(items);

  }

  React.useEffect(()=>{
    updateGenerationItemsWithServices(isAppServiceSelected, isCosmosSelected);
  },[])














  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {formatMessage(messages.creatingYourProject)}
        </div>
        {((isServicesSelected && (isServiceFailed || isServicesDeployed)) ||
         (!isServicesSelected && (isTemplatesFailed || isTemplateGenerated)))
         && (
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
        <div className={styles.containerWithMargin}>
        {generationItems.map((item, key) => {
            return <GenerationItemComponent key={key} item={item} />
          })}
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

        {showCreateNewProject && (
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
  )(asModal(injectIntl(GenerationModal), NAVIGATION_MODAL_TYPES.GEN_MODAL));