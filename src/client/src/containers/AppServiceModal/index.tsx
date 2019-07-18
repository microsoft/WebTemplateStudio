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
import { messages } from "./messages";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { getAppServiceSelectionInDropdownForm } from "../../selectors/appServiceSelector";
import { isAppServiceModalOpenSelector } from "../../selectors/modalSelector";

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
  chooseExistingRadioButtonSelected: boolean;
  selectedBackend: ISelected;
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
  [
    WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS,
    WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS
  ],
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
  },
  chooseExistingRadioButtonSelected: true
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
    chooseExistingRadioButtonSelected,
    setSiteNameAvailability,
    setValidationStatus,
    saveAppServiceSettings,
    closeModal,
    selectedBackend
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
      label: intl.formatMessage(messages.siteNameLabel),
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
      vscode.postMessage({
        module: EXTENSION_MODULES.AZURE,
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE,
        track: true,
        subscription: option.value
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

  /*
   * Listens on radio button change to update button status
   */
  React.useEffect(() => {
    setAppServiceModalButtonStatus(
      appServiceFormData,
      isValidatingName,
      siteNameAvailability,
      setFormIsSendable
    );
  }, [appServiceFormData.chooseExistingRadioButtonSelected]);

  // Update form data with data from store if it exists
  React.useEffect(() => {
    if (selection) {
      const newFunctionState = selection.dropdownSelection;
      newFunctionState.chooseExistingRadioButtonSelected = chooseExistingRadioButtonSelected;
      handleChange(newFunctionState);
    } else {
      setSiteNameAvailability({
        isAvailable: false,
        message: ""
      });
    }
  }, []);

  React.useEffect(() => {
    setAppServiceModalButtonStatus(
      appServiceFormData,
      isValidatingName,
      siteNameAvailability,
      setFormIsSendable
    );
  }, [isValidatingName]);

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

  // when user clicks a radio button, update form data
  const radioButtonOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const element = event.target as HTMLInputElement;
    if (
      element.value ===
      intl.formatMessage(azureModalMessages.azureModalChooseExisting)
    ) {
      updateForm({
        ...appServiceFormData,
        chooseExistingRadioButtonSelected: true
      });
    } else if (
      element.value ===
      intl.formatMessage(
        azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
      )
    ) {
      updateForm({
        ...appServiceFormData,
        chooseExistingRadioButtonSelected: false,
        resourceGroup: {
          value: "",
          label: ""
        }
      });
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
        {/* Choose Resource Group */}
        <div
          className={classNames([styles.selectionContainer], {
            [styles.selectionContainerDisabled]:
              appServiceFormData.subscription.value === ""
          })}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {FORM_CONSTANTS.RESOURCE_GROUP.label}
            </div>
          </div>
          <div className={styles.subLabel}>
            {intl.formatMessage(
              azureModalMessages.azureModalResourceGroupSubLabel
            )}
          </div>
          {/* Radio Buttons for Choose Resource Group */}
          <div
            className={styles.radioButtonContainer}
            onChange={radioButtonOnChangeHandler}
          >
            <input
              className={styles.radioButton}
              type="radio"
              value={intl.formatMessage(
                azureModalMessages.azureModalChooseExisting
              )}
              disabled={appServiceFormData.subscription.value === ""}
              checked={appServiceFormData.chooseExistingRadioButtonSelected}
            />
            <div className={styles.radioButtonLabel}>
              {intl.formatMessage(azureModalMessages.azureModalChooseExisting)}
            </div>
            <input
              className={styles.radiobutton}
              type="radio"
              value={intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
              )}
              disabled={appServiceFormData.subscription.value === ""}
              checked={!appServiceFormData.chooseExistingRadioButtonSelected}
            />
            <div className={styles.radioButtonLabel}>
              {intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
              )}
            </div>
          </div>
          <div className={styles.resourceGroupToggleContainer}>
            {appServiceFormData.chooseExistingRadioButtonSelected ? (
              <Dropdown
                ariaLabel={intl.formatMessage(
                  azureModalMessages.azureModalAriaResourceGroupLabel
                )}
                options={appServiceData.resourceGroup}
                handleChange={option => {
                  handleDropdown(FORM_CONSTANTS.RESOURCE_GROUP.value, option);
                }}
                value={
                  appServiceFormData[FORM_CONSTANTS.RESOURCE_GROUP.value].value
                    ? appServiceFormData[FORM_CONSTANTS.RESOURCE_GROUP.value]
                    : DEFAULT_VALUE
                }
                disabled={appServiceFormData.subscription.value === ""}
                openDropdownUpwards={false}
              />
            ) : (
              intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupSelectedDisplayMessage
              )
            )}
          </div>
        </div>
        {/* Site Name */}
        <div
          className={classNames(
            styles.selectionInputContainer,
            styles.selectionContainer,
            {
              [styles.selectionContainerDisabled]:
                appServiceFormData.subscription.value === ""
            }
          )}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {intl.formatMessage(messages.siteNameLabel)}
            </div>
          </div>
          <div className={styles.subLabel}>
            {intl.formatMessage(messages.siteNameSubLabel)}
          </div>
          <div className={styles.errorStack}>
            <div className={styles.inputContainer}>
              <input
                aria-label={intl.formatMessage(messages.ariaSiteNameLabel)}
                className={styles.input}
                onChange={handleInput}
                value={appServiceFormData.siteName.value}
                placeholder={FORM_CONSTANTS.SITE_NAME.label}
                disabled={appServiceFormData.subscription === ""}
                tabIndex={appServiceFormData.subscription.value === "" ? -1 : 0}
              />
              {isSiteNameAvailable && !isValidatingName && (
                <GreenCheck className={styles.validationIcon} />
              )}
              {isValidatingName && <Spinner className={styles.spinner} />}
            </div>
            {!isValidatingName &&
              !isSiteNameAvailable &&
              appServiceFormData.siteName.value.length > 0 && (
                <div className={styles.errorMessage}>
                  {siteNameAvailability.message}
                </div>
              )}
          </div>
        </div>
        {/* Runtime Stack */}
        <div
          className={classNames(
            styles.selectionInputContainer,
            styles.selectionContainer
          )}
        >
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
      </div>
      {/* Add Resource Button */}
      <button
        className={getButtonClassNames()}
        onClick={handleAddResource}
        disabled={!formIsSendable}
      >
        {(selection &&
          intl.formatMessage(azureModalMessages.azureModalSaveChanges)) ||
          intl.formatMessage(azureModalMessages.azureModalAddResource)}
      </button>
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
  chooseExistingRadioButtonSelected:
    state.selection.services.appService.chooseExistingRadioButtonSelected,
  selectedBackend: state.selection.backendFramework
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
