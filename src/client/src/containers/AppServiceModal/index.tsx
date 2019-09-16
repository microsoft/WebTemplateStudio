/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import * as React from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions/modalActions";
import { saveAppServiceSettingsAction } from "../../actions/azureActions/appServiceActions";
import { appServiceModalInitialState } from "../../mockData/azureModalInitialStateData";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { getAppServiceSelectionInDropdownForm } from "../../selectors/appServiceSelector";
import { isAppServiceModalOpenSelector } from "../../selectors/modalSelector";
import { getProjectName } from "../../selectors/wizardSelectionSelector";

import { InjectedIntlProps, injectIntl } from "react-intl";

import { setAppServiceModalButtonStatus } from "./verifyButtonStatus";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  WIZARD_CONTENT_INTERNAL_NAMES,
  KEY_EVENTS,
  WEB_TEMPLATE_STUDIO_LINKS
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
import { ISelected } from "../../types/selected";
import { ISelectionInformation } from "../../selectors/appServiceSelector";
import { IAvailability } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ISubscriptionData } from "../../reducers/azureLoginReducers/subscriptionDataReducer";
import classNames from "classnames";

const DEFAULT_VALUE = {
  value: "Select...",
  label: "Select..."
};

interface IStateProps {
  isModalOpen: boolean;
  vscode: IVSCodeObject;
  subscriptionData: ISubscriptionData;
  subscriptions: [];
  isValidatingName: boolean;
  siteNameAvailability: IAvailability;
  selection: ISelectionInformation | undefined;
  selectedBackend: ISelected;
  projectName: string;
}

interface IDispatchProps {
  closeModal: () => any;
  saveAppServiceSettings: (appServiceSettings: IAppServiceState) => any;
  setValidationStatus: (status: boolean) => any;
  setSiteNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

interface attributeLinks {
  [key: string]: string;
}

let timeout: NodeJS.Timeout | undefined;

const links: attributeLinks = {
  subscription:
    "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade"
};

const backendFrameworkNameToAppServiceRuntimeStack: Map<
  string,
  string
> = new Map([
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, WIZARD_CONTENT_INTERNAL_NAMES.PYTHON]
]);

// state of user's selections (selected form data)
export interface IAppServiceState {
  [key: string]: any;
}

const initialState: IAppServiceState = {
  subscription: {
    value: "",
    label: ""
  },
  resourceGroup: {
    value: "",
    label: ""
  },
  siteName: {
    value: "",
    label: ""
  },
  internalName: {
    value: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE,
    label: WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE
  }
};

