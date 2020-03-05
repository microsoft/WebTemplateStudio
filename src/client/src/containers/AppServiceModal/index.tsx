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
  appServiceSelection: ISelectedAppService | null;
  projectName: string;
}

interface IDispatchProps {
  closeModal: () => any;
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const initialState: ISelectedAppService = {
  subscription: "",
  resourceGroup: "",
  siteName: "",
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE,
};

const AppServiceModal = (props: Props) => {
  const { intl, vscode, subscriptions, appServiceSelection, saveAppServiceSettings, closeModal, projectName } = props;

  const [appServiceFormData, setAppServiceFormData] = React.useState(initialState);
  const [isValidatingName, setIsValidatingName] = React.useState(false);
  const [appNameInvalidMessage, setAppNameInvalidMessage] = React.useState("");

  React.useEffect(() => {
    if (appServiceSelection) {
      setAppServiceFormData(appServiceSelection);
    }
  }, []);

  React.useEffect(() => {
    if (appServiceFormData.siteName === "") {
      GetValidAppServiceName(projectName, vscode).then(event => {
        const siteName =
          appServiceFormData.siteName === "" ? event.data.payload.validName : appServiceFormData.siteName;

        setAppServiceFormData({
          ...appServiceFormData,
          resourceGroup: "",
          siteName,
        });
      });
    }
  }, [appServiceFormData.subscription]);

  React.useEffect(() => {
    const isValid = appServiceFormData.subscription !== "";
    if (isValid) {
      setIsValidatingName(true);
      setTimeout(() => {
        ValidateAppServiceName(appServiceFormData.subscription, appServiceFormData.siteName, vscode).then(event => {
          const invalidAppNameMessage = event.data.payload.isAvailable ? "" : event.data.payload.reason;
          setAppNameInvalidMessage(invalidAppNameMessage);
          setIsValidatingName(false);
        });
      }, 700);
    }
  }, [appServiceFormData.siteName]);

  const onSubscriptionChange = (subscription: string) => {
    setAppServiceFormData({
      ...appServiceFormData,
      subscription,
    });
  };

  const onSiteNameChange = (newSiteName: string) => {
    setAppServiceFormData({
      ...appServiceFormData,
      siteName: newSiteName,
    });
  };

  const isEnableSaveButton = (): boolean => {
    const isSubscriptionEmpty = appServiceFormData.subscription === "";
    const isSiteNameEmpty = appServiceFormData.siteName === "";
    const isSiteNameAvailable = appNameInvalidMessage === "";

    return !(isSubscriptionEmpty || isSiteNameEmpty || isValidatingName || !isSiteNameAvailable);
  };

  const getButtonClassNames = () => {
    const buttonClass = isEnableSaveButton() ? buttonStyles.buttonHighlighted : buttonStyles.buttonDark;
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
  };

  return (
    <React.Fragment>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>{intl.formatMessage(azureModalMessages.appServiceModalTitle)}</div>
        <Cancel tabIndex={0} className={styles.icon} onClick={closeModal} onKeyDown={cancelKeyDownHandler} />
      </div>
      <div className={styles.bodyContainer}>
        <SubscriptionSelection
          subscriptions={subscriptions}
          onSubscriptionChange={onSubscriptionChange}
          subscription={appServiceFormData.subscription}
        />
        <AppName
          subscription={appServiceFormData.subscription}
          siteName={appServiceFormData.siteName}
          onSiteNameChange={onSiteNameChange}
          isValidatingName={isValidatingName}
          appNameInvalidMessage={appNameInvalidMessage}
        />
        <AppServicePlanInfo
          isMicrosoftLearnSubscription={isMicrosoftLearnSubscription(appServiceFormData.subscription)}
        />
        <RuntimeStackInfo />
        <button
          className={getButtonClassNames()}
          onClick={() => saveAppServiceSettings(appServiceFormData)}
          disabled={!isEnableSaveButton()}
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
  appServiceSelection: getAppServiceSelectionSelector(state),
  projectName: getProjectName(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IDispatchProps => ({
  closeModal: () => dispatch(closeModalAction()),
  saveAppServiceSettings: (appServiceSettings: ISelectedAppService) =>
    dispatch(saveAppServiceSettingsAction(appServiceSettings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(asModal(injectIntl(AppServiceModal)));
