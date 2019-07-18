/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import asModal from "../../components/Modal";

import { saveAzureFunctionsSettingsAction } from "../../actions/azureActions/azureFunctionActions";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import { azureFunctionModalInitialState } from "../../mockData/azureModalInitialStateData";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { getFunctionsSelection } from "../../selectors/azureFunctionsServiceSelector";
import { isAzureFunctionsModalOpenSelector } from "../../selectors/modalSelector";

import { InjectedIntlProps, injectIntl } from "react-intl";

import { setFunctionsModalButtonStatus } from "./verifyButtonStatus";

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
  setAppNameAvailabilityAction,
  IAvailabilityFromExtension
} from "../../actions/azureActions/setAccountAvailability";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import RootAction from "../../actions/ActionType";
import { messages } from "./messages";
import classNames from "classnames";
import keyUpHandler from "../../utils/keyUpHandler";

const DEFAULT_VALUE = {
  value: "Select...",
  label: "Select..."
};

interface IDispatchProps {
  closeModal: () => any;
  saveAzureFunctionsOptions: (azureFunctionsOptions: any) => any;
  setValidationStatus: (status: boolean) => any;
  setAppNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  isValidatingName: boolean;
  appNameAvailability: any;
  selection: any;
  chooseExistingRadioButtonSelected: boolean;
}

type Props = IDispatchProps & IStateProps & InjectedIntlProps;

interface attributeLinks {
  [key: string]: any;
}

let timeout: NodeJS.Timeout | undefined;

const links: attributeLinks = {
  subscription:
    "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  api: null,
  location: null,
  numFunctions: null,
  runtimeStack: null
};

interface IFunctionsState {
  [key: string]: any;
}

const initialState: IFunctionsState = {
  subscription: {
    value: "",
    label: ""
  },
  resourceGroup: {
    value: "",
    label: ""
  },
  appName: {
    value: "",
    label: ""
  },
  runtimeStack: {
    value: "node",
    label: "JavaScript"
  },
  location: {
    value: "",
    label: ""
  },
  numFunctions: {
    value: 0,
    label: 0
  },
  internalName: {
    value: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS,
    label: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS
  },
  chooseExistingRadioButtonSelected: true
};

