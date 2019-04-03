/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import asModal from "../../components/Modal";

import { saveAzureFunctionsSettingsAction } from "../../actions/azureFunctionActions";
import { closeModalAction } from "../../actions/modalActions";
import { azureFunctionModalInitialState } from "../../mockData/cosmosDbModalData";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { getFunctionsSelection } from "../../selectors/azureFunctionsServiceSelector";
import { isAzureFunctionsModalOpenSelector } from "../../selectors/modalSelector";

import { InjectedIntlProps, defineMessages, injectIntl } from "react-intl";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  EMPTY_FIELD
} from "../../utils/constants";
import styles from "./styles.module.css";

interface IDispatchProps {
  closeModal: () => any;
  saveAzureFunctionsOptions: (azureFunctionsOptions: any) => any;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  appNameAvailability: any;
  selection: any;
}

type Props = IDispatchProps & IStateProps & InjectedIntlProps;

const initialState = {
  subscription: "",
  resourceGroup: "",
  appName: "",
  runtimeStack: "",
  location: "",
  numFunctions: 0,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS
};

const messages = defineMessages({
  subscriptionLabel: {
    id: "azureFunctionsModal.subscriptionLabel",
    defaultMessage: "Subscription"
  },
  resourceGroupLabel: {
    id: "azureFunctionsModal.resourceGroupLabel",
    defaultMessage: "Resource Group"
  },
  locationLabel: {
    id: "azureFunctionsModal.locationLabel",
    defaultMessage: "Location"
  },
  runtimeStackLabel: {
    id: "azureFunctionsModal.runtimeStackLabel",
    defaultMessage: "Runtime Stack"
  },
  numFunctionsLabel: {
    id: "azureFunctionsModal.numFunctionsLabel",
    defaultMessage: "Number of functions"
  },
  appNameLabel: {
    id: "azureFunctionsModal.appNameLabel",
    defaultMessage: "App Name"
  },
  createNew: {
    id: "azureFunctionsModal.createNew",
    defaultMessage: "Create New"
  },
  appName: {
    id: "azureFunctionsModal.appName",
    defaultMessage: "App Name"
  },
  addResource: {
    id: "azureFunctionsModal.addResource",
    defaultMessage: "Add Resource"
  }
});

