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
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as GreenCheck } from "../../assets/checkgreen.svg";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import { INTL_MESSAGES } from "../../utils/constants";

import buttonStyles from "../../css/buttonStyles.module.css";
import {
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";
import styles from "./styles.module.css";
import { getCosmosSelectionInDropdownForm } from "../../selectors/cosmosServiceSelector";

import { InjectedIntlProps, defineMessages, injectIntl } from "react-intl";
import { Dispatch } from "redux";
import { setAzureValidationStatusAction } from "../../actions/setAzureValidationStatusAction";
import { setAccountAvailability } from "../../actions/setAccountAvailability";

interface IDispatchProps {
  closeModal: () => any;
  saveCosmosOptions: (cosmosOptions: any) => any;
  setValidationStatus: (status: boolean) => Dispatch;
  setCosmosResourceAccountNameAvailability: (
    isAvailableObject: any
  ) => Dispatch;
}

interface IStateProps {
  isModalOpen: boolean;
  vscode: any;
  subscriptionData: any;
  subscriptions: [];
  isValidatingName: boolean;
  accountNameAvailability: any;
  selection: any;
}

let timeout: NodeJS.Timeout | undefined;

interface attributeLinks {
  [key: string]: any;
}

const links: attributeLinks = {
  subscription:
    "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  resourceGroup: "https://ms.portal.azure.com/#create/Microsoft.ResourceGroup",
  accountName: "https://docs.microsoft.com/en-us/azure/cosmos-db/",
  api: null,
  location: null
};

type Props = IDispatchProps & IStateProps & InjectedIntlProps;

const initialState = {
  subscription: "",
  resourceGroup: "",
  accountName: "",
  api: "",
  location: "",
  internalName: ""
};

const messages = defineMessages({
  subscriptionLabel: {
    id: "cosmosResourceModule.subscriptionLabel",
    defaultMessage: "Subscription"
  },
  resourceGroupLabel: {
    id: "cosmosResourceModule.resourceGroupLabel",
    defaultMessage: "Resource Group"
  },
  locationLabel: {
    id: "cosmosResourceModule.locationLabel",
    defaultMessage: "Location"
  },
  apiLabel: {
    id: "cosmosResourceModule.apiLabel",
    defaultMessage: "API"
  },
  accountNameLabel: {
    id: "cosmosResourceModule.accountNameLabel",
    defaultMessage: "Account Name"
  },
  accountName: {
    id: "cosmosResourceModule.accountName",
    defaultMessage: "Account Name"
  },
  createNew: {
    id: "cosmosResourceModule.createNew",
    defaultMessage: "Create New"
  },
  addResource: {
    id: "cosmosResourceModule.addResource",
    defaultMessage: "Add Resource"
  },
  createCosmosRes: {
    id: "cosmosResourceModule.createCosmosRes",
    defaultMessage: "Create Cosmos DB Account"
  },
  internalName: {
    id: "cosmosResourceModule.internalName",
    defaultMessage: "Internal Name"
  }
});

// tslint:disable-next-line: max-func-body-length
const CosmosResourceModal = (props: Props) => {
  const FORM_CONSTANTS = {
    SUBSCRIPTION: {
      label: props.intl.formatMessage(messages.subscriptionLabel),
      value: "subscription"
    },
    RESOURCE_GROUP: {
      label: props.intl.formatMessage(messages.resourceGroupLabel),
      value: "resourceGroup"
    },
    API: {
      label: props.intl.formatMessage(messages.apiLabel),
      value: "api"
    },
    LOCATION: {
      label: props.intl.formatMessage(messages.locationLabel),
      value: "location"
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
      value: "MongoDB"
    },
    SQL: {
      label: "SQL",
      value: "SQL"
    }
  };

  const DATABASE_INTERNAL_NAME_MAPPING = {
    [FORM_CONSTANTS.SQL.value]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL,
    [FORM_CONSTANTS.MONGO.value]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO
  };

  const [cosmosData, setData] = React.useState(cosmosInitialState);
  // Hardcoding database options until data can be loaded dynamically
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
    let isAnyEmpty: boolean = false;

    isSubscriptionEmpty = selections.subscription === "";
    isResourceGroupEmpty = selections.resourceGroup === "";
    isAccountNameEmpty = selections.accountName === "";
    isApiEmpty = selections.api === "";
    isLocationEmpty = selections.location === "";

    isAnyEmpty =
      isSubscriptionEmpty ||
      isResourceGroupEmpty ||
      isAccountNameEmpty ||
      isLocationEmpty ||
      isApiEmpty;

    const { isAccountNameAvailable } = props.accountNameAvailability;

    updateValidation({
      isAccountNameEmpty,
      isApiEmpty,
      isLocationEmpty,
      isResourceGroupEmpty,
      isSubscriptionEmpty
    });
    return isAnyEmpty || props.isValidatingName || !isAccountNameAvailable;
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
      [infoLabel]: value,
      internalName:
        value in DATABASE_INTERNAL_NAME_MAPPING
          ? DATABASE_INTERNAL_NAME_MAPPING[value]
          : cosmosFormData.internalName
    });
  };
  /**
   * Listens on account name change and validates the input in VSCode
   */
  React.useEffect(() => {
    if (cosmosFormData.accountName != "") {
      props.setValidationStatus(true);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = undefined;
        props.vscode.postMessage({
          command: EXTENSION_COMMANDS.NAME_COSMOS,
          appName: cosmosFormData.accountName,
          subscription: cosmosFormData.subscription
        });
      }, 700);
    }
  }, [cosmosFormData.accountName, props.selection]);
  React.useEffect(() => {
    if (props.selection) {
      const { previousFormData } = props.selection;
      updateForm(previousFormData);
    } else {
      props.setCosmosResourceAccountNameAvailability({
        isAvailable: false,
        message: ""
      });
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
    disabled?: boolean,
    defaultValue?: any
  ) => {
    return (
      <div
        className={classnames([styles.selectionContainer], {
          [styles.selectionContainerDisabled]: disabled
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div>{leftHeader}</div>
          {links[formSectionId] && (
            <a className={styles.link} href={links[formSectionId]}>
              Create New
            </a>
          )}
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
          disabled={disabled}
        />
        {isEmpty && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
              fieldId: leftHeader
            })}
          </div>
        )}
      </div>
    );
  };
  const { isAccountNameAvailable } = props.accountNameAvailability;
  const { isValidatingName } = props;
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.modalTitle}>
          {props.intl.formatMessage(messages.createCosmosRes)}
        </div>
        <Cancel className={styles.icon} onClick={props.closeModal} />
      </div>
      {getDropdownSection(
        modalValidation.isSubscriptionEmpty &&
          cosmosFormData.subscription === "",
        FORM_CONSTANTS.SUBSCRIPTION.label,
        cosmosData.subscription,
        FORM_CONSTANTS.SUBSCRIPTION.value,
        props.intl.formatMessage(messages.createNew)
      )}
      {getDropdownSection(
        modalValidation.isResourceGroupEmpty &&
          cosmosFormData.resourceGroup === "",
        FORM_CONSTANTS.RESOURCE_GROUP.label,
        cosmosData.resourceGroup,
        FORM_CONSTANTS.RESOURCE_GROUP.value,
        props.intl.formatMessage(messages.createNew),
        cosmosFormData.subscription === ""
      )}
      <div
        className={classnames({
          [styles.selectionInputContainer]:
            !isAccountNameAvailable && cosmosFormData.accountName.length > 0,
          [styles.selectionContainer]:
            isAccountNameAvailable || cosmosFormData.accountName.length === 0,
          [styles.selectionContainerDisabled]:
            cosmosFormData.subscription === ""
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div>{props.intl.formatMessage(messages.accountName)}</div>
          <a className={styles.link} href={links.accountName}>
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
            disabled={cosmosFormData.subscription === ""}
          />
          {isAccountNameAvailable && !isValidatingName && (
            <GreenCheck className={styles.validationIcon} />
          )}
          {isValidatingName && <Spinner className={styles.spinner} />}
        </div>
        {!isAccountNameAvailable && cosmosFormData.accountName.length > 0 && (
          <div className={styles.errorMessage}>
            {props.accountNameAvailability.message}
          </div>
        )}
        {modalValidation.isAccountNameEmpty &&
          cosmosFormData.accountName.length == 0 && (
            <div className={styles.errorMessage}>
              {props.intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
                fieldId: FORM_CONSTANTS.ACCOUNT_NAME.label
              })}
            </div>
          )}
      </div>
      {getDropdownSection(
        modalValidation.isApiEmpty && cosmosFormData.api === "",
        FORM_CONSTANTS.API.label,
        cosmosData.api,
        FORM_CONSTANTS.API.value,
        undefined
      )}
      {getDropdownSection(
        modalValidation.isLocationEmpty && cosmosFormData.location === "",
        FORM_CONSTANTS.LOCATION.label,
        cosmosData.location,
        FORM_CONSTANTS.LOCATION.value,
        undefined,
        cosmosFormData.subscription === ""
      )}
      <div className={styles.buttonContainer}>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onClick={handleAddResource}
        >
          {props.intl.formatMessage(messages.addResource)}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  accountNameAvailability:
    state.selection.services.cosmosDB.accountNameAvailability,
  isModalOpen: isCosmosDbModalOpenSelector(state),
  isValidatingName: state.selection.isValidatingName,
  selection: getCosmosSelectionInDropdownForm(state),
  subscriptionData: state.azureProfileData.subscriptionData,
  subscriptions: state.azureProfileData.profileData.subscriptions,
  vscode: state.vscode.vscodeObject
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  },
  saveCosmosOptions: (cosmosOptions: any) => {
    dispatch(saveCosmosDbSettingsAction(cosmosOptions));
  },
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) =>
    dispatch(setAccountAvailability(isAvailableObject)),
  setValidationStatus: (status: boolean) =>
    dispatch(setAzureValidationStatusAction(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(CosmosResourceModal)));
