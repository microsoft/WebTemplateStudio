import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect, useDispatch, useSelector } from "react-redux";
import { forkJoin, Subject } from "rxjs";

import { AppContext } from "../../AppContext";
import asModal from "../../components/Modal";
import ModalContent from "../../components/ModalContent";
import buttonStyles from "../../css/button.module.css";
import { AppState } from "../../store/combineReducers";
import { resetWizardAction } from "../../store/config/config/action";
import { isGenModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { getGenerationData } from "../../store/userSelection/app/selector";
import { getAppService, getCosmosDB } from "../../store/userSelection/services/servicesSelector";
import { GENERATION_NAMES, GenerationItemData } from "../../types/generationStatus";
import { AZURE_LINKS } from "../../utils/constants/azure";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { TELEMETRY, WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants/constants";
import { generateProject, openProjectInVSCode, sendTelemetry } from "../../utils/extensionService/extensionService";
import keyUpHandler from "../../utils/keyUpHandler";
import GenerationItem from "./GenerationItem";
import { messages } from "./messages";
import styles from "./styles.module.css";

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
      generationPath: new Subject(),
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
  const [generationPath, setGenerationPath] = React.useState("");
  const [generationItems, setGenerationItems] = React.useState(initialGenerationItems);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const generationData = useSelector(getGenerationData);
  const isCosmosSelected = useSelector(getCosmosDB) !== null;
  const isAppServiceSelected = useSelector(getAppService) !== null;
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
      if (item.generationPath) {
        item.generationPath.subscribe((path) => setGenerationPath(path));
      }
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
    <ModalContent
      title={intl.formatMessage(messages.creatingYourProject)}
      canClose={isGenerationFinished}
      onClose={() => closeModalAndCreateNewProject({ fromCloseButton: true })}
    >
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
          <a href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES} onKeyUp={keyUpHandler}>
            {formatMessage(messages.reportAndIssue)}
          </a>
        )}

        {isGenerationFinished && (
          <button
            className={buttonStyles.buttonHighlighted}
            onClick={() => closeModalAndCreateNewProject({ fromCreateNewProjectButton: true })}
          >
            {formatMessage(messages.createNewProject)}
          </button>
        )}

        {!isGenerationTemplatesFailed && (
          <button
            className={buttonStyles.buttonHighlighted}
            onClick={() => openProjectInVSCode(generationPath, vscode)}
            disabled={!isGenerationTemplatesSuccess}
          >
            {formatMessage(messages.openProject)}
          </button>
        )}
      </div>
    </ModalContent>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isGenModalOpenSelector(state),
});

export default connect(mapStateToProps)(asModal(injectIntl(GenerationModal), NAVIGATION_MODAL_TYPES.GEN_MODAL));
