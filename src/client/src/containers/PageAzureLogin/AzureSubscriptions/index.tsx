import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Card from "../../../components/Card";

import styles from "./styles.module.css";
import {startLogOutAzureAction} from "../../../store/azureProfileData/login/action";
import * as ModalActions from "../../../store/modals/action";
import { isCosmosDbModalOpenSelector } from "../../../store/modals/selector";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";

import azureServiceOptions from "../../../mockData/azureServiceOptions";
import { servicesEnum } from "../../../mockData/azureServiceOptions";
import { IOption } from "../../../types/option";

import {
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import { AppState } from "../../../store/combineReducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../../store/ActionType";

import { isAppServiceSelectedSelector } from "../../../store/azureProfileData/appService/selector";
import messages from "./messages";
import { setDetailPageAction } from "../../../store/wizardContent/pages/action";

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

const AzureSubscriptions = (props:Props) => {
  const {
    cosmosDbSelection, 
    appServiceSelection, 
    intl,
    openCosmosDbModal,
    openAppServiceModal,
    isAppServiceSelected,
    openAzureLoginModal,
    isLoggedIn, 
    setDetailPage, 
    isPreview
  } = props;
  const { formatMessage } = intl;
  const [uniqueServiceTypes, setUniqueServiceTypes] = React.useState<(string | undefined)[]>([]);

  React.useEffect(()=>{
    const serviceTypes = azureServiceOptions.map(option => option.type);
    setUniqueServiceTypes([...new Set(serviceTypes)]);
  },[]);

  const isSelectionCreated = (internalName: string): boolean => {
    if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
      return !_.isEmpty(cosmosDbSelection);
    } else if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE) {
      return !_.isEmpty(appServiceSelection);
    }
    return false;
  };

  const addOrEditResourceText = (internalName: string): string => {
    if (isSelectionCreated(internalName)) {
      return formatMessage(messages.editResource);
    }
    return formatMessage(messages.addResource);
  };

  const getServicesModalOpener = (internalName: string) => {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: openCosmosDbModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: openAppServiceModal
    };
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => void(0);
  }

  const getCreatedHostingService = (): string | null => {
    if (isAppServiceSelected) {
      return WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE;
    } else {
      return null;
    }
  }

  const getServicesOrganizer = (
    type: string | undefined,
    isLoggedIn: boolean,
    setDetailPage: any,
    title: any,
    isPreview: boolean
  ) => {
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
                      buttonText={addOrEditResourceText(
                        option.internalName
                      )}
                      handleButtonClick={
                        isLoggedIn
                          ? getServicesModalOpener(option.internalName)
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
        return getServicesOrganizer(
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
    dispatch(startLogOutAzureAction());
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
