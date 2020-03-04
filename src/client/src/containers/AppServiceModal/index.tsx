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
import {
  WIZARD_CONTENT_INTERNAL_NAMES,
  KEY_EVENTS
} from "../../utils/constants";
import styles from "./styles.module.css";
import { Dispatch } from "redux";
import {
  setSiteNameAvailabilityAction,
  IAvailabilityFromExtension
} from "../../actions/azureActions/setAccountAvailability";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import RootAction from "../../actions/ActionType";
import { IAvailability, ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import classNames from "classnames";
import { GetSubscriptionData, ValidateAppServiceName } from "../../utils/extensionService/extensionService";

interface IStateProps {
  isModalOpen: boolean;
  vscode: IVSCodeObject;
  subscriptions: [any];
  siteNameAvailability: IAvailability;
  appServiceSelection: ISelectedAppService | null;
  projectName: string;
}

interface IDispatchProps {
  closeModal: () => any;
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) => any;
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
    siteNameAvailability,
    appServiceSelection,
    setSiteNameAvailability,
    saveAppServiceSettings,
    closeModal,
    projectName
  } = props;

  // The data the user has entered into the modal
  const [appServiceFormData, updateForm] = React.useState(initialState);
  const [formIsSendable, setFormIsSendable] = React.useState(false);
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  const onSubscriptionChange = (subscription: string) => {    
    setAppServiceModalButtonStatus();
    GetSubscriptionData(subscription, projectName, vscode)
    .then((event) => {

      const siteName = appServiceFormData.siteName === '' 
        ? event.data.payload.validName 
        : appServiceFormData.siteName;

      const updatedForm = {
        ...appServiceFormData,
        subscription,
        resourceGroup: "",
        siteName
      };
      updateForm(updatedForm);
    });
  };  

  const onSiteNameChange = (newSiteName: string) => {
    // Changes in account name will trigger an update in validation status
  setAppServiceModalButtonStatus();
  updateForm({
    ...appServiceFormData,
    siteName: newSiteName
  });
  }

  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    if (appServiceFormData.siteName === "") {
      return    
    }

    setIsValidatingName(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      ValidateAppServiceName(appServiceFormData.subscription, appServiceFormData.siteName, vscode).then((event) => {
             
        setSiteNameAvailability({
          isAvailable: event.data.payload.isAvailable,
          message: event.data.payload.reason
        });

        setIsValidatingName(false);
      });
    }, 700);

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
    setAppServiceModalButtonStatus();
  }, [isValidatingName]);

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

  const setAppServiceModalButtonStatus = (): void => {  
    const isSubscriptionEmpty = appServiceFormData.subscription === "";
    const isSiteNameEmpty = appServiceFormData.siteName === "";  
    const { isSiteNameAvailable } = siteNameAvailability;
  
    const isDisabled =  isSubscriptionEmpty || isSiteNameEmpty || isValidatingName || !isSiteNameAvailable;
  
    setFormIsSendable(!isDisabled);
  };

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
  siteNameAvailability:state.selection.services.appService.siteNameAvailability,
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
    dispatch(setSiteNameAvailabilityAction(isAvailableObject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(AppServiceModal)));
