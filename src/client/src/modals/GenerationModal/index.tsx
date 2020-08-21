import classnames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { ReactComponent as Close } from "../../assets/cancel.svg";
import asModal from "../../components/Modal";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { GenerationItemData, GENERATION_NAMES } from "../../types/generationStatus";
import { isGenModalOpenSelector } from "../../store/navigation/modals/selector";
import {
  KEY_EVENTS,
  WEB_TEMPLATE_STUDIO_LINKS,
  TELEMETRY
} from "../../utils/constants/constants";

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
import { Subject, forkJoin } from "rxjs";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { AZURE_LINKS } from "../../utils/constants/azure";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const GenerationModal = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const initialGenerationItems = () => {
    const items: GenerationItemData[] = [];
    const templateItem: GenerationItemData = {
      name: GENERATION_NAMES.TEMPLATES,
      title: formatMessage(messages.projectCreation),
      message: new Subject(),
    };

    templateItem.message.subscribe(
      void 0,
      () => setIsGenerationTemplatesFailed(true),
      () => setIsGenerationTemplatesSuccess(true)
    );

    items.push(templateItem);
    return items;
  };

  const [statusMessage, setStatusMessage] = React.useState("");
  const [generationItems, setGenerationItems] = React.useState(initialGenerationItems);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const generationData = useSelector(getGenerationData);
  const isCosmosSelected = useSelector(getCosmosDB) !== null;
  const isAppServiceSelected = useSelector(getAppService) !== null;
  const outputPath = useSelector((state: AppState) => getOutputPath(state));
  const [isGenerationFinished, setIsGenerationFinished] = React.useState(false);
  const [isGenerationTemplatesSuccess, setIsGenerationTemplatesSuccess] = React.useState(false);
  const [isGenerationTemplatesFailed, setIsGenerationTemplatesFailed] = React.useState(false);
  const [isGenerationFailed, setIsGenerationFailed] = React.useState(false);

  React.useEffect(() => {
    const items = [...generationItems];

    if (isAppServiceSelected) {
      items.push({
        name: GENERATION_NAMES.APP_SERVICE,
        title: formatMessage(messages.appServiceTitle),
        link: AZURE_LINKS.VIEW_GENERATE_APP_SERVICE,
        message: new Subject(),
      });
    }

    if (isCosmosSelected) {
      items.push({
        name: GENERATION_NAMES.COSMOS_DB,
        title: formatMessage(messages.cosmosDbTitle),
        link: AZURE_LINKS.VIEW_GENERATE_MONGO_DB,
        message: new Subject(),
      });
    }

    setGenerationItems(items);
    generateProject(generationData, vscode);

    items.forEach((item) => {
      item.message.subscribe(
        (message) => setStatusMessage(message),
        (error: string) => setErrorMessages((messages) => [...new Set([...messages, error])])
      );
    });

    forkJoin(items.map((item) => item.message)).subscribe(
      () => void 0,
      () => {
        setIsGenerationFailed(true);
        setIsGenerationFinished(true);
      },
      () => {
        setIsGenerationFinished(true);
      }
    );
  }, []);

  const closeModalAndCreateNewProject = (param: any) => {
    trackCreateNewProjectTelemetry(param);
    dispatch(resetWizardAction());
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

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.creatingYourProject)}</div>
        {isGenerationFinished && (
          <Close
            tabIndex={0}
            className={styles.closeIcon}
            data-testid="close-button"
            onClick={() => closeModalAndCreateNewProject({ fromCloseButton: true })}
            onKeyDown={closeKeyDownHandler}
          />
        )}
      </div>

      <div className={styles.messages}>
        {!isGenerationFinished && <p>{statusMessage}</p>}
        {isGenerationTemplatesSuccess && <p>{formatMessage(messages.seeReadme)}</p>}

        {errorMessages.map((message, key) => {
          return <p key={key}>{message}</p>;
        })}
      </div>

      <div className={styles.generationItems}>
        {generationItems.map((item, key) => {
          return <GenerationItem key={key} item={item} />;
        })}
      </div>

      <div className={styles.footer}>
        {isGenerationFailed && (
          <a className={styles.link} href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES} onKeyUp={keyUpHandler}>
            {formatMessage(messages.reportAndIssue)}
          </a>
        )}

        {isGenerationFinished && (
          <button
            className={classnames({
              [buttonStyles.buttonDark]: isGenerationTemplatesSuccess,
              [buttonStyles.buttonHighlighted]: isGenerationTemplatesFailed,
            })}
            onClick={() => closeModalAndCreateNewProject({ fromCreateNewProjectButton: true })}
          >
            {formatMessage(messages.createNewProject)}
          </button>
        )}

        {!isGenerationTemplatesFailed && (
          <button
            className={classnames({
              [buttonStyles.buttonDark]: !isGenerationTemplatesSuccess,
              [buttonStyles.buttonHighlighted]: isGenerationTemplatesSuccess,
            })}
            onClick={() => openProjectInVSCode(outputPath, vscode)}
            disabled={!isGenerationTemplatesSuccess}
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
