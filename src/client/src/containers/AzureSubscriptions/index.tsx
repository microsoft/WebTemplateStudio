import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import styles from "./styles.module.css";

import * as AzureActions from "../../actions/logOutAzure";
import * as ModalActions from "../../actions/modalActions";
import { isCosmosResourceCreatedSelector } from "../../selectors/cosmosServiceSelector";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

import getAzureServiceOptions from "../../mockData/azureServiceOptions";
import { IOption } from "../../types/option";

interface IDispatchProps {
  startLogOutToAzure: () => any;
  openCosmosDbModal: () => any;
  openAzureFunctionsModal: () => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  isCosmosDbModalOpen: boolean;
  azureFunctionsSelection: any;
  cosmosDbSelection: any;
}

interface IState {
  azureServices?: IOption[] | undefined;
}

type Props = IAzureLoginProps & IDispatchProps;

class AzureSubscriptions extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      azureServices: undefined
    };
  }
  public async componentDidMount() {
    const azureServices = await getAzureServiceOptions();
    this.setState({
      azureServices
    });
  }
  public isSelectionCreated = (internalName: string): boolean => {
    if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS) {
      return !_.isEmpty(this.props.azureFunctionsSelection);
    } else if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
      return !_.isEmpty(this.props.cosmosDbSelection);
    }
    return false;
  }
  public addOrEditResourceText = (internalName: string): string => {
    if (this.isSelectionCreated(internalName)) {
      return "Edit Resource";
    }
    return "Add Resource";
  }
  /**
   * Returns a function that opens a modal for a specific internalName
   * @param internalName internal name of service within Core Engine
   */
  public getServicesModalOpener(internalName: string): () => void {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: this.props.openCosmosDbModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: this.props.openAzureFunctionsModal,
    }
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => {};
  }
  public render() {
    return (
      this.props.isLoggedIn != null && (
        <div className={styles.container}>
          {this.state.azureServices != null &&
            this.state.azureServices.map(option => (
              <div
                key={option.title}
                className={styles.subscriptionCardContainer}
              >
                <Card
                  cardTitle={option.title}
                  cardBody={option.body}
                  buttonText="Add Resource"
                  handleButtonClick={this.getServicesModalOpener(option.internalName)}
                  handleDetailsClick={() => {}}
                  svgUrl={option.svgUrl}
                  useNormalButtons={this.isSelectionCreated(option.internalName)}
                />
              </div>
            ))}
        </div>
      )
    );
  }
}

const mapStateToProps = (state: any): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  return {
    isLoggedIn,
    isCosmosDbModalOpen: isCosmosDbModalOpenSelector(state),
    azureFunctionsSelection: state.selection.services.azureFunctions.selection,
    cosmosDbSelection: state.selection.services.cosmosDb
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  startLogOutToAzure: () => {
    dispatch(AzureActions.startLogOutAzure());
  },
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  },
  openAzureFunctionsModal: () => {
    dispatch(ModalActions.openAzureFunctionsModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AzureSubscriptions);