const AzureFunctionsResourceModal = (props: Props) => {
  const FORM_CONSTANTS = {
    SUBSCRIPTION: {
      label: props.intl.formatMessage(messages.subscriptionLabel),
      value: "subscription"
    },
    RESOURCE_GROUP: {
      label: props.intl.formatMessage(messages.resourceGroupLabel),
      value: "resourceGroup"
    },
    LOCATION: {
      label: props.intl.formatMessage(messages.locationLabel),
      value: "location"
    },
    RUNTIME_STACK: {
      label: props.intl.formatMessage(messages.runtimeStackLabel),
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

  const [functionsData, setData] = React.useState(
    azureFunctionModalInitialState
  );
  // Hardcoding a "node" value until data can be loaded dynamically
  React.useEffect(() => {
    setData({
      appName: [
        {
          value: "",
          label: ""
        }
      ],
      runtimeStack: [
        {
          value: "node",
          label: "node"
        }
      ],
      subscription: props.subscriptions,
      resourceGroup: props.subscriptionData.resourceGroups,
      location: props.subscriptionData.locations
    });
  }, [props.subscriptionData]);
  const [azureFunctionsFormData, updateForm] = React.useState(initialState);

  const [modalValidation, updateValidation] = React.useState({
    isAppNameEmpty: false,
    isRuntimeStackEmpty: false,
    isLocationEmpty: false,
    isSubscriptionEmpty: false,
    isResourceGroupEmpty: false,
    isNumFunctionsZero: false
  });

  const setModalValidation = (selections: any): boolean => {
    let isSubscriptionEmpty: boolean = false;
    let isResourceGroupEmpty: boolean = false;
    let isAppNameEmpty: boolean = false;
    let isLocationEmpty: boolean = false;
    let isNumFunctionsZero: boolean = false;
    let isRuntimeStackEmpty: boolean = false;
    let isAnyEmpty: boolean = false;

    isSubscriptionEmpty = selections.subscription === "";
    isResourceGroupEmpty = selections.resourceGroup === "";
    isAppNameEmpty = selections.appName === "";
    isNumFunctionsZero = selections.numFunctions === 0;
    isLocationEmpty = selections.location === "";
    isRuntimeStackEmpty = selections.runtimeStack == "";

    isAnyEmpty =
      isSubscriptionEmpty ||
      isResourceGroupEmpty ||
      isAppNameEmpty ||
      isLocationEmpty ||
      isRuntimeStackEmpty ||
      isNumFunctionsZero;

    updateValidation({
      isSubscriptionEmpty: isSubscriptionEmpty,
      isResourceGroupEmpty: isResourceGroupEmpty,
      isAppNameEmpty: isAppNameEmpty,
      isNumFunctionsZero: isNumFunctionsZero,
      isLocationEmpty: isLocationEmpty,
      isRuntimeStackEmpty: isRuntimeStackEmpty
    });
    return isAnyEmpty;
  };

  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION.value) {
      // Get resource Group and locations and set the dropdown options to them
      props.vscode.postMessage({
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS,
        subscription: value
      });
    }
    updateForm({
      ...azureFunctionsFormData,
      [infoLabel]: value
    });
  };
  React.useEffect(() => {
    if (props.selection) {
      const { previousFormData } = props.selection;
      updateForm(previousFormData);
    }
  }, []);
  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    props.vscode.postMessage({
      command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
      appName: azureFunctionsFormData.appName,
      subscription: azureFunctionsFormData.subscription
    });
  }, [azureFunctionsFormData.appName, props.selection]);
  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    updateForm({
      ...azureFunctionsFormData,
      appName: element.value
    });
  };
  const handleAddResource = () => {
    if (setModalValidation(azureFunctionsFormData)) {
      return;
    }
    props.saveAzureFunctionsOptions(azureFunctionsFormData);
  };
  const getDropdownSection = (
    isEmpty: boolean,
    leftHeader: string,
    options: any,
    formSectionId: string,
    rightHeader?: string,
    defaultValue?: any
  ) => {
    return (
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>{leftHeader}</div>
          <div className={styles.createNew}>{rightHeader}</div>
        </div>
        <Dropdown
          options={options}
          handleChange={option => {
            handleDropdown(formSectionId, option.value);
          }}
          defaultValue={
            props.selection
              ? props.selection.dropdownSelection[formSectionId]
              : defaultValue
          }
        />
        {isEmpty && (
          <div className={styles.errorMessage}>{EMPTY_FIELD(leftHeader)}</div>
        )}
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
  return (
    <React.Fragment>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Function Application</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      {getDropdownSection(
        modalValidation.isSubscriptionEmpty &&
          azureFunctionsFormData.subscription === "",
        FORM_CONSTANTS.SUBSCRIPTION.label,
        functionsData.subscription,
        FORM_CONSTANTS.SUBSCRIPTION.value,
        props.intl.formatMessage(messages.createNew)
      )}
      {getDropdownSection(
        modalValidation.isResourceGroupEmpty &&
          azureFunctionsFormData.resourceGroup === "",
        FORM_CONSTANTS.RESOURCE_GROUP.label,
        functionsData.resourceGroup,
        FORM_CONSTANTS.RESOURCE_GROUP.value,
        props.intl.formatMessage(messages.createNew)
      )}
      <div
        className={classnames({
          [styles.selectionInputContainer]:
            !isAppNameAvailable && azureFunctionsFormData.appName.length > 0,
          [styles.selectionContainer]:
            isAppNameAvailable || azureFunctionsFormData.appName.length === 0
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div>{props.intl.formatMessage(messages.appName)}</div>
          <div>.azurewebsites.net</div>
        </div>
        <div
          className={classnames(styles.inputContainer, {
            [styles.borderRed]:
              !isAppNameAvailable && azureFunctionsFormData.appName.length > 0
          })}
        >
          <input
            className={styles.input}
            onChange={handleInput}
            value={azureFunctionsFormData.appName}
            placeholder={FORM_CONSTANTS.APP_NAME.label}
          />
          {isAppNameAvailable && (
            <GreenCheck className={styles.validationIcon} />
          )}
        </div>
        {!isAppNameAvailable && azureFunctionsFormData.appName.length > 0 && (
          <div className={styles.errorMessage}>
            {props.appNameAvailability.message}
          </div>
        )}
        {modalValidation.isAppNameEmpty &&
          azureFunctionsFormData.appName.length == 0 && (
            <div className={styles.errorMessage}>
              {EMPTY_FIELD(FORM_CONSTANTS.APP_NAME.label)}
            </div>
          )}
      </div>
      {getDropdownSection(
        modalValidation.isLocationEmpty &&
          azureFunctionsFormData.location === "",
        FORM_CONSTANTS.LOCATION.label,
        functionsData.location,
        FORM_CONSTANTS.LOCATION.value
      )}
      {getDropdownSection(
        modalValidation.isRuntimeStackEmpty &&
          azureFunctionsFormData.runtimeStack === "",
        FORM_CONSTANTS.RUNTIME_STACK.label,
        functionsData.runtimeStack,
        FORM_CONSTANTS.RUNTIME_STACK.value
      )}
      <div className={styles.modalFooterContainer}>
        {getDropdownSection(
          modalValidation.isNumFunctionsZero &&
            azureFunctionsFormData.numFunctions === 0,
          FORM_CONSTANTS.NUM_FUNCTIONS.label,
          getNumFunctionsData(),
          FORM_CONSTANTS.NUM_FUNCTIONS.value,
          undefined,
          1
        )}
        <button
          className={classnames(
            buttonStyles.buttonHighlighted,
            styles.button,
            styles.selectionContainer
          )}
          onClick={handleAddResource}
        >
          {props.intl.formatMessage(messages.addResource)}
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isModalOpen: isAzureFunctionsModalOpenSelector(state),
  vscode: state.vscode.vscodeObject,
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  appNameAvailability:
    state.selection.services.azureFunctions.appNameAvailability,
  selection: getFunctionsSelection(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveAzureFunctionsOptions: (azureFunctionsOptions: any) => {
    dispatch(saveAzureFunctionsSettingsAction(azureFunctionsOptions));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(AzureFunctionsResourceModal)));
