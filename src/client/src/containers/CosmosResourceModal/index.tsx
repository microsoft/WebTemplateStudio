/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions";
import { saveCosmosDbSettingsAction } from "../../actions/saveCosmosDbSettings";
import { azureModalInitialState as cosmosInitialState } from "../../mockData/cosmosDbModalData";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import { EMPTY_FIELD } from "../../utils/constants";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";
import styles from "./styles.module.css";
import { getCosmosSelectionInDropdownForm } from "../../selectors/cosmosServiceSelector";

interface IDispatchProps {
  closeModal: () => any;
  saveCosmosOptions: (cosmosOptions: any) => any;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  accountNameAvailability: any;
  selection: any;
}

type Props = IDispatchProps & IStateProps;

const initialState = {
  subscription: "",
  resourceGroup: "",
  accountName: "",
  api: "",
  location: "",
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB
};

const FORM_CONSTANTS = {
  SUBSCRIPTION: {
    label: "Subscription",
    value: "subscription"
  },
  RESOURCE_GROUP: {
    label: "Resource Group",
    value: "resourceGroup"
  },
  API: {
    label: "API",
    value: "api"
  },
  LOCATION: {
    label: "Location",
    value: "location"
  },
  ACCOUNT_NAME: {
    label: "Account Name",
    value: "accountName"
  }
};

const CosmosResourceModal = (props: Props) => {
  const [cosmosData, setData] = React.useState(cosmosInitialState);
  /**
   * Second parameter of useEffect is [] which tells React to
   * run this effect when mounting the component.
   *
   * Hardcoding a "MongoDB" value until data can be loaded dynamically
   */
  React.useEffect(() => {
    setData({
      accountName: [
        {
          value: "",
          label: ""
        }
      ],
      api: [
        {
          value: "MongoDB",
          label: "MongoDB"
        }
      ],
      subscription: props.subscriptions,
      resourceGroup: props.subscriptionData.resourceGroups,
      location: props.subscriptionData.locations
    });
  }, [props.subscriptionData]);

  const [cosmosFormData, updateForm] = React.useState(initialState);

  const [modalValidation, updateValidation] = React.useState({
    isAccountNameEmpty: false,
    isApiEmpty: false,
    isLocationEmpty: false,
    isSubscriptionEmpty: false,
    isResourceGroupEmpty: false
  });

  const setModalValidation = (selections: any): boolean => {
    let isSubscriptionEmpty: boolean = false;
    let isResourceGroupEmpty: boolean = false;
    let isAccountNameEmpty: boolean = false;
    let isLocationEmpty: boolean = false;
    let isApiEmpty: boolean = false;
    let isAnyEmpty: boolean = true;

    if (selections.subscription === "") {
      isSubscriptionEmpty = true;
      isAnyEmpty = true;
    }
    if (selections.resourceGroup === "") {
      isResourceGroupEmpty = true;
      isAnyEmpty = true;
    }
    if (selections.accountName === "") {
      isAccountNameEmpty = true;
      isAnyEmpty = true;
    }
    if (selections.api === "") {
      isApiEmpty = true;
      isAnyEmpty = true;
    }
    if (selections.location === "") {
      isLocationEmpty = true;
      isAnyEmpty = true;
    }
    updateValidation({
      isSubscriptionEmpty: isSubscriptionEmpty,
      isResourceGroupEmpty: isResourceGroupEmpty,
      isLocationEmpty: isLocationEmpty,
      isAccountNameEmpty: isAccountNameEmpty,
      isApiEmpty: isApiEmpty
    });
    return isAnyEmpty;
  };

  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION.value) {
      // Get resource Group and locations and set the dropdown options to them
      props.vscode.postMessage({
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS,
        subscription: value
      });
    }
    updateForm({
      ...cosmosFormData,
      [infoLabel]: value
    });
  };
  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    props.vscode.postMessage({
      command: EXTENSION_COMMANDS.NAME_COSMOS,
      appName: cosmosFormData.accountName,
      subscription: cosmosFormData.subscription
    });
  }, [cosmosFormData.accountName, props.selection]);
  React.useEffect(() => {
    if (props.selection) {
      const { previousFormData } = props.selection;
      updateForm(previousFormData);
    }
  }, []);
  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    const strippedInput = element.value;
    updateForm({
      ...cosmosFormData,
      accountName: strippedInput
    });
  };
  const handleAddResource = () => {
    if (setModalValidation(cosmosFormData)) {
      return;
    }
    props.saveCosmosOptions(cosmosFormData);
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
  const { isAccountNameAvailable } = props.accountNameAvailability;
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Cosmos DB Account</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      {getDropdownSection(
        modalValidation.isSubscriptionEmpty,
        FORM_CONSTANTS.SUBSCRIPTION.label,
        cosmosData.subscription,
        FORM_CONSTANTS.SUBSCRIPTION.value,
        "Create new"
      )}
      {getDropdownSection(
        modalValidation.isResourceGroupEmpty,
        FORM_CONSTANTS.RESOURCE_GROUP.label,
        cosmosData.resourceGroup,
        FORM_CONSTANTS.RESOURCE_GROUP.value,
        "Create new"
      )}
      <div
        className={classnames({
          [styles.selectionInputContainer]:
            !isAccountNameAvailable && cosmosFormData.accountName.length > 0,
          [styles.selectionContainer]:
            isAccountNameAvailable || cosmosFormData.accountName.length === 0
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div>Account Name</div>
          <a
            className={styles.link}
            href="https://docs.microsoft.com/en-us/azure/cosmos-db/"
          >
            documents.azure.com
          </a>
        </div>
        <div
          className={classnames(styles.inputContainer, {
            [styles.borderRed]:
              !isAccountNameAvailable && cosmosFormData.accountName.length > 0
          })}
        >
          <input
            className={styles.input}
            onChange={handleInput}
            value={cosmosFormData.accountName}
            placeholder={FORM_CONSTANTS.ACCOUNT_NAME.label}
          />
          {isAccountNameAvailable && (
            <GreenCheck className={styles.validationIcon} />
          )}
        </div>
        {!isAccountNameAvailable && cosmosFormData.accountName.length > 0 && (
          <div className={styles.errorMessage}>
            {props.accountNameAvailability.message}
          </div>
        )}
        {modalValidation.isAccountNameEmpty && (
          <div className={styles.errorMessage}>
            {EMPTY_FIELD(FORM_CONSTANTS.ACCOUNT_NAME.label)}
          </div>
        )}
      </div>
      {getDropdownSection(
        modalValidation.isApiEmpty,
        FORM_CONSTANTS.API.label,
        cosmosData.api,
        FORM_CONSTANTS.API.value,
        undefined
      )}
      {getDropdownSection(
        modalValidation.isLocationEmpty,
        FORM_CONSTANTS.LOCATION.label,
        cosmosData.location,
        FORM_CONSTANTS.LOCATION.value,
        undefined
      )}
      <div className={styles.buttonContainer}>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleAddResource}
        >
          Add Resource
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isModalOpen: isCosmosDbModalOpenSelector(state),
  vscode: state.vscode.vscodeObject,
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  accountNameAvailability:
    state.selection.services.cosmosDB.accountNameAvailability,
  selection: getCosmosSelectionInDropdownForm(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveCosmosOptions: (cosmosOptions: any) => {
    dispatch(saveCosmosDbSettingsAction(cosmosOptions));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(CosmosResourceModal));
