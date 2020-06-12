import classnames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { ReactComponent as Close } from "../../assets/cancel.svg";
import asModal from "../../components/Modal";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { GenerationItemData, GenerationItemStatus, GENERATION_NAMES } from "../../types/generationStatus";
import { isGenModalOpenSelector } from "../../store/navigation/modals/selector";
import {
  EXTENSION_COMMANDS,
  KEY_EVENTS,
  WEB_TEMPLATE_STUDIO_LINKS,
  TELEMETRY,
  AZURE_LINKS,
} from "../../utils/constants";

import { AppState } from "../../store/combineReducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getOutputPath } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { messages } from "./messages";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import keyUpHandler from "../../utils/keyUpHandler";

import { sendTelemetry, generateProject, openProjectInVSCode } from "../../utils/extensionService/extensionService";
import { resetWizardAction, loadAction } from "../../store/config/config/action";
import { AppContext } from "../../AppContext";
import { getGenerationData } from "../../store/userSelection/app/selector";
import { getCosmosDB, getAppService } from "../../store/userSelection/services/servicesSelector";
import GenerationItem from "./GenerationItem";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const GenerationModal = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const initialGenerationItems = () => {
    const items: GenerationItemData[] = [
      {
        name: GENERATION_NAMES.TEMPLATES,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.projectCreation),
      },
    ];
    return items;
  };

  const [statusMessage, setStatusMessage] = React.useState("");
  const [generationItems, setGenerationItems] = React.useState(initialGenerationItems);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const generationData = useSelector(getGenerationData);
  const isCosmosSelected = useSelector(getCosmosDB) !== null;
  const isAppServiceSelected = useSelector(getAppService) !== null;
  const outputPath = useSelector((state: AppState) => getOutputPath(state));

  React.useEffect(() => {
    const items = [...generationItems];

    if (isAppServiceSelected) {
      items.push({
        name: GENERATION_NAMES.APP_SERVICE,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.appServiceTitle),
        link: AZURE_LINKS.VIEW_GENERATE_APP_SERVICE,
      });
    }

    if (isCosmosSelected) {
      items.push({
        name: GENERATION_NAMES.COSMOS_DB,
        status: GenerationItemStatus.Stopped,
        title: formatMessage(messages.cosmosDbTitle),
        link: AZURE_LINKS.VIEW_GENERATE_MONGO_DB,
      });
    }

    setGenerationItems(items);
    generateProject(generationData, vscode);
  }, []);

  const closeModalAndCreateNewProject = (param: any) => {
    trackCreateNewProjectTelemetry(param);
    dispatch(resetWizardAction());
    dispatch(loadAction());
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

  const updateStatusInGenerationItems = (name: string, newStatus: GenerationItemStatus) => {
    const newList = generationItems.map((item) => {
      if (item.name === name) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setGenerationItems(newList);
  };

  const isGenerationFinished = () => {
    return generationItems.every(
      (item) => item.status === GenerationItemStatus.Success || item.status === GenerationItemStatus.Failed
    );
  };

  const anyGenerationItemFailed = () => generationItems.some((item) => item.status === GenerationItemStatus.Failed);

  const getGenerationTemplatesItem = () =>
    generationItems.find((item) => item.name === GENERATION_NAMES.TEMPLATES) as GenerationItemData;

  const generationTemplatesIsSuccess = () => getGenerationTemplatesItem().status === GenerationItemStatus.Success;

  const generationTemplatesIsInProgress = () => getGenerationTemplatesItem().status === GenerationItemStatus.Generating;

  const generationTemplatesIsFailed = () => getGenerationTemplatesItem().status === GenerationItemStatus.Failed;

  return (
    <div>
      <div className={styles.header}>
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

      <div className={styles.messages}>
        {!isGenerationFinished() && <p>{statusMessage}</p>}
        {generationTemplatesIsSuccess() && <p>{formatMessage(messages.seeReadme)}</p>}

        {errorMessages.map((message, key) => {
          return <p key={key}>{message}</p>;
        })}
      </div>

      <div className={styles.generationItems}>
        {generationItems.map((item, key) => {
          return (
            <GenerationItem
              key={key}
              item={item}
              onStatusChange={updateStatusInGenerationItems}
              onErrorMessage={(message) => setErrorMessages((messages) => [...new Set([...messages, message])])}
              onStatusMessage={(message) => setStatusMessage(message)}
            />
          );
        })}
      </div>

      <div className={styles.footer}>
        {anyGenerationItemFailed() && (
          <a className={styles.link} href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES} onKeyUp={keyUpHandler}>
            {formatMessage(messages.reportAndIssue)}
          </a>
        )}

        {isGenerationFinished() && (
          <button
            className={classnames({
              [buttonStyles.buttonDark]: generationTemplatesIsSuccess(),
              [buttonStyles.buttonHighlighted]: generationTemplatesIsFailed(),
            })}
            onClick={() => closeModalAndCreateNewProject({ fromCreateNewProjectButton: true })}
          >
            {formatMessage(messages.createNewProject)}
          </button>
        )}

        {!generationTemplatesIsFailed() && (
          <button
            className={classnames({
              [buttonStyles.buttonDark]: generationTemplatesIsInProgress(),
              [buttonStyles.buttonHighlighted]: generationTemplatesIsSuccess(),
            })}
            onClick={() => openProjectInVSCode(outputPath, vscode)}
            disabled={!generationTemplatesIsSuccess()}
          >
            {formatMessage(messages.openProject)}
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
