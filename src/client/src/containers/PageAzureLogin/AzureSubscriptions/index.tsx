import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Card from "../../../components/Card";

import styles from "./styles.module.css";
import * as AzureActions from "../../../actions/azureActions/logOutAzure";
import * as ModalActions from "../../../actions/modalActions/modalActions";
import { isCosmosDbModalOpenSelector } from "../../../selectors/modalSelector";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";

import azureServiceOptions from "../../../mockData/azureServiceOptions";
import { servicesEnum } from "../../../mockData/azureServiceOptions";
import { IOption } from "../../../types/option";
import { setDetailPageAction } from "../../../actions/wizardInfoActions/setDetailsPage";

import {
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import { AppState } from "../../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../../actions/ActionType";

import { isAppServiceSelectedSelector } from "../../../selectors/appServiceSelector";
import messages from "./messages";

interface IDispatchProps {
  startLogOutToAzure: () => any;
  openCosmosDbModal: () => any;
  setDetailPage: (detailPageInfo: IOption) => void;
  openAppServiceModal: () => any;
  openAzureLoginModal: (serviceInternalName: string) => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  isCosmosDbModalOpen: boolean;
  cosmosDbSelection: any;
  appServiceSelection: any;
  isPreview: boolean;
  isAppServiceSelected: boolean;
}

interface IState {
  azureServices?: IOption[] | undefined;
}

type Props = IAzureLoginProps & IDispatchProps & InjectedIntlProps;

class AzureSubscriptions extends React.Component<Props, IState> {
  public isSelectionCreated = (internalName: string): boolean => {
    if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
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
      [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: this.props
        .openAppServiceModal
    };
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => void(0);
  }

  /**
   * Returns internal name of Azure cloud hosting service that has been created
   * If no service has been created yet, returns null
   */
  public getCreatedHostingService(): string | null {
    const { isAppServiceSelected } = this.props;
    if (isAppServiceSelected) {
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
      <div key={type}
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
    cosmosDbSelection: state.selection.services.cosmosDB.selection,
    appServiceSelection: state.selection.services.appService.selection,
    isPreview: previewStatus,
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
