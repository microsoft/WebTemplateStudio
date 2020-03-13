import * as React from "react";
import { connect } from "react-redux";
import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions/modalActions";
import { saveAppServiceSettingsAction } from "../../actions/azureActions/appServiceActions";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isAppServiceModalOpenSelector } from "../../selectors/modalSelector";
import RuntimeStackInfo from "./RuntimeStackInfo/RuntimeStackInfo";
import AppServicePlanInfo from "./AppServicePlanInfo/AppServicePlanInfo";
import AppNameEditor from "./AppNameEditor/AppNameEditor";
import SubscriptionSelection from "./SubscriptionSelection/SubscriptionSelection";
import { InjectedIntlProps, injectIntl } from "react-intl";
import buttonStyles from "../../css/buttonStyles.module.css";
import { WIZARD_CONTENT_INTERNAL_NAMES, KEY_EVENTS } from "../../utils/constants";
import styles from "./styles.module.css";
import { Dispatch } from "redux";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import { ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import classNames from "classnames";
import { AppServiceContext } from "./AppServiceContext";
import { useState } from "react";

interface IStateProps {
  isModalOpen: boolean;
}
const DEFAULT_SUBSCRIPTION_VALUE = {
  value: "Select...",
  label: "Select...",
};

interface IDispatchProps {
  closeModal: () => any;
  saveAppService: (appServiceSettings: ISelectedAppService) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const AppServiceModal = (props: Props) => {
  const { intl, saveAppService, closeModal } = props;
  const [subscription, setSubscription] = useState(DEFAULT_SUBSCRIPTION_VALUE);
  const [appName, setAppName] = useState("");
  const [isAvailableAppName, setIsAvailableAppName] = useState(false);

  const isEnableSaveButton = (): boolean => {
    const isSubscriptionEmpty = subscription.value === "";
    const isAppNameEmpty = appName === "";

    return !(isSubscriptionEmpty || isAppNameEmpty || !isAvailableAppName);
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
      subscription: subscription.value,
      resourceGroup: "",
      siteName: appName,
      internalName: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE,
    };
    saveAppService(appServiceSelection);
  };

  return (
    <AppServiceContext.Provider
      value={{
        subscription,
        setSubscription,
        appName,
        setAppName,
        isAvailableAppName,
        setIsAvailableAppName,
      }}
    >
      <React.Fragment>
        <div className={styles.headerContainer}>
          <div className={styles.modalTitle}>{intl.formatMessage(azureModalMessages.appServiceModalTitle)}</div>
          <Cancel className={styles.icon} onClick={closeModal} onKeyDown={closeModalIfPressEnterOrSpaceKey} />
        </div>
        <div className={styles.bodyContainer}>
          <SubscriptionSelection />
          <AppNameEditor />
          <AppServicePlanInfo />
          <RuntimeStackInfo />
          <button className={getButtonClassNames()} onClick={saveAppServiceSelection} disabled={!isEnableSaveButton()}>
            {intl.formatMessage(azureModalMessages.azureModalSave)}
          </button>
        </div>
      </React.Fragment>
    </AppServiceContext.Provider>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAppServiceModalOpenSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IDispatchProps => ({
  closeModal: () => dispatch(closeModalAction()),
  saveAppService: (appServiceSettings: ISelectedAppService) =>
    dispatch(saveAppServiceSettingsAction(appServiceSettings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(asModal(injectIntl(AppServiceModal)));
