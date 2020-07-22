import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import asModal from "../../components/Modal";
import messages from "./messages";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isCosmosDbModalOpenSelector } from "../../store/navigation/modals/selector";
import AccountNameEditor from "./AccountNameEditor/index";
import ApiSelection from "./APISelection/index";
import SubscriptionSelection from "../../components/SubscriptionSelection";
import { InjectedIntlProps, injectIntl } from "react-intl";
import buttonStyles from "../../css/buttonStyles.module.css";
import { KEY_EVENTS } from "../../utils/constants/constants";
import { AZURE, SERVICE_KEYS, AzureResourceType } from "../../utils/constants/azure";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";
import { ICosmosDB } from "../../store/userSelection/services/cosmosDb/model";
import { getCosmosDB } from "../../store/userSelection/services/servicesSelector";
import classNames from "classnames";
import { useState } from "react";
import { closeModalAction } from "../../store/navigation/modals/action";
import { saveCosmosDbAction } from "../../store/userSelection/services/cosmosDb/action";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import LocationSelection from "../../components/LocationSelection";
import { ReactComponent as ArrowDown } from "../../assets/chevron.svg";
import { AppContext } from "../../AppContext";
import ResourceGroupSelection from "../../components/ResourceGroupSelection";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants/internalNames";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const CosmosModal = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const cosmosInStore = useSelector(getCosmosDB);
  const initialSubscription = cosmosInStore ? cosmosInStore.subscription : "";
  const initialAccountName = cosmosInStore ? cosmosInStore.accountName : "";
  const initialLocation = cosmosInStore ? cosmosInStore.location : AZURE.DEFAULT_LOCATION;
  const initialResourceGroup = cosmosInStore ? cosmosInStore.resourceGroup : AZURE.DEFAULT_RESOURCE_GROUP;
  const initialApi = cosmosInStore ? cosmosInStore.api : "";
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [subscription, setSubscription] = useState(initialSubscription);
  const [accountName, setAccountName] = useState(initialAccountName);
  const [api, setApi] = useState(initialApi);
  const [location, setLocation] = useState(initialLocation);
  const [resourceGroup, setResourceGroup] = useState(initialResourceGroup);
  const [isAvailableAccountName, setIsAvailableAccountName] = useState(false);

  React.useEffect(() => {
    if(showAdvanced) {      
      const azureServiceType = SERVICE_KEYS.COSMOS_DB;
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_AZURE_SERVICE_ADVANCED_MODE, {azureServiceType});
    }
  }, [showAdvanced]);
  
  const isEnableSaveButton = (): boolean => {
    const isSubscriptionEmpty = subscription === "";
    const isAccountNameEmpty = accountName === "";
    const isLocationEmpty = location === "";
    const isApiEmpty = api === "";

    return !(isSubscriptionEmpty || isAccountNameEmpty || isLocationEmpty || isApiEmpty || !isAvailableAccountName);
  };

  const getButtonClassNames = () => {
    const buttonClass = isEnableSaveButton() ? buttonStyles.buttonHighlighted : buttonStyles.buttonDark;
    return classNames(buttonClass, styles.button);
  };

  const closeModalIfPressEnterOrSpaceKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(closeModalAction());
    }
  };

  const saveCosmosSelection = () => {
    const cosmosSelection: ICosmosDB = {
      subscription,
      accountName,
      location,
      resourceGroup,
      api,
      groupName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
      internalName: api === AZURE.COSMOS_APIS.MONGO 
        ? WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO
        : WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL,
    };
    dispatch(saveCosmosDbAction(cosmosSelection));
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
        <Cancel
          data-testid="close-button"
          className={styles.closeIcon}
          onClick={() => dispatch(closeModalAction())}
          onKeyDown={closeModalIfPressEnterOrSpaceKey}
        />
      </div>
      <div className={styles.body}>
        <SubscriptionSelection
          initialSubscription={subscription}
          onSubscriptionChange={setSubscription} />

        <AccountNameEditor
          subscription={subscription}
          accountName={accountName}
          onAccountNameChange={setAccountName}
          onIsAvailableAccountNameChange={setIsAvailableAccountName}
        />

        <ApiSelection initialApi={api} onApiChange={setApi} isAdvancedMode={showAdvanced} />

        {/* Advanced Mode */}
        <div className={classNames({ [styles.hide]: !showAdvanced })}>
        <LocationSelection
            location={location}
            subscription={subscription}
            azureServiceType={AzureResourceType.Cosmos}
            onLocationChange={setLocation} />
        <ResourceGroupSelection
          subscription={subscription}
          resourceGroup={resourceGroup}
          onResourceGroupChange={setResourceGroup} />
        </div>
      </div>
      <div className={styles.footer}>
          <button
            className={buttonStyles.buttonLink}
            onClick={() => setShowAdvanced(!showAdvanced)}>
            {formatMessage(showAdvanced ? messages.hideAdvancedMode : messages.showAdvancedMode)}
            <ArrowDown className={classNames(styles.advancedModeIcon, {[styles.rotateAdvancedModeIcon]: !showAdvanced})} />
          </button>
          <button className={getButtonClassNames()} onClick={saveCosmosSelection} disabled={!isEnableSaveButton()}>
            {formatMessage(messages.save)}
          </button>
        </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isCosmosDbModalOpenSelector(state),
});

export default connect(mapStateToProps)(asModal(injectIntl(CosmosModal)));
