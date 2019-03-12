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
import styles from "./styles.module.css";

interface IDispatchProps {
  closeModal: () => any;
  saveCosmosOptions: (cosmosOptions: any) => any;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  cosmosAccountInformation: any;
}

type Props = IDispatchProps & IStateProps;

const initialState = {
  subscription: "",
  resourceGroup: "",
  accountName: "",
  api: "",
  location: "",
  internalName: "wts.Feature.Azure.Cosmos"
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
      if (process.env.NODE_ENV === "production") {
        props.vscode.postMessage({
          command: "subscriptionData",
          subscription: value
        });
      } else {
        // @ts-ignore produces a mock login response from VSCode in development
        window.postMessage({
          command: "subscriptionData",
          payload: {
            locations: [{ label: "WEST US", value: "WEST US" }],
            resourceGroups: [
              { label: "resourceGroupMock", value: "resourceGroupMock" }
            ]
          }
        });
      }
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
    if (process.env.NODE_ENV === "production") {
      props.vscode.postMessage({
        command: "name-cosmos",
        appName: cosmosFormData.accountName,
        subscription: cosmosFormData.subscription
      });
    } else {
      // In development, disables modal closing until an account name is entered.
      // @ts-ignore produces a mock login response from VSCode in development 
      window.postMessage({
        command: "name-cosmos",
        payload: {
          isAvailable: cosmosFormData.accountName === "" ? false: true,
        },
        message: "in development, no error message",
        errorType: "in development, no error type"
      });
    }
  }, [cosmosFormData.accountName]);
  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    const strippedInput = element.value.toLowerCase().replace(" ","").toLowerCase().substring(0,130);
    updateForm({
      ...cosmosFormData,
      accountName: strippedInput
    });
  };
  const handleAddResource = () => {
    if (props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable) {
      props.saveCosmosOptions(cosmosFormData); 
    }
  }
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Cosmos DB Account</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>Subscription</div>
          <div className={styles.createNew}>Create new</div>
        </div>
        <Dropdown
          options={cosmosData.subscription}
          handleChange={option => {
            handleDropdown(FORM_CONSTANTS.SUBSCRIPTION, option.value);
          }}
        />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>Resource Group</div>
          <div className={styles.createNew}>Create new</div>
        </div>
        <Dropdown
          options={cosmosData.resourceGroup}
          handleChange={option => {
            handleDropdown(FORM_CONSTANTS.RESOURCE_GROUP, option.value);
          }}
        />
      </div>
      <div className={classnames({
        [styles.selectionInputContainer]: !props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable && cosmosFormData.accountName.length > 0,
        [styles.selectionContainer]: (props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable || cosmosFormData.accountName.length === 0)
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
            [styles.borderRed]: !props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable && cosmosFormData.accountName.length > 0
          })}>
          <input className={styles.input} onChange={handleInput} value={cosmosFormData.accountName} placeholder="Account Name" />
          {props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable && <GreenCheck className={styles.validationIcon} />}
        </div>
        {!props.cosmosAccountInformation.isCosmosResourceAccountNameAvailable && cosmosFormData.accountName.length > 0 && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px" }}>{props.cosmosAccountInformation.message}</div>}
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>API</div>
        </div>
        <Dropdown
          options={cosmosData.api}
          handleChange={option => {
            handleDropdown(FORM_CONSTANTS.API, option.value);
          }}
        />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>Location</div>
        </div>
        <Dropdown
          options={cosmosData.location}
          handleChange={option => {
            handleDropdown(FORM_CONSTANTS.LOCATION, option.value);
          }}
        />
      </div>
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

const mapStateToProps = (state: any): IStateProps => {
  const { vscodeObject } = state.vscode;
  return {
    isModalOpen: isCosmosDbModalOpenSelector(state),
    vscode: vscodeObject,
    subscriptionData: state.azureProfileData.subscriptionData,
    subscriptions: state.azureProfileData.profileData.subscriptions,
    cosmosAccountInformation: state.selection.services,
  };
};

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
