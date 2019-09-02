import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import styles from "./styles.module.css";
import * as AzureActions from "../../actions/azureActions/logOutAzure";
import * as ModalActions from "../../actions/modalActions/modalActions";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

import azureServiceOptions from "../../mockData/azureServiceOptions";
import { servicesEnum } from "../../mockData/azureServiceOptions";
import { IOption } from "../../types/option";
import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";

import {
  InjectedIntlProps,
  injectIntl,
  defineMessages,
  FormattedMessage
} from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

import { isAzureFunctionsSelectedSelector } from "../../selectors/azureFunctionsServiceSelector";
import { isAppServiceSelectedSelector } from "../../selectors/appServiceSelector";

interface IDispatchProps {
  startLogOutToAzure: () => any;
  openCosmosDbModal: () => any;
  setDetailPage: (detailPageInfo: IOption) => void;
  openAzureFunctionsModal: () => any;
  openAppServiceModal: () => any;
  openAzureLoginModal: (serviceInternalName: string) => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  isCosmosDbModalOpen: boolean;
  azureFunctionsSelection: any;
  cosmosDbSelection: any;
  appServiceSelection: any;
  isPreview: boolean;
  isAzureFunctionsSelected: boolean;
  isAppServiceSelected: boolean;
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
    defaultMessage: "Add to my project"
  },
  azureFunctionsLongDesc: {
    id: "azureSubscriptions.azureFunctionsLongDesc",
    defaultMessage:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure. Think of it as deploying functions that executes on pre-defined triggers instead of having to write and manage a full-fledged server yourself. One of the most commonly used triggers is an HTTPTrigger which is a function that runs whenever it receives an HTTP request. This is essentially the same as an API endpoint. Web Template Studio allows you to deploy a function app with multiple 'hello world' HTTPTrigger functions (maximum of 10) so you can get to writing your business logic as soon as possible."
  },
  azureFunctionsBody: {
    id: "azureSubscriptions.azureFunctionsBody",
    defaultMessage:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure."
  },
  azureCosmosLongDesc: {
    id: "azureSubscriptions.azureCosmosLongDesc",
    defaultMessage:
      "Azure Cosmos DB is Microsoft’s proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance."
  },
  azureCosmosBody: {
    id: "azureSubscriptions.azureCosmosBody",
    defaultMessage:
      "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API."
  },
  azureFunctions: {
    id: "azureSubscriptions.azureFunctions",
    defaultMessage: "Azure Functions"
  },
  cosmosResource: {
    id: "azureSubscriptions.cosmosResource",
    defaultMessage: "Cosmos Resource"
  },
  hostingTitle: {
    id: "hostingServices.title",
    defaultMessage: "Publish your project to the web"
  },
  storageTitle: {
    id: "storageServices.title",
    defaultMessage: "Store your data in the cloud"
  },
  hostingOneServiceWarning: {
    id: "hostingServices.oneServiceWarning",
    defaultMessage: "You can only add one hosting service at a time"
  }
});

