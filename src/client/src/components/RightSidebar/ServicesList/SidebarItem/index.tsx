import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import loadable from '@loadable/component'
import { ReactComponent as CloseSVG } from "../../../../assets/cancel.svg";
import { ReactComponent as EditSVG } from "../../../../assets/edit.svg";
import { ISelected } from "../../../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS, SERVICE_KEYS } from "../../../../utils/constants/constants";
import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../../store/combineReducers";
import messages from "./messages";
import { getValidations } from "../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../../../store/config/validations/model";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";

// get our fontawesome imports
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";
import { AppContext } from "../../../../AppContext";

const CosmosDBIcon = loadable(() => import(/* webpackChunkName: "CosmosdbIcon" */  "../../../../utils/svgComponents/CosmosdbIcon"));
const AppServiceIcon = loadable(() => import(/* webpackChunkName: "AppServiceIcon" */  "../../../../utils/svgComponents/AppserviceIcon"));

interface IStateProps {
  text?: string;
  cosmosDB?: boolean;
  appService?: boolean;
  idx?: number;
  withIndent?: boolean;
  handleCloseClick?: (idx: number) => void;
  handleConfigClick?: (idx: number) => void;
  intl: InjectedIntl;
  customInputStyle?: string;
  editable?: boolean;
  configurable?: boolean;
}

interface ISortablePageListProps {
  selectedPages: Array<ISelected>;
  validations: IValidations;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps;



//match name and component
const DraggableSidebarItem = ({
  text,
  cosmosDB,
  appService,
  idx,
  handleConfigClick,
  handleCloseClick,
  intl,
  customInputStyle,
  editable,
  configurable
}: Props) => {
  const { vscode } = React.useContext(AppContext);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    //register telemetry
    //TOASK: What´s this for and how can I check it? Related to Sibille´s email last week?
    if (openModal) {
      const azureServiceType = cosmosDB
        ? SERVICE_KEYS.COSMOS_DB
        : (appService ? SERVICE_KEYS.APP_SERVICE : '');
      const extensionCommand = cosmosDB
        ? EXTENSION_COMMANDS.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST
        : (appService) ? EXTENSION_COMMANDS.TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST : '';

      sendTelemetry(vscode, extensionCommand, { azureServiceType })
    }
  }, [openModal]);

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleCloseOnClick();
    }
  };  
  const handleCloseOnClick = () => {
    idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };
  
  
    //TODO Note to myself: This could be related to the issue on the top bar not working with ENTER but working with SPACE
    const handleConfigKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
      if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
        handleConfigOnClick();
      }
    };
  const handleConfigOnClick = () => {
    setOpenModal(!openModal);
    idx && handleConfigClick && handleConfigClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

  return (
    <>
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          {cosmosDB && <CosmosDBIcon style={styles.reorderIcon} />}
          {appService && <AppServiceIcon style={styles.reorderIcon} />}
        </div>
        {editable && <div className={styles.errorStack}>
          <div
            className={classnames(customInputStyle, {
              [styles.pagesTextContainer]: true
            })}
          >
            <div className={styles.inputContainer}>
              {idx && (
                <input
                  className={classnames(
                    styles.disabledInput,
                    styles.input,
                    customInputStyle
                  )}
                  value={text}
                  disabled={true}
                />
              )}
            </div>
          </div>
        </div>}
        {!editable && <div className={styles.errorStack}>
          <div className={classnames({
            [styles.pagesTextContainerNoEdit]: true
          })}>
            {text}
          </div>
        </div>}
        {configurable &&
          <EditSVG
            tabIndex={0}
            onClick={handleConfigOnClick}
            onKeyDown={handleConfigKeyDown}
            className={styles.editIcon}
            aria-label={intl.formatMessage(messages.configItem)}
          />
        }
        
        <CloseSVG
          tabIndex={0}
          onClick={handleCloseOnClick}
          onKeyDown={handleKeyDown}
          className={styles.cancelIcon}
          aria-label={intl.formatMessage(messages.deleteItem)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.userSelection.pages,
  validations: getValidations(state)
});


export default connect(
  mapStateToProps
)(injectIntl(DraggableSidebarItem));
