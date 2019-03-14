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
import { saveAzureFunctionsSettingsAction } from "../../actions/saveAzureFunctionsSettings";
import {
  azureFunctionModalInitialState
} from "../../mockData/cosmosDbModalData";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck} from "../../assets/checkgreen.svg";
import { isAzureFunctionsModalOpenSelector } from "../../selectors/modalSelector";

import buttonStyles from "../../css/buttonStyles.module.css";
import { EXTENSION_COMMANDS, WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
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

type Props = IDispatchProps & IStateProps;

const initialState = {
  subscription: "",
  resourceGroup: "",
  appName: "",
  runtimeStack: "",
  location: "",
  numFunctions: 1,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS
};

const CosmosResourceModal = (props: Props) => {
  const [functionsData, setData] = React.useState(azureFunctionModalInitialState);
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
  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    if (infoLabel === "subscription") {
      // Get resource Group and locations and set the dropdown options to them
      props.vscode.postMessage({
        command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA,
        subscription: value
      });
    }
    updateForm({
      ...azureFunctionsFormData,
      [infoLabel]: value
    });
  };
  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    props.vscode.postMessage({
      command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
      appName: azureFunctionsFormData.appName,
      subscription: azureFunctionsFormData.subscription
    });
  }, [azureFunctionsFormData.appName]);
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
    if (props.appNameAvailability.isAppNameAvailable) {
      props.saveAzureFunctionsOptions(azureFunctionsFormData); 
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
          defaultValue={{value: "test", label: "test"}}
        />
      </div>)
  }
  const getNumFunctionsData = () => {
    // limit the number of generated functions to 10
    const dropDownArray = [];
    for (let i = 1; i <= 10; i++) {
      dropDownArray.push({ value: i, label: i });
    }
    return dropDownArray;
  }
  const { isAppNameAvailable } = props.appNameAvailability;
  return (
    <React.Fragment>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Function Application</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      {getDropdownSection("Subscription", functionsData.subscription, "subscription", "Create new")}
      {getDropdownSection("Resource Group", functionsData.resourceGroup, "resourceGroup", "Create new")}
      <div className={classnames({
        [styles.selectionInputContainer]: !isAppNameAvailable && azureFunctionsFormData.appName.length > 0,
        [styles.selectionContainer]: (isAppNameAvailable || azureFunctionsFormData.appName.length === 0)
        })}>
        <div className={styles.selectionHeaderContainer}>
          <div>App Name</div>
          <div>.azurewebsites.net</div>
        </div>
        <div className={classnames(styles.inputContainer, {
            [styles.borderRed]: !isAppNameAvailable && azureFunctionsFormData.appName.length > 0
          })}>
          <input className={styles.input} onChange={handleInput} value={azureFunctionsFormData.appName} placeholder="App Name" />
          {isAppNameAvailable && <GreenCheck className={styles.validationIcon} />}
        </div>
        {!isAppNameAvailable && azureFunctionsFormData.appName.length > 0 && 
          <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px" }}>
            {props.appNameAvailability.message}
          </div>}
      </div>
      {getDropdownSection("Location", functionsData.location, "location")}
      {getDropdownSection("Runtime Stack", functionsData.runtimeStack, "runtimeStack")}
      <div className={styles.modalFooterContainer}>
        {getDropdownSection("Number of functions", getNumFunctionsData(), "numFunctions", undefined, getNumFunctionsData()[0])}
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button, styles.selectionContainer)}
          onClick={handleAddResource}
        >
          Add Resource
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => {
  return {
    isModalOpen: isAzureFunctionsModalOpenSelector(state),
    vscode: state.vscode.vscodeObject,
    subscriptionData: state.azureProfileData.subscriptionData,
    subscriptions: state.azureProfileData.profileData.subscriptions,
    appNameAvailability: state.selection.services.azureFunctions.appNameAvailability,
    selection: state.selection.services.azureFunctions.selection
  };
};

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
)(asModal(CosmosResourceModal));
