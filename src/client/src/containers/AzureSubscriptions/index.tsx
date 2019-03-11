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
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  isCosmosDbModalOpen: boolean;
  isCosmosResourceCreated: boolean;
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
  public isCosmosContent = (internalName: string): boolean => {
    return internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB;
  }
  public isCosmosContentCreated = (internalName: string): boolean => {
    return this.props.isCosmosResourceCreated && this.isCosmosContent(internalName);
  }
  public resourceButtonContent = (internalName: string): string => {
    if (this.isCosmosContentCreated(internalName)) {
      return "Edit Resource";
    }
    return "Add Resource";
  };
  /**
   * Returns a function that opens a modal for a specific internalName
   * @param internalName internal name of service within Core Engine
   */
  public getServicesModalOpener(internalName: string): () => void {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: this.props.openCosmosDbModal,
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
                  buttonText={this.resourceButtonContent(option.internalName)}
                  handleButtonClick={this.getServicesModalOpener(option.internalName)}
                  handleDetailsClick={() => {}}
                  svgUrl={option.svgUrl}
                  useNormalButtons={this.isCosmosContentCreated(option.internalName)}
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
    isCosmosResourceCreated: isCosmosResourceCreatedSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  startLogOutToAzure: () => {
    dispatch(AzureActions.startLogOutAzure());
  },
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AzureSubscriptions);
