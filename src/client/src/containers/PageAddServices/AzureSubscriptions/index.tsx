import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import styles from "./styles.module.css";
import * as ModalActions from "../../../store/navigation/modals/action";
import { isCosmosDbModalOpenSelector } from "../../../store/navigation/modals/selector";
import { WIZARD_CONTENT_INTERNAL_NAMES, ROUTES } from "../../../utils/constants";
import azureServiceOptions from "../../../mockData/azureServiceOptions";
import { servicesEnum } from "../../../mockData/azureServiceOptions";
import { IOption } from "../../../types/option";

import {
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import { AppState } from "../../../store/combineReducers";
import messages from "./messages";
import { setPageWizardPageAction, setDetailPageAction } from "../../../store/navigation/routes/action";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { getAppService } from "../../../store/userSelection/services/servicesSelector";

interface IAzureLoginProps {
  isCosmosDbModalOpen: boolean;
  cosmosDbSelection: any;
  isPreview: boolean;
}

interface IState {
  azureServices?: IOption[] | undefined;
}

type Props = IAzureLoginProps & InjectedIntlProps;

const AzureSubscriptions = (props: Props) => {
  const {
    cosmosDbSelection,
    intl,
    isPreview
  } = props;
  const { formatMessage } = intl;
  const [uniqueServiceTypes, setUniqueServiceTypes] = React.useState<(string | undefined)[]>([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));
  const appServiceSelection = useSelector(getAppService);
  const setDetailPage= (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted, ROUTES.ADD_SERVICES));
  }

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

  const openCloudServiceModal = (option: IOption) => {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: () => dispatch(ModalActions.openCosmosDbModalAction()),
      [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: ()=> dispatch(ModalActions.openAppServiceModalAction())
    };
    if (modalOpeners.hasOwnProperty(option.internalName)) {
      modalOpeners[option.internalName]();
    }
    //return () => void(0);
  }

  const openLoginModal = (option: IOption) => {
    dispatch(ModalActions.openAzureLoginModalAction(option.internalName));
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
                          ? () => openCloudServiceModal(option)
                          : () => openLoginModal(option)
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
  const { previewStatus } = state.config;
  return {
    isCosmosDbModalOpen: isCosmosDbModalOpenSelector(state),
    cosmosDbSelection: state.userSelection.services.cosmosDB,
    isPreview: previewStatus,
  };
};

export default connect(mapStateToProps)(injectIntl(AzureSubscriptions));
