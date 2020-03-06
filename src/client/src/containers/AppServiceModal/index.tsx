import * as React from "react";
import { connect } from "react-redux";
import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions/modalActions";
import { saveAppServiceSettingsAction } from "../../actions/azureActions/appServiceActions";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { getAppServiceSelectionSelector } from "../../selectors/appServiceSelector";
import { isAppServiceModalOpenSelector } from "../../selectors/modalSelector";
import { getProjectName } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import RuntimeStackInfo from "./RuntimeStackInfo/RuntimeStackInfo";
import AppServicePlanInfo from "./AppServicePlanInfo/AppServicePlanInfo";
import AppName from "./AppName/AppName";
import SubscriptionSelection from "./SubscriptionSelection/SubscriptionSelection";
import { InjectedIntlProps, injectIntl } from "react-intl";
import buttonStyles from "../../css/buttonStyles.module.css";
import { WIZARD_CONTENT_INTERNAL_NAMES, KEY_EVENTS } from "../../utils/constants";
import styles from "./styles.module.css";
import { Dispatch } from "redux";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import RootAction from "../../actions/ActionType";
import { ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import classNames from "classnames";
import { GetValidAppServiceName, ValidateAppServiceName } from "../../utils/extensionService/extensionService";

interface IStateProps {
  isModalOpen: boolean;
  vscode: IVSCodeObject;
  subscriptions: [any];
  savedAppServiceSelection: ISelectedAppService | null;
  projectName: string;
}

interface IDispatchProps {
  closeModal: () => any;
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const AppServiceModal = (props: Props) => {
  const {
    intl,
    vscode,
    subscriptions,
    savedAppServiceSelection,
    saveAppServiceSettings,
    closeModal,
    projectName,
  } = props;

  const [subscription, setSubscription] = React.useState("");
  const [appName, setAppName] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);
  const [appNameInvalidMessage, setAppNameInvalidMessage] = React.useState("");

  React.useEffect(() => {
    if (savedAppServiceSelection) {
      setSubscription(savedAppServiceSelection.subscription);
      setAppName(savedAppServiceSelection.siteName);
    }
  }, []);

  React.useEffect(() => {
    if (subscription !== "" && appName === "") {
      GetValidAppServiceName(projectName, vscode)
      .then(event => setAppName(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    if (subscription !== "") {
      setIsValidatingName(true);
      setTimeout(() => {
        ValidateAppServiceName(subscription, appName, vscode).then(event => {
          const message = event.data.payload.isAvailable ? "" : event.data.payload.reason;
          setAppNameInvalidMessage(message);
          setIsValidatingName(false);
        });
      }, 700);
    }
  }, [appName]);

  const onSubscriptionChange = (subscription: string) => {
    setSubscription(subscription);
  };

  const onAppNameChange = (newAppName: string) => {
    setAppName(newAppName);
  };

  const isEnableSaveButton = (): boolean => {
    const isSubscriptionEmpty = subscription === "";
    const isAppNameEmpty = appName === "";
    const isAppNameAvailable = appNameInvalidMessage === "";

    return !(isSubscriptionEmpty || isAppNameEmpty || isValidatingName || !isAppNameAvailable);
  };

  const getButtonClassNames = () => {
    const buttonClass = isEnableSaveButton() ? buttonStyles.buttonHighlighted : buttonStyles.buttonDark;
    return classNames(buttonClass, styles.button);
  };

  const closeModalIfPressEnterOrSpaceKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  const saveAppServiceSelection = (): void => {
    const appServiceSelection: ISelectedAppService = {
      subscription,
      resourceGroup: "",
      siteName: appName,
      internalName: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE,
    };
    saveAppServiceSettings(appServiceSelection);
  };

  return (
    <React.Fragment>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>{intl.formatMessage(azureModalMessages.appServiceModalTitle)}</div>
        <Cancel className={styles.icon} onClick={closeModal} onKeyDown={closeModalIfPressEnterOrSpaceKey} />
      </div>
      <div className={styles.bodyContainer}>
        <SubscriptionSelection
          subscriptions={subscriptions}
          onSubscriptionChange={onSubscriptionChange}
          subscription={subscription}
        />
        <AppName
          subscription={subscription}
          siteName={appName}
          onAppNameChange={onAppNameChange}
          isValidatingName={isValidatingName}
          appNameInvalidMessage={appNameInvalidMessage}
        />
        <AppServicePlanInfo 
          subscriptions={subscriptions}
          subscription={subscription} />
        <RuntimeStackInfo />
        <button className={getButtonClassNames()} onClick={saveAppServiceSelection} disabled={!isEnableSaveButton()}>
          {intl.formatMessage(azureModalMessages.azureModalSave)}
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAppServiceModalOpenSelector(state),
  vscode: getVSCodeApiSelector(state),
  subscriptions: state.azureProfileData.profileData.subscriptions,
  savedAppServiceSelection: getAppServiceSelectionSelector(state),
  projectName: getProjectName(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IDispatchProps => ({
  closeModal: () => dispatch(closeModalAction()),
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) =>
    dispatch(saveAppServiceSettingsAction(appServiceSettings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(asModal(injectIntl(AppServiceModal)));
