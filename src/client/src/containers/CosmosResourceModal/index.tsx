/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions/modalActions";
import { saveCosmosDbSettingsAction } from "../../actions/azureActions/saveCosmosDbSettings";
import { azureModalInitialState as cosmosInitialState } from "../../mockData/azureModalInitialStateData";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";
import { getProjectName } from "../../selectors/wizardSelectionSelector";

import { setCosmosModalButtonStatus } from "./verifyButtonStatus";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  WIZARD_CONTENT_INTERNAL_NAMES,
  COSMOS_APIS,
  KEY_EVENTS
} from "../../utils/constants";
import styles from "./styles.module.css";
import { getCosmosSelectionInDropdownForm } from "../../selectors/cosmosServiceSelector";

import { InjectedIntlProps, injectIntl } from "react-intl";
import { setAzureValidationStatusAction } from "../../actions/azureActions/setAzureValidationStatusAction";
import {
  setAccountAvailability,
  IAvailabilityFromExtension
} from "../../actions/azureActions/setAccountAvailability";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
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
  saveCosmosOptions: (cosmosOptions: any) => any;
  setValidationStatus: (status: boolean) => any;
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) => any;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  isValidatingName: boolean;
  accountNameAvailability: any;
  selection: any;
  projectName: string;
}

let timeout: NodeJS.Timeout | undefined;
type Props = IDispatchProps & IStateProps & InjectedIntlProps;

interface attributeLinks {
  [key: string]: any;
}

const links: attributeLinks = {
  subscription:
    "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  api: null,
  location: null
};

interface CosmosDb {
  [key: string]: any;
}
const initialState: CosmosDb = {
  subscription: { value: "", label: "" },
  resourceGroup: { value: "", label: "" },
  accountName: { value: "", label: "" },
  api: {
    value: "",
    label: ""
  },
  internalName: {
    value: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    label: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB
  }
};

