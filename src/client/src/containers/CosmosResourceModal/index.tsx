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
import getCosmosModalData, {
  cosmosInitialState
} from "../../mockData/cosmosDbModalData";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
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

const CosmosResourceModal = (props: Props) => {
  const [cosmosData, setData] = React.useState(cosmosInitialState);
  /**
   * Second parameter of useEffect is [] which tells React to
   * run this effect when mounting the component.
   */
  React.useEffect(() => {
    setData(
      {
        accountName: [{
          value: "",
          label: ""
        }],
        api: [{
          value: "MongoDB",
          label: "MongoDB"
        }],
        subscription: props.subscriptions,
        resourceGroup: props.subscriptionData.resourceGroups,
        location: props.subscriptionData.locations,
      }
    )
  }, [props.subscriptionData]);

  const [cosmosFormData, updateForm] = React.useState(initialState);
  const [accountName, setAccountName] = React.useState("");

  const handleDropdown = (infoLabel: string, value: string) => {
    // Send command to extension on change
    // Populate resource groups on received commands
    if (infoLabel === "subscription") {
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
          locations: [{ label: "WEST US", value: "WEST US" }],
          resourceGroups: [{ label: "resourceGroupMock", value: "resourceGroupMock" }]
        });
      }


    }
    updateForm({
      ...cosmosFormData,
      [infoLabel]: value
    });
  };

  /**
   * To obtain the input value, must cast as HTMLInputElement
   * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
   */
  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const element = e.currentTarget as HTMLInputElement;
    setAccountName(element.value);
    updateForm({
      ...cosmosFormData,
      accountName: element.value
    });
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>Create Cosmos DB Account</div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>Subscription Selected</div>
          <div className={styles.createNew}>Create new</div>
        </div>
        <Dropdown
          options={cosmosData.subscription}
          handleChange={option => {
            handleDropdown("subscription", option.value);
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
            handleDropdown("resourceGroup", option.value);
          }}
        />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>Account Name</div>
          <a
            className={styles.link}
            href="https://docs.microsoft.com/en-us/azure/cosmos-db/"
          >
            documents.azure.com
          </a>
        </div>
        <input className={styles.input} onChange={handleInput} />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionHeaderContainer}>
          <div>API</div>
        </div>
        <Dropdown
          options={cosmosData.api}
          handleChange={option => {
            handleDropdown("api", option.value);
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
            handleDropdown("location", option.value);
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={() => {
            props.saveCosmosOptions(cosmosFormData);
          }}
        >
          Create Resource
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
