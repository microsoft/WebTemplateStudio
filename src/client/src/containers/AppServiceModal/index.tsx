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

import { setAppServiceModalButtonStatus } from "./verifyButtonStatus";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  WIZARD_CONTENT_INTERNAL_NAMES,
  KEY_EVENTS
} from "../../utils/constants";
import styles from "./styles.module.css";
import { Dispatch } from "redux";
import { setAzureValidationStatusAction } from "../../actions/azureActions/setAzureValidationStatusAction";
import {
  setSiteNameAvailabilityAction,
  IAvailabilityFromExtension
} from "../../actions/azureActions/setAccountAvailability";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import RootAction from "../../actions/ActionType";
import { IAvailability, ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ISubscriptionData } from "../../reducers/azureLoginReducers/subscriptionDataReducer";
import classNames from "classnames";

interface IStateProps {
  isModalOpen: boolean;
  vscode: IVSCodeObject;
  subscriptions: [any];
  subscriptionData: ISubscriptionData;
  isValidatingName: boolean;
  siteNameAvailability: IAvailability;
  appServiceSelection: ISelectedAppService | null;
  projectName: string;
}

interface IDispatchProps {
  closeModal: () => any;
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) => any;
  setValidationStatus: (status: boolean) => any;
  setSiteNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

let timeout: NodeJS.Timeout | undefined;

const initialState: ISelectedAppService = {
  subscription: "",
  resourceGroup: "",
  siteName: "",
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE
};

const AppServiceModal = (props: Props) => {
  const {
    intl,
    vscode,
    subscriptions,
    subscriptionData,
    isValidatingName,
    siteNameAvailability,
    appServiceSelection,
    setSiteNameAvailability,
    setValidationStatus,
    saveAppServiceSettings,
    closeModal,
    projectName
  } = props;

  // The data the user has entered into the modal
  const [appServiceFormData, updateForm] = React.useState(initialState);
  const [formIsSendable, setFormIsSendable] = React.useState(false);

  // Updates the data the user enters as the user types
  const handleChange = (updatedAppServiceForm: ISelectedAppService) => {
    setAppServiceModalButtonStatus(
      updatedAppServiceForm,
      isValidatingName,
      siteNameAvailability,
      setFormIsSendable
    );
    updateForm(updatedAppServiceForm);
  };

  const onSubscriptionChange = (subscription: string) => {
    setValidationStatus(true);
    vscode.postMessage({
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE,
      track: true,
      subscription,
      projectName
    });

    const updatedForm = {
      ...appServiceFormData,
      subscription,
      resourceGroup: ""
    };

    handleChange(updatedForm);
  };

  

  const onSiteNameChange = (newSiteName: string) => {
    // Changes in account name will trigger an update in validation status
  setValidationStatus(true);
  handleChange({
    ...appServiceFormData,
    siteName: newSiteName
  });
  }

  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    if (appServiceFormData.siteName !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = undefined;
        vscode.postMessage({
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.NAME_APP_SERVICE,
          track: false,
          appName: appServiceFormData.siteName,
          subscription: appServiceFormData.subscription
        });
      }, 700);
    }
  }, [appServiceFormData.siteName]);

  // Update form data with data from store if it exists
  React.useEffect(() => {
    if (appServiceSelection) {
      setSiteNameAvailability({
        isAvailable: true,
        message: ""
      });
      setFormIsSendable(true);
      updateForm(appServiceSelection);
    } else {
      setSiteNameAvailability({
        isAvailable: false,
        message: ""
      });
    }
  }, []);

  React.useEffect(() => {
    if (!appServiceFormData.siteName) {
      return;
    }
    setAppServiceModalButtonStatus(
      appServiceFormData,
      isValidatingName,
      siteNameAvailability,
      setFormIsSendable
    );
  }, [isValidatingName]);

  /**
   * Update name field with a valid name generated from
   * extension when a subscription is selected or changed
   */
  React.useEffect(() => {
    if (subscriptionData.validName === "") return;

    // if a selection exists (i.e. user has saved form data),
    // this effect should only be run after selection has been loaded (i.e. subscription value is not empty)
    const shouldRunEffect =
      !appServiceSelection || appServiceFormData.subscription !== "";
    if (shouldRunEffect) {
      updateForm({
        ...appServiceFormData,
        siteName:subscriptionData.validName
      });
      // programatically updating <input>'s value field doesn't dispatch an event to handleInput
      // so we manually simulate handleInput here
      setValidationStatus(true);
      handleChange({
        ...appServiceFormData,
        siteName: subscriptionData.validName
      });
    }
  }, [subscriptionData.validName]);


  const getButtonClassNames = () => {
    const buttonClass = formIsSendable
      ? buttonStyles.buttonHighlighted
      : buttonStyles.buttonDark;

    return classNames(buttonClass, styles.button);
  };

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  const isMicrosoftLearnSubscription = (subscription: string): boolean => {
    const s = subscriptions.find(s => s.value === subscription);
    return s && s.isMicrosoftLearnSubscription;
  }

  return (
    <React.Fragment>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>
          {intl.formatMessage(azureModalMessages.appServiceModalTitle)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.icon}
          onClick={closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <div className={styles.bodyContainer}>
        <SubscriptionSelection 
          subscriptions={subscriptions}
          onSubscriptionChange={onSubscriptionChange}
          subscription={appServiceFormData.subscription} />
        <AppName
         subscription={appServiceFormData.subscription}
         siteName={appServiceFormData.siteName}
         onSiteNameChange={onSiteNameChange}
         isValidatingName={isValidatingName}
         siteNameAvailability={siteNameAvailability}
          />
        <AppServicePlanInfo isMicrosoftLearnSubscription={isMicrosoftLearnSubscription(appServiceFormData.subscription)} />
        <RuntimeStackInfo />
        {/* Save Button */}
        <button
          className={getButtonClassNames()}
          onClick={() => saveAppServiceSettings(appServiceFormData)}
          disabled={!formIsSendable}
        >
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
  subscriptionData: state.azureProfileData.subscriptionData,
  siteNameAvailability:
    state.selection.services.appService.siteNameAvailability,
  isValidatingName: state.selection.isValidatingName,
  appServiceSelection: getAppServiceSelectionSelector(state),
  projectName: getProjectName(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) => {
    dispatch(saveAppServiceSettingsAction(appServiceSettings));
  },
  setSiteNameAvailability: (isAvailableObject: IAvailabilityFromExtension) =>
    dispatch(setSiteNameAvailabilityAction(isAvailableObject)),
  setValidationStatus: (status: boolean) =>
    dispatch(setAzureValidationStatusAction(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(AppServiceModal)));