class AzureSubscriptions extends React.Component<Props, IState> {
  public isSelectionCreated = (internalName: string): boolean => {
    if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS) {
      return !_.isEmpty(this.props.azureFunctionsSelection);
    } else if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
      return !_.isEmpty(this.props.cosmosDbSelection);
    } else if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE) {
      return !_.isEmpty(this.props.appServiceSelection);
    }
    return false;
  };

  public addOrEditResourceText = (internalName: string): string => {
    const { formatMessage } = this.props.intl;
    if (this.isSelectionCreated(internalName)) {
      return formatMessage(messages.editResource);
    }
    return formatMessage(messages.addResource);
  };

  /**
   * Returns a function that opens a modal for a specific internalName
   * @param internalName internal name of service within Core Engine
   */
  public getServicesModalOpener(internalName: string): () => void {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: this.props.openCosmosDbModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: this.props
        .openAzureFunctionsModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: this.props
        .openAppServiceModal
    };
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => {};
  }

  /**
   * Returns internal name of Azure cloud hosting service that has been created
   * If no service has been created yet, returns null
   */
  public getCreatedHostingService(): string | null {
    const { isAzureFunctionsSelected, isAppServiceSelected } = this.props;
    if (isAzureFunctionsSelected) {
      return WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS;
    } else if (isAppServiceSelected) {
      return WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE;
    } else {
      return null;
    }
  }

  public getServicesOrganizer(
    type: string | undefined,
    isLoggedIn: boolean,
    setDetailPage: any,
    title: any,
    isPreview: boolean
  ) {
    const { formatMessage } = this.props.intl;
    const { openAzureLoginModal } = this.props;

    return (
      <div
        className={classnames(styles.servicesContainer, {
          [styles.overlay]: !isLoggedIn
        })}
      >
        <div className={styles.servicesCategory}>
          <div className={styles.categoryTitle}>{type}</div>
          <div className={styles.categoryDescriptor}>
            {formatMessage(title)}
          </div>
          <div className={styles.servicesCategoryContainer}>
            {azureServiceOptions.map(option => {
              // show cards with preview flag only if wizard is also in preview
              const shouldShowCard = isPreview || !option.isPreview;
              if (shouldShowCard && option.type === type) {
                return (
                  <div
                    key={JSON.stringify(option.title)}
                    className={classnames(styles.subscriptionCardContainer, {
                      [styles.overlay]: !isLoggedIn
                    })}
                  >
                    <Card
                      option={option}
                      buttonText={this.addOrEditResourceText(
                        option.internalName
                      )}
                      handleButtonClick={
                        isLoggedIn
                          ? this.getServicesModalOpener(option.internalName)
                          : () => openAzureLoginModal(option.internalName)
                      }
                      handleDetailsClick={setDetailPage}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  public render() {
    const { isLoggedIn, setDetailPage, isPreview } = this.props;
    const serviceTypes = azureServiceOptions.map(option => option.type);
    const uniqueServiceTypes = [...new Set(serviceTypes)];

    let numHostingServiceCards = 0;
    azureServiceOptions.forEach(serviceOption => {
      const isCardShown = isPreview || !serviceOption.isPreview;
      if (serviceOption.type === servicesEnum.HOSTING && isCardShown) {
        numHostingServiceCards++;
      }
    });

    return (
      <div className={styles.container}>
        {uniqueServiceTypes.map((serviceType: any) => {
          let categoryTitle;
          switch (serviceType) {
            case servicesEnum.HOSTING:
              categoryTitle = messages.hostingTitle;
              break;
            case servicesEnum.DATABASE:
              categoryTitle = messages.storageTitle;
              break;
          }
          return this.getServicesOrganizer(
            serviceType,
            isLoggedIn,
            setDetailPage,
            categoryTitle,
            isPreview
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAzureLoginProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isLoggedIn: state.azureProfileData.isLoggedIn,
    isCosmosDbModalOpen: isCosmosDbModalOpenSelector(state),
    azureFunctionsSelection: state.selection.services.azureFunctions.selection,
    cosmosDbSelection: state.selection.services.cosmosDB.selection,
    appServiceSelection: state.selection.services.appService.selection,
    isPreview: previewStatus,
    isAzureFunctionsSelected: isAzureFunctionsSelectedSelector(state),
    isAppServiceSelected: isAppServiceSelectedSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  startLogOutToAzure: () => {
    dispatch(AzureActions.startLogOutAzure());
  },
  setDetailPage: (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted));
  },
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  },
  openAzureFunctionsModal: () => {
    dispatch(ModalActions.openAzureFunctionsModalAction());
  },
  openAppServiceModal: () => {
    dispatch(ModalActions.openAppServiceModalAction());
  },
  openAzureLoginModal: (serviceInternalName: string) => {
    dispatch(ModalActions.openAzureLoginModalAction(serviceInternalName));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AzureSubscriptions));
