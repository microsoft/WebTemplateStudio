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
import {
  azureModalInitialState as cosmosInitialState
} from "../../mockData/cosmosDbModalData";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck} from "../../assets/checkgreen.svg";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import buttonStyles from "../../css/buttonStyles.module.css";
import { EXTENSION_COMMANDS, WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
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
  SUBSCRIPTION: "subscription",
  RESOURCE_GROUP: "resourceGroup",
  API: "api",
  LOCATION: "location"
}

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

  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    if (infoLabel === FORM_CONSTANTS.SUBSCRIPTION) {
      // Get resource Group and locations and set the dropdown options to them
      props.vscode.postMessage({
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA,
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
  }, [])
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
    if (isAccountNameAvailable) {
      props.saveCosmosOptions(cosmosFormData); 
    }
  }
  const getDropdownSection = (leftHeader: string, options: any, formSectionId: string, rightHeader?: string, defaultValue?: any) => {
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
          defaultValue={props.selection ? props.selection.dropdownSelection[formSectionId] : defaultValue}
        />
      </div>)
  }
  const { isAccountNameAvailable } = props.accountNameAvailability;
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Cosmos DB Account</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      {getDropdownSection("Subscription", cosmosData.subscription, FORM_CONSTANTS.SUBSCRIPTION, "Create new")}
      {getDropdownSection("Resource Group", cosmosData.resourceGroup, FORM_CONSTANTS.RESOURCE_GROUP, "Create new")}
      <div className={classnames({
        [styles.selectionInputContainer]: !isAccountNameAvailable && cosmosFormData.accountName.length > 0,
        [styles.selectionContainer]: (isAccountNameAvailable || cosmosFormData.accountName.length === 0)
        })}>
        <div className={styles.selectionHeaderContainer}>
          <div>Account Name</div>
          <a
            className={styles.link}
            href="https://docs.microsoft.com/en-us/azure/cosmos-db/"
          >
            documents.azure.com
          </a>
        </div>
        <div className={classnames(styles.inputContainer, {
            [styles.borderRed]: !isAccountNameAvailable && cosmosFormData.accountName.length > 0
          })}>
          <input className={styles.input} onChange={handleInput} value={cosmosFormData.accountName} placeholder="Account Name" />
          {isAccountNameAvailable && <GreenCheck className={styles.validationIcon} />}
        </div>
        {!isAccountNameAvailable && cosmosFormData.accountName.length > 0 && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px" }}>{props.accountNameAvailability.message}</div>}
      </div>
      {getDropdownSection("API", cosmosData.api, FORM_CONSTANTS.API, undefined)}
      {getDropdownSection("Location", cosmosData.location, FORM_CONSTANTS.LOCATION, undefined)}
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
    accountNameAvailability: state.selection.services.cosmosDB.accountNameAvailability,
    selection: getCosmosSelectionInDropdownForm(state),
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
