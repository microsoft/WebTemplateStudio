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
import { WIZARD_CONTENT_INTERNAL_NAMES, KEY_EVENTS } from "../../utils/constants";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";
import { ISelectedCosmosService } from "../../store/azureProfileData/cosmosDb/model";
import { getCosmosDbSelectionSelector } from "../../store/azureProfileData/cosmosDb/selector";
import classNames from "classnames";
import { useState } from "react";
import { closeModalAction } from "../../store/navigation/modals/action";
import { saveCosmosDbSettingsAction } from "../../store/azureProfileData/cosmosDb/action";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const CosmosModal = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const cosmosInStore = useSelector((state: AppState) => getCosmosDbSelectionSelector(state));
  const initialSubscription = cosmosInStore ? cosmosInStore.subscription : "";
  const initialAccountName = cosmosInStore ? cosmosInStore.accountName : "";
  const initialApi = cosmosInStore ? cosmosInStore.api : "";

  const [subscription, setSubscription] = useState(initialSubscription);
  const [accountName, setAccountName] = useState(initialAccountName);
  const [api, setApi] = useState(initialApi);
  const [isAvailableAccountName, setIsAvailableAccountName] = useState(false);

  const isEnableSaveButton = (): boolean => {
    const isSubscriptionEmpty = subscription === "";
    const isAccountNameEmpty = accountName === "";
    const isApiEmpty = api === "";

    return !(isSubscriptionEmpty || isAccountNameEmpty || isApiEmpty || !isAvailableAccountName);
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
    const cosmosSelection: ISelectedCosmosService = {
      subscription,
      accountName,
      resourceGroup: "",
      api,
      internalName:  WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB
    };
    dispatch(saveCosmosDbSettingsAction(cosmosSelection));
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
        <Cancel data-testid="close-button" className={styles.closeIcon} onClick={() => dispatch(closeModalAction())} onKeyDown={closeModalIfPressEnterOrSpaceKey} />
      </div>
      <div className={styles.bodyContainer}>
        <SubscriptionSelection
          initialSubscription={subscription}
          onSubscriptionChange={setSubscription} />

        <AccountNameEditor
          subscription={subscription}
          accountName={accountName}
          onAccountNameChange={setAccountName}
          onIsAvailableAccountNameChange={setIsAvailableAccountName}
        />
        <ApiSelection
          initialApi={api}
          onApiChange={setApi} />

        <button className={getButtonClassNames()} onClick={saveCosmosSelection} disabled={!isEnableSaveButton()}>
          {formatMessage(messages.save)}
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isCosmosDbModalOpenSelector(state)
});

export default connect(mapStateToProps)(asModal(injectIntl(CosmosModal)));
