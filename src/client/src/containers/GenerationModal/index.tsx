import classnames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { ReactComponent as Close } from "../../assets/cancel.svg";
import asModal from "../../components/Modal";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { GenerationItem, GenerationItemStatus, GENERATION_NAMES } from "../../types/generationStatus";
import { isGenModalOpenSelector } from "../../store/navigation/modals/selector";
import { EXTENSION_COMMANDS, KEY_EVENTS, WEB_TEMPLATE_STUDIO_LINKS, TELEMETRY } from "../../utils/constants";

import { AppState } from "../../store/combineReducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { strings as messages } from "./strings";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { sendTelemetry, generateProject, openProjectInVSCode } from "../../utils/extensionService/extensionService";
import { resetWizardAction } from "../../store/config/config/action";
import { AppContext } from "../../AppContext";
import { getGenerationData } from "../../store/userSelection/app/selector";
import { getCosmosDB, getAppService } from "../../store/userSelection/services/servicesSelector";
import {
  setSelectedFrontendFrameworkAction,
  setSelectedBackendFrameworkAction,
} from "../../store/userSelection/frameworks/action";
import { IOption } from "../../types/option";
import GenerationItemComponent from "./GenerationItemComponent";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const GenerationModal = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const [templateGenStatus, setTemplateGenStatus] = React.useState("");
  const generationData = useSelector(getGenerationData);
  const isCosmosSelected = useSelector(getCosmosDB) !== null;
  const isAppServiceSelected = useSelector(getAppService) !== null;
  const outputPath = useSelector((state: AppState) => getOutputPath(state));
  const frontendOptions = useSelector((state: AppState) => state.templates.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.templates.backendOptions);

  const closeModalAndCreateNewProject = (param: any) => {
    trackCreateNewProjectTelemetry(param);

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
      licenses: defaultOptionBack.licenses,
    };

    setTimeout(() => {
      dispatch(setSelectedFrontendFrameworkAction(defaultSelectedFrontEndFramework));
      dispatch(setSelectedBackendFrameworkAction(defaultSelectedBackEndFramework));
    }, 1000);
  };

  const closeKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModalAndCreateNewProject({ fromCloseButton: true });
    }
  };

  const trackCreateNewProjectTelemetry = ({ fromCloseButton, fromCreateNewProjectButton }: any) => {
    if (fromCloseButton) {
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_CREATE_NEW_PROJECT, {
        entryPoint: TELEMETRY.CLOSE_GENERATION_MODAL_BUTTON,
      });
    }

    if (fromCreateNewProjectButton) {
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_CREATE_NEW_PROJECT, {
        entryPoint: TELEMETRY.CREATE_NEW_PROJECT_BUTTON,
      });
    }
  };

  const initialGenerationItems = () => {
    const items: GenerationItem[] = [
      {
        name: GENERATION_NAMES.TEMPLATES,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.projectCreation),
      },
    ];
    return items;
  };

  const [generationItems, setGenerationItems] = React.useState(initialGenerationItems);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const items: GenerationItem[] = [...generationItems];

    if (isAppServiceSelected) {
      items.push({
        name: GENERATION_NAMES.APP_SERVICE,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.appServiceTitle),
        link: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites",
      });
    }

    if (isCosmosSelected) {
      items.push({
        name: GENERATION_NAMES.COSMOS_DB,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.cosmosDbTitle),
        link:
          "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts",
      });
    }

    setGenerationItems(items);
    generateProject(generationData, vscode);
  }, []);

  React.useEffect(() => {
    if (anyGenerationServiceInProgress()) {
      setTemplateGenStatus(formatMessage(messages.generationCompleteWithAzure));
    }
  }, [generationItems]);

  const onItemStatusChange = (name: string, newStatus: GenerationItemStatus) => {
    const newList = generationItems.map((item) => {
      if (item.name === name) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setGenerationItems(newList);
  };

  const onErrorMessage = (message: string) => {
    setErrorMessages(messages => [...new Set([...messages, message])]);
  };

  const onStatusMessage = (message: string) => {
    setTemplateGenStatus(message);
  };

  const isGenerationFinished = () => {
    return generationItems.every(
      (item) => item.status === GenerationItemStatus.Success || item.status === GenerationItemStatus.Failed
    );
  };

  const anyGenerationItemFailed = () => generationItems.some((item) => item.status === GenerationItemStatus.Failed);

  const getGenerationTemplatesItem = () => generationItems.find((item) => item.name === GENERATION_NAMES.TEMPLATES) as GenerationItem;

  const getGenerationServices = () => generationItems.filter((item) => item.name !== getGenerationTemplatesItem().name);

  const generationTemplatesIsSuccess = () => getGenerationTemplatesItem().status === GenerationItemStatus.Success;

  const generationTemplatesIsInProgress = () => getGenerationTemplatesItem().status === GenerationItemStatus.Generating;

  const generationTemplatesIsFailed = () => getGenerationTemplatesItem().status === GenerationItemStatus.Failed;

  const anyGenerationServiceInProgress = () =>
    getGenerationServices().some((item) => item.status === GenerationItemStatus.Generating);

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>{formatMessage(messages.creatingYourProject)}</div>
        {isGenerationFinished() && (
          <Close
            tabIndex={0}
            className={styles.closeIcon}
            onClick={() => closeModalAndCreateNewProject({ fromCloseButton: true })}
            onKeyDown={closeKeyDownHandler}
          />
        )}
      </div>

      <div className={styles.section}>
        {!isGenerationFinished() && <div className={styles.sectionLine}>{templateGenStatus}</div>}
        {generationTemplatesIsSuccess() && <div className={styles.sectionLine}>{formatMessage(messages.readMe)}</div>}

        {errorMessages.map((message, key) => {
          return (
            <div key={key} className={styles.sectionLine}>
              {message}
            </div>
          );
        })}
      </div>

      <div className={classnames(styles.section, styles.checkmarkSection)}>
        <div className={styles.containerWithMargin}>
          {generationItems.map((item, key) => {
            return (
              <GenerationItemComponent
                key={key}
                item={item}
                onStatusChange={onItemStatusChange}
                onErrorMessage={onErrorMessage}
                onStatusMessage={onStatusMessage}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.footerContainer}>
        {anyGenerationItemFailed() && (
          <a className={styles.link} href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES} onKeyUp={keyUpHandler}>
            {formatMessage(messages.help)}
          </a>
        )}

        {isGenerationFinished() && (
          <button
            className={classnames(styles.button, {
              [buttonStyles.buttonDark]: generationTemplatesIsSuccess(),
              [buttonStyles.buttonHighlighted]: generationTemplatesIsFailed(),
            })}
            onClick={() => closeModalAndCreateNewProject({ fromCreateNewProjectButton: true })}
          >
            {formatMessage(messages.createAnotherProject)}
          </button>
        )}

        {!generationTemplatesIsFailed() && (
          <button
            className={classnames(styles.button, {
              [buttonStyles.buttonDark]: generationTemplatesIsInProgress(),
              [buttonStyles.buttonHighlighted]: generationTemplatesIsSuccess(),
            })}
            onClick={() => openProjectInVSCode(outputPath, vscode)}
            disabled={!generationTemplatesIsSuccess()}
          >
            {formatMessage(messages.openInCode)}
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isGenModalOpenSelector(state),
});

export default connect(mapStateToProps)(asModal(injectIntl(GenerationModal), NAVIGATION_MODAL_TYPES.GEN_MODAL));
