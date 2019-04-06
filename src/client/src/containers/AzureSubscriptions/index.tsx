import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import styles from "./styles.module.css";

import * as AzureActions from "../../actions/logOutAzure";
import * as ModalActions from "../../actions/modalActions";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

import getAzureServiceOptions from "../../mockData/azureServiceOptions";
import { IOption } from "../../types/option";
import { setDetailPageAction } from "../../actions/setDetailsPage";

import { InjectedIntlProps, injectIntl, defineMessages } from "react-intl";

interface IDispatchProps {
  startLogOutToAzure: () => any;
  openCosmosDbModal: () => any;
  setDetailPage: (detailPageInfo: IOption) => void;
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

type Props = IAzureLoginProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  editResource: {
    id: "azureSubscriptions.editResource",
    defaultMessage: "Edit Resource"
  },
  addResource: {
    id: "azureSubscriptions.addResource",
    defaultMessage: "Add Resource"
  }
});

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
  };
  public addOrEditResourceText = (internalName: string): string => {
    if (this.isSelectionCreated(internalName)) {
      return this.props.intl.formatMessage(messages.editResource);
    }
    return this.props.intl.formatMessage(messages.addResource);
  };
  /**
   * Returns a function that opens a modal for a specific internalName
   * @param internalName internal name of service within Core Engine
   */
  public getServicesModalOpener(internalName: string): () => void {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: this.props.openCosmosDbModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: this.props
        .openAzureFunctionsModal
    };
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => {};
  }
  public render() {
    const { isLoggedIn, setDetailPage } = this.props;
    return (
      this.props.isLoggedIn && (
        <div className={styles.container}>
          {this.state.azureServices &&
            this.state.azureServices.map(option => (
              <div
                key={option.title}
                className={styles.subscriptionCardContainer}
              >
                <Card
                  option={option}
                  buttonText={this.addOrEditResourceText(option.internalName)}
                  handleButtonClick={this.getServicesModalOpener(
                    option.internalName
                  )}
                  handleDetailsClick={setDetailPage}
                  useNormalButtons={this.isSelectionCreated(
                    option.internalName
                  )}
                />
              </div>
            ))}
        </div>
      )
    );
  }
}

const mapStateToProps = (state: any): IAzureLoginProps => ({
  isLoggedIn: state.azureProfileData.isLoggedIn,
  isCosmosDbModalOpen: isCosmosDbModalOpenSelector(state),
  azureFunctionsSelection: state.selection.services.azureFunctions.selection,
  cosmosDbSelection: state.selection.services.cosmosDB.selection
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  startLogOutToAzure: () => {
    dispatch(AzureActions.startLogOutAzure());
  },
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
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
)(injectIntl(AzureSubscriptions));