const AppServiceModal = (props: Props) => {
  const {
    intl,
    vscode,
    subscriptions,
    subscriptionData,
    isValidatingName,
    siteNameAvailability,
    selection,
    setSiteNameAvailability,
    setValidationStatus,
    saveAppServiceSettings,
    closeModal,
    selectedBackend,
    projectName
  } = props;

  const FORM_CONSTANTS = {
    SUBSCRIPTION: {
      label: intl.formatMessage(azureModalMessages.azureModalSubscriptionLabel),
      value: "subscription"
    },
    RESOURCE_GROUP: {
      label: intl.formatMessage(
        azureModalMessages.azureModalResourceGroupLabel
      ),
      value: "resourceGroup"
    },
    SITE_NAME: {
      label: intl.formatMessage(azureModalMessages.appServiceAppNameLabel),
      value: "siteName"
    },
    RUNTIME_STACK: {
      label: intl.formatMessage(azureModalMessages.runtimeStackLabel),
      value: "runtimeStack"
    }
  };

  // data we are presenting to the user (available subscriptions, resource groups, etc.)
  const [appServiceData, setData] = React.useState(appServiceModalInitialState);

  // Updates the data we are presenting to the user when the subscription changes
  React.useEffect(() => {
    setData({
      ...appServiceData,
      siteName: [
        {
          value: "",
          label: ""
        }
      ],
      subscription: subscriptions,
      resourceGroup: subscriptionData.resourceGroups
    });
  }, [subscriptionData]);

  // The data the user has entered into the modal
  const [appServiceFormData, updateForm] = React.useState(initialState);
  const [formIsSendable, setFormIsSendable] = React.useState(false);

  // Updates the data the user enters as the user types
  const handleChange = (updatedAppServiceForm: IAppServiceState) => {
    setAppServiceModalButtonStatus(
      updatedAppServiceForm,
      isValidatingName,
      siteNameAvailability,
      setFormIsSendable
    );
    updateForm(updatedAppServiceForm);
  };

  const handleDropdown = (infoLabel: string, option: IDropDownOptionType) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    let updatedForm = {
      ...appServiceFormData,
      [infoLabel]: {
        value: option.value,
        label: option.label
      }
    };
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION.value) {
      // Get resource Group and locations and set the dropdown options to them
      setData({
        ...appServiceData,
        resourceGroup: []
      });
      setValidationStatus(true);
      vscode.postMessage({
        module: EXTENSION_MODULES.AZURE,
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE,
        track: true,
        subscription: option.value,
        projectName
      });
      updatedForm = {
        ...updatedForm,
        resourceGroup: {
          value: "",
          label: ""
        }
      };
    }
    handleChange(updatedForm);
  };

  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    if (appServiceFormData.siteName.value !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = undefined;
        vscode.postMessage({
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.NAME_APP_SERVICE,
          track: false,
          appName: appServiceFormData.siteName.value,
          subscription: appServiceFormData.subscription.value
        });
      }, 700);
    }
  }, [appServiceFormData.siteName.value]);

  // Update form data with data from store if it exists
  React.useEffect(() => {
    if (selection) {
      setSiteNameAvailability({
        isAvailable: true,
        message: ""
      });
      const newAppServiceState = selection.dropdownSelection;
      setFormIsSendable(true);
      updateForm(newAppServiceState);
    } else {
      setSiteNameAvailability({
        isAvailable: false,
        message: ""
      });
    }
  }, []);

  React.useEffect(() => {
    if (!appServiceFormData.siteName.value) {
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
      !selection || appServiceFormData.subscription.value !== "";
    if (shouldRunEffect) {
      updateForm({
        ...appServiceFormData,
        siteName: {
          value: subscriptionData.validName,
          label: subscriptionData.validName
        }
      });
      // programatically updating <input>'s value field doesn't dispatch an event to handleInput
      // so we manually simulate handleInput here
      setValidationStatus(true);
      handleChange({
        ...appServiceFormData,
        siteName: {
          value: subscriptionData.validName,
          label: subscriptionData.validName
        }
      });
    }
  }, [subscriptionData.validName]);

  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    // Changes in account name will trigger an update in validation status
    setValidationStatus(true);
    handleChange({
      ...appServiceFormData,
      siteName: {
        value: element.value,
        label: element.value
      }
    });
  };

  const getButtonClassNames = () => {
    const buttonClass = formIsSendable
      ? buttonStyles.buttonHighlighted
      : buttonStyles.buttonDark;

    return classNames(buttonClass, styles.button);
  };

  const handleAddResource = () => {
    saveAppServiceSettings(appServiceFormData);
  };

  const getDropdownSection = (
    leftHeader: string,
    options: any,
    formSectionId: string,
    ariaLabel: string,
    rightHeader?: string,
    disabled?: boolean,
    defaultValue?: any,
    openDropdownUpwards?: boolean,
    subLabel?: string
  ) => {
    return (
      <div
        className={classNames([styles.selectionContainer], {
          [styles.selectionContainerDisabled]: disabled
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div className={styles.leftHeader}>{leftHeader}</div>
          {links[formSectionId] && (
            <a
              tabIndex={disabled ? -1 : 0}
              className={styles.link}
              href={links[formSectionId]}
            >
              {rightHeader}
            </a>
          )}
        </div>
        <div className={styles.subLabel}>{subLabel}</div>
        <Dropdown
          ariaLabel={ariaLabel}
          options={options}
          handleChange={option => {
            handleDropdown(formSectionId, option);
          }}
          value={
            appServiceFormData[formSectionId].value
              ? appServiceFormData[formSectionId]
              : defaultValue
          }
          disabled={disabled}
          openDropdownUpwards={openDropdownUpwards}
        />
      </div>
    );
  };

  const { isSiteNameAvailable } = siteNameAvailability;
  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
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
        {/* Subscription */}
        {getDropdownSection(
          FORM_CONSTANTS.SUBSCRIPTION.label,
          appServiceData.subscription,
          FORM_CONSTANTS.SUBSCRIPTION.value,
          intl.formatMessage(
            azureModalMessages.azureModalAriaSubscriptionLabel
          ),
          intl.formatMessage(azureModalMessages.azureModalCreateNew),
          false,
          DEFAULT_VALUE,
          false,
          intl.formatMessage(azureModalMessages.azureModalSubscriptionSubLabel)
        )}
        {/* Site Name */}
        <div
          className={classNames(styles.selectionContainer, {
            [styles.selectionContainerDisabled]:
              appServiceFormData.subscription.value === ""
          })}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {intl.formatMessage(azureModalMessages.appServiceAppNameLabel)}
            </div>
          </div>
          <div className={styles.subLabel}>
            {intl.formatMessage(azureModalMessages.appServiceAppNameSubLabel)}
          </div>
          <div className={styles.errorStack}>
            <div className={styles.inputContainer}>
              <input
                aria-label={intl.formatMessage(
                  azureModalMessages.appServiceAriaAppNameLabel
                )}
                className={styles.input}
                onChange={handleInput}
                value={
                  appServiceFormData.subscription.value === ""
                    ? ""
                    : appServiceFormData.siteName.value
                }
                placeholder={FORM_CONSTANTS.SITE_NAME.label}
                disabled={appServiceFormData.subscription.value === ""}
                tabIndex={appServiceFormData.subscription.value === "" ? -1 : 0}
              />
              {appServiceFormData.subscription.value &&
                isSiteNameAvailable &&
                !isValidatingName && (
                  <GreenCheck className={styles.validationIcon} />
                )}
              {appServiceFormData.subscription.value && isValidatingName && (
                <Spinner className={styles.spinner} />
              )}
            </div>
            {!isValidatingName &&
              !isSiteNameAvailable &&
              appServiceFormData.siteName.value.length > 0 &&
              siteNameAvailability.message && (
                <div className={styles.errorMessage}>
                  {siteNameAvailability.message}
                </div>
              )}
          </div>
        </div>
        {/* App Service Plan Information */}
        <div className={styles.aspInfoContainer}>
          <div
            className={classNames(
              styles.selectionHeaderContainer,
              styles.leftHeader
            )}
          >
            {intl.formatMessage(azureModalMessages.appServicePlanLabel)}
          </div>
          <div>{intl.formatMessage(azureModalMessages.appServiceInfo)}</div>
          <a
            className={styles.link}
            target={"_blank"}
            rel="noreferrer noopener"
            href={WEB_TEMPLATE_STUDIO_LINKS.APP_SERVICE_PLAN}
          >
            {intl.formatMessage(azureModalMessages.appServiceLearnMore)}
          </a>
        </div>

        {/* Runtime Stack */}
        <div className={styles.selectionContainer}>
          <div
            className={classNames(
              styles.selectionHeaderContainer,
              styles.leftHeader
            )}
          >
            {intl.formatMessage(azureModalMessages.runtimeStackLabel)}
          </div>
          <div>
            {intl.formatMessage(azureModalMessages.runtimeStackSubLabel, {
              runtimeStack: backendFrameworkNameToAppServiceRuntimeStack.get(
                selectedBackend.internalName
              )
            })}
          </div>
        </div>
        {/* Save Button */}
        <button
          className={getButtonClassNames()}
          onClick={handleAddResource}
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
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  siteNameAvailability:
    state.selection.services.appService.siteNameAvailability,
  isValidatingName: state.selection.isValidatingName,
  selection: getAppServiceSelectionInDropdownForm(state),
  selectedBackend: state.selection.backendFramework,
  projectName: getProjectName(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveAppServiceSettings: (appServiceSettings: IAppServiceState) => {
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