const AzureFunctionsResourceModal = (props: Props) => {
  const FORM_CONSTANTS = {
    SUBSCRIPTION: {
      label: props.intl.formatMessage(
        azureModalMessages.azureModalSubscriptionLabel
      ),
      value: "subscription"
    },
    RESOURCE_GROUP: {
      label: props.intl.formatMessage(
        azureModalMessages.azureModalResourceGroupLabel
      ),
      value: "resourceGroup"
    },
    LOCATION: {
      label: props.intl.formatMessage(
        azureModalMessages.azureModalLocationLabel
      ),
      value: "location"
    },
    RUNTIME_STACK: {
      label: props.intl.formatMessage(azureModalMessages.runtimeStackLabel),
      value: "runtimeStack"
    },
    NUM_FUNCTIONS: {
      label: props.intl.formatMessage(messages.numFunctionsLabel),
      value: "numFunctions"
    },
    APP_NAME: {
      label: props.intl.formatMessage(messages.appNameLabel),
      value: "appName"
    }
  };

  // The data we are presenting to the user (available resource groups, locations)
  const [functionsData, setData] = React.useState(
    azureFunctionModalInitialState
  );

  // Updates the data we are presenting to the user when the subscription changes
  React.useEffect(() => {
    setData({
      ...functionsData,
      appName: [
        {
          value: "",
          label: ""
        }
      ],
      subscription: props.subscriptions,
      resourceGroup: props.subscriptionData.resourceGroups,
      location: props.subscriptionData.locations
    });
  }, [props.subscriptionData]);

  // The data the user has entered into the modal
  const [azureFunctionsFormData, updateForm] = React.useState(initialState);
  const [formIsSendable, setFormIsSendable] = React.useState(false);

  // Updates the data the user enters (azureFunctionsFormData) as the user types
  const handleChange = (updatedFunctionsForm: IFunctionsState) => {
    setFunctionsModalButtonStatus(
      updatedFunctionsForm,
      props.isValidatingName,
      props.appNameAvailability,
      setFormIsSendable
    );
    updateForm(updatedFunctionsForm);
  };

  const handleDropdown = (infoLabel: string, option: IDropDownOptionType) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    let updatedForm = {
      ...azureFunctionsFormData,
      [infoLabel]: {
        value: option.value,
        label: option.label
      }
    };
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION.value) {
      // Get resource Group and locations and set the dropdown options to them
      setData({
        ...functionsData,
        resourceGroup: []
      });
      props.vscode.postMessage({
        module: EXTENSION_MODULES.AZURE,
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS,
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
    if (azureFunctionsFormData.appName.value !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = undefined;
        props.vscode.postMessage({
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
          track: false,
          appName: azureFunctionsFormData.appName.value,
          subscription: azureFunctionsFormData.subscription.value
        });
      }, 700);
    }
  }, [azureFunctionsFormData.appName.value]);

  /*
   * Listens on radio button change to update button status
   */
  React.useEffect(() => {
    setFunctionsModalButtonStatus(
      azureFunctionsFormData,
      props.isValidatingName,
      props.appNameAvailability,
      setFormIsSendable
    );
  }, [azureFunctionsFormData.chooseExistingRadioButtonSelected]);

  // Update form data with data from store if it exists
  React.useEffect(() => {
    if (props.selection) {
      const newFunctionState = props.selection.dropdownSelection;
      newFunctionState.chooseExistingRadioButtonSelected =
        props.chooseExistingRadioButtonSelected;
      handleChange(newFunctionState);
    } else {
      props.setAppNameAvailability({
        isAvailable: false,
        message: ""
      });
    }
  }, []);

  React.useEffect(() => {
    setFunctionsModalButtonStatus(
      azureFunctionsFormData,
      props.isValidatingName,
      props.appNameAvailability,
      setFormIsSendable
    );
  }, [props.isValidatingName]);

  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;

    // Changes in account name will trigger an update in validation status
    // Set validation status here to avoid premature error messages
    props.setValidationStatus(true);
    handleChange({
      ...azureFunctionsFormData,
      appName: {
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
    props.saveAzureFunctionsOptions(azureFunctionsFormData);
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
        className={classnames([styles.selectionContainer], {
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
              onKeyUp={keyUpHandler}
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
            azureFunctionsFormData[formSectionId].value
              ? azureFunctionsFormData[formSectionId]
              : defaultValue
          }
          disabled={disabled}
          openDropdownUpwards={openDropdownUpwards}
        />
      </div>
    );
  };
  const getNumFunctionsData = () => {
    // limit the number of generated functions to 10
    const dropDownArray = [];
    for (let i = 1; i <= 10; i++) {
      dropDownArray.push({ value: i, label: i });
    }
    return dropDownArray;
  };
  const { isAppNameAvailable } = props.appNameAvailability;
  const { isValidatingName } = props;
  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      props.closeModal();
    }
  };
  // when user clicks a radio button, update form data
  const radioButtonOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    let element = event.target as HTMLInputElement;
    if (
      element.value ===
      props.intl.formatMessage(azureModalMessages.azureModalChooseExisting)
    ) {
      updateForm({
        ...azureFunctionsFormData,
        chooseExistingRadioButtonSelected: true
      });
    } else if (
      element.value ===
      props.intl.formatMessage(
        azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
      )
    ) {
      updateForm({
        ...azureFunctionsFormData,
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
          {props.intl.formatMessage(messages.createFunctionApp)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.icon}
          onClick={props.closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <div className={styles.bodyContainer}>
        {/* Subscription */}
        {getDropdownSection(
          FORM_CONSTANTS.SUBSCRIPTION.label,
          functionsData.subscription,
          FORM_CONSTANTS.SUBSCRIPTION.value,
          props.intl.formatMessage(
            azureModalMessages.azureModalAriaSubscriptionLabel
          ),
          props.intl.formatMessage(azureModalMessages.azureModalCreateNew),
          false,
          DEFAULT_VALUE,
          false,
          props.intl.formatMessage(
            azureModalMessages.azureModalSubscriptionSubLabel
          )
        )}
        {/* Choose Resource Group */}
        <div
          className={classnames([styles.selectionContainer], {
            [styles.selectionContainerDisabled]:
              azureFunctionsFormData.subscription.value === ""
          })}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {FORM_CONSTANTS.RESOURCE_GROUP.label}
            </div>
          </div>
          <div className={styles.subLabel}>
            {props.intl.formatMessage(
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
              value={props.intl.formatMessage(
                azureModalMessages.azureModalChooseExisting
              )}
              disabled={azureFunctionsFormData.subscription.value === ""}
              checked={azureFunctionsFormData.chooseExistingRadioButtonSelected}
            />
            <div className={styles.radioButtonLabel}>
              {props.intl.formatMessage(
                azureModalMessages.azureModalChooseExisting
              )}
            </div>
            <input
              className={styles.radiobutton}
              type="radio"
              value={props.intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
              )}
              disabled={azureFunctionsFormData.subscription.value === ""}
              checked={
                !azureFunctionsFormData.chooseExistingRadioButtonSelected
              }
            />
            <div className={styles.radioButtonLabel}>
              {props.intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
              )}
            </div>
          </div>
          <div className={styles.resourceGroupToggleContainer}>
            {azureFunctionsFormData.chooseExistingRadioButtonSelected ? (
              <Dropdown
                ariaLabel={props.intl.formatMessage(
                  azureModalMessages.azureModalAriaResourceGroupLabel
                )}
                options={functionsData.resourceGroup}
                handleChange={option => {
                  handleDropdown(FORM_CONSTANTS.RESOURCE_GROUP.value, option);
                }}
                value={
                  azureFunctionsFormData[FORM_CONSTANTS.RESOURCE_GROUP.value]
                    .value
                    ? azureFunctionsFormData[
                        FORM_CONSTANTS.RESOURCE_GROUP.value
                      ]
                    : DEFAULT_VALUE
                }
                disabled={azureFunctionsFormData.subscription.value === ""}
                openDropdownUpwards={false}
              />
            ) : (
              props.intl.formatMessage(
                azureModalMessages.azureModalCreateNewResourceGroupSelectedDisplayMessage
              )
            )}
          </div>
        </div>
        {/* App Name */}
        <div
          className={classnames(
            styles.selectionInputContainer,
            styles.selectionContainer,
            {
              [styles.selectionContainerDisabled]:
                azureFunctionsFormData.subscription.value === ""
            }
          )}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {props.intl.formatMessage(messages.appNameLabel)}
            </div>
          </div>
          <div className={styles.subLabel}>
            {props.intl.formatMessage(messages.appNameSubLabel)}
          </div>
          <div className={styles.errorStack}>
            <div className={styles.inputContainer}>
              <input
                aria-label={props.intl.formatMessage(messages.ariaAppNameLabel)}
                className={styles.input}
                onChange={handleInput}
                value={azureFunctionsFormData.appName.value}
                placeholder={FORM_CONSTANTS.APP_NAME.label}
                disabled={azureFunctionsFormData.subscription === ""}
                tabIndex={
                  azureFunctionsFormData.subscription.value === "" ? -1 : 0
                }
              />
              {isAppNameAvailable && !isValidatingName && (
                <GreenCheck className={styles.validationIcon} />
              )}
              {isValidatingName && <Spinner className={styles.spinner} />}
            </div>
            {!isValidatingName &&
              !isAppNameAvailable &&
              azureFunctionsFormData.appName.value.length > 0 && (
                <div className={styles.errorMessage}>
                  {props.appNameAvailability.message}
                </div>
              )}
          </div>
        </div>
        {/* Location */}
        {getDropdownSection(
          FORM_CONSTANTS.LOCATION.label,
          functionsData.location,
          FORM_CONSTANTS.LOCATION.value,
          props.intl.formatMessage(
            azureModalMessages.azureModalAriaLocationLabel
          ),
          undefined,
          azureFunctionsFormData.subscription.value === "",
          DEFAULT_VALUE,
          true,
          props.intl.formatMessage(messages.locationSubLabel)
        )}
        {/* Number of Functions */}
        {getDropdownSection(
          FORM_CONSTANTS.NUM_FUNCTIONS.label,
          getNumFunctionsData(),
          FORM_CONSTANTS.NUM_FUNCTIONS.value,
          props.intl.formatMessage(messages.ariaNumFunctionsLabel),
          undefined,
          false,
          1,
          true,
          props.intl.formatMessage(messages.numFunctionsSubLabel)
        )}
        {/* Runtime Stack */}
        <div
          className={classnames(
            styles.selectionInputContainer,
            styles.selectionContainer
          )}
        >
          <div
            className={classnames(
              styles.selectionHeaderContainer,
              styles.leftHeader
            )}
          >
            {props.intl.formatMessage(azureModalMessages.runtimeStackLabel)}
          </div>
          <div>
            {props.intl.formatMessage(azureModalMessages.runtimeStackSubLabel, {
              runtimeStack: WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS
            })}
          </div>
        </div>
      </div>
      <button
        className={getButtonClassNames()}
        onClick={handleAddResource}
        disabled={!formIsSendable}
      >
        {(props.selection &&
          props.intl.formatMessage(azureModalMessages.azureModalSaveChanges)) ||
          props.intl.formatMessage(azureModalMessages.azureModalAddResource)}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAzureFunctionsModalOpenSelector(state),
  vscode: getVSCodeApiSelector(state),
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  appNameAvailability:
    state.selection.services.azureFunctions.appNameAvailability,
  isValidatingName: state.selection.isValidatingName,
  selection: getFunctionsSelection(state),
  chooseExistingRadioButtonSelected:
    state.selection.services.azureFunctions.chooseExistingRadioButtonSelected
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveAzureFunctionsOptions: (azureFunctionsOptions: any) => {
    dispatch(saveAzureFunctionsSettingsAction(azureFunctionsOptions));
  },
  setAppNameAvailability: (isAvailableObject: IAvailabilityFromExtension) =>
    dispatch(setAppNameAvailabilityAction(isAvailableObject)),
  setValidationStatus: (status: boolean) =>
    dispatch(setAzureValidationStatusAction(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(AzureFunctionsResourceModal)));