const CosmosResourceModal = (props: Props) => {
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
    API: {
      label: props.intl.formatMessage(messages.apiLabel),
      value: "api"
    },
    ACCOUNT_NAME: {
      label: props.intl.formatMessage(messages.accountNameLabel),
      value: "accountName"
    },
    INTERNAL_NAME: {
      label: props.intl.formatMessage(messages.internalName),
      value: "internalName"
    },
    MONGO: {
      label: "MongoDB",
      value: COSMOS_APIS.MONGO
    },
    SQL: {
      label: "SQL",
      value: COSMOS_APIS.SQL
    }
  };

  // The data we are presenting to the user (available resource groups, locations, api's)
  const [cosmosData, setData] = React.useState(cosmosInitialState);

  // Hardcoding database options until data can be loaded dynamically
  // Updates the data we are presenting to the user when the subscription changes
  React.useEffect(() => {
    setData({
      accountName: [
        {
          value: "",
          label: ""
        }
      ],
      api: [FORM_CONSTANTS.MONGO, FORM_CONSTANTS.SQL],
      subscription: props.subscriptions,
      resourceGroup: props.subscriptionData.resourceGroups
    });
  }, [props.subscriptionData]);

  // The data the user has entered into the modal
  const [cosmosFormData, updateForm] = React.useState(initialState);
  const [formIsSendable, setFormIsSendable] = React.useState(false);

  // Updates the data the user enters (cosmosFormData) as the user types
  const handleChange = (updatedCosmosForm: CosmosDb) => {
    setCosmosModalButtonStatus(
      updatedCosmosForm,
      props.isValidatingName,
      props.accountNameAvailability,
      setFormIsSendable
    );
    updateForm(updatedCosmosForm);
  };

  // Disable add resource button until all data fields have been entered
  const getButtonClassNames = () => {
    const buttonClass = formIsSendable
      ? buttonStyles.buttonHighlighted
      : buttonStyles.buttonDark;

    return classNames(buttonClass, styles.button);
  };

  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    let updatedForm = {
      ...cosmosFormData,
      [infoLabel]: {
        value: value,
        label: value
      }
    };
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION.value) {
      // Get resource Group and locations and set the dropdown options to them
      setData({ ...cosmosData, resourceGroup: [] });
      props.setValidationStatus(true);
      props.vscode.postMessage({
        module: EXTENSION_MODULES.AZURE,
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS,
        track: true,
        subscription: value,
        projectName: props.projectName
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

  React.useEffect(() => {
    if (!cosmosFormData.accountName.value) {
      return;
    }
    setCosmosModalButtonStatus(
      cosmosFormData,
      props.isValidatingName,
      props.accountNameAvailability,
      setFormIsSendable
    );
  }, [props.isValidatingName]);

  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    if (cosmosFormData.accountName.value !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = undefined;
        props.vscode.postMessage({
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.NAME_COSMOS,
          track: false,
          appName: cosmosFormData.accountName.value,
          subscription: cosmosFormData.subscription.value
        });
      }, 700);
    }
  }, [cosmosFormData.accountName]);

  // Update form data with data from store if it exists
  React.useEffect(() => {
    if (props.selection) {
      props.setCosmosResourceAccountNameAvailability({
        isAvailable: true,
        message: ""
      });
      const newCosmosDBState = props.selection.dropdownSelection;
      setFormIsSendable(true);
      updateForm(newCosmosDBState);
    } else {
      props.setCosmosResourceAccountNameAvailability({
        isAvailable: false,
        message: ""
      });
    }
  }, []);

  /**
   * Update name field with a valid name generated from
   * extension when a subscription is selected or changed
   */
  React.useEffect(() => {
    if (props.subscriptionData.validName === "") return;

    // if a selection exists (i.e. user has saved form data),
    // this effect should only be run after selection has been loaded (i.e. subscription value is not empty)
    const shouldRunEffect =
      !props.selection || cosmosFormData.subscription.value !== "";
    if (shouldRunEffect) {
      updateForm({
        ...cosmosFormData,
        accountName: {
          value: props.subscriptionData.validName,
          label: props.subscriptionData.validName
        }
      });
      // programatically updating <input>'s value field doesn't dispatch an event to handleInput
      // so we manually simulate handleInput here
      props.setValidationStatus(true);
      handleChange({
        ...cosmosFormData,
        accountName: {
          value: props.subscriptionData.validName,
          label: props.subscriptionData.validName
        }
      });
    }
  }, [props.subscriptionData.validName]);

  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    const strippedInput = element.value;

    // Changes in account name will trigger an update in validation status
    // Set validation status here to avoid premature error messages
    props.setValidationStatus(true);
    handleChange({
      ...cosmosFormData,
      accountName: {
        value: strippedInput,
        label: strippedInput
      }
    });
  };
  const handleAddResource = () => {
    props.saveCosmosOptions(cosmosFormData);
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
              tabIndex={disabled! ? -1 : 0}
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
            handleDropdown(formSectionId, option.value);
          }}
          value={
            cosmosFormData[formSectionId].value
              ? cosmosFormData[formSectionId]
              : defaultValue
          }
          disabled={disabled}
          openDropdownUpwards={openDropdownUpwards}
        />
      </div>
    );
  };
  const { isAccountNameAvailable } = props.accountNameAvailability;
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
        ...cosmosFormData
      });
    } else if (
      element.value ===
      props.intl.formatMessage(
        azureModalMessages.azureModalCreateNewResourceGroupDisplayMessage
      )
    ) {
      updateForm({
        ...cosmosFormData,
        resourceGroup: {
          value: "",
          label: ""
        }
      });
    }
  };

  return (
    <div>
      {/* Create CosmosDB Account Header */}
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>
          {props.intl.formatMessage(messages.createCosmosRes)}
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
          cosmosData.subscription,
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
        {/* Account Name */}
        <div
          className={classnames(styles.selectionContainer, {
            [styles.selectionContainerDisabled]:
              cosmosFormData.subscription.value === ""
          })}
        >
          <div className={styles.selectionHeaderContainer}>
            <div className={styles.leftHeader}>
              {props.intl.formatMessage(messages.accountName)}
            </div>
          </div>
          <div className={styles.subLabel}>
            {props.intl.formatMessage(messages.accountNameSubLabel)}
          </div>
          <div className={styles.errorStack}>
            <div className={styles.inputContainer}>
              <input
                aria-label={props.intl.formatMessage(
                  messages.ariaAccountNameLabel
                )}
                className={styles.input}
                onChange={handleInput}
                value={
                  cosmosFormData.subscription.value === ""
                    ? ""
                    : cosmosFormData.accountName.value
                }
                placeholder={FORM_CONSTANTS.ACCOUNT_NAME.label}
                disabled={cosmosFormData.subscription.value === ""}
              />
              {cosmosFormData.subscription.value &&
                isAccountNameAvailable &&
                !isValidatingName && (
                  <GreenCheck className={styles.validationIcon} />
                )}
              {cosmosFormData.subscription.value && isValidatingName && (
                <Spinner className={styles.spinner} />
              )}
            </div>
            {!isValidatingName &&
              !isAccountNameAvailable &&
              cosmosFormData.accountName.value.length > 0 &&
              props.accountNameAvailability.message && (
                <div className={styles.errorMessage}>
                  {props.accountNameAvailability.message}
                </div>
              )}
          </div>
        </div>
        {/* API */}
        {getDropdownSection(
          FORM_CONSTANTS.API.label,
          cosmosData.api,
          FORM_CONSTANTS.API.value,
          props.intl.formatMessage(messages.ariaApiLabel),
          undefined,
          false,
          DEFAULT_VALUE,
          true,
          props.intl.formatMessage(messages.apiSubLabel)
        )}
        {/* Save Button */}
        <button
          className={getButtonClassNames()}
          disabled={!formIsSendable}
          onClick={handleAddResource}
        >
          {props.intl.formatMessage(azureModalMessages.azureModalSave)}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  accountNameAvailability:
    state.selection.services.cosmosDB.accountNameAvailability,
  isModalOpen: isCosmosDbModalOpenSelector(state),
  isValidatingName: state.selection.isValidatingName,
  selection: getCosmosSelectionInDropdownForm(state),
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  vscode: state.vscode.vscodeObject,
  projectName: getProjectName(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveCosmosOptions: (cosmosOptions: any) => {
    dispatch(saveCosmosDbSettingsAction(cosmosOptions));
  },
  setCosmosResourceAccountNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => dispatch(setAccountAvailability(isAvailableObject)),
  setValidationStatus: (status: boolean) =>
    dispatch(setAzureValidationStatusAction(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(CosmosResourceModal)));
