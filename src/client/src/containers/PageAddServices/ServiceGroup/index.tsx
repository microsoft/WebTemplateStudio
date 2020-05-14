import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import styles from "./styles.module.css";
import * as ModalActions from "../../../store/navigation/modals/action";
import { WIZARD_CONTENT_INTERNAL_NAMES, ROUTES } from "../../../utils/constants";
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
import ServiceCard from "../ServiceCard";

interface IStateProps {
  serviceType: string;
  services: IOption[];
}

type Props = IStateProps & InjectedIntlProps;

const ServiceGroup = ({ intl, services, serviceType }: Props) => {
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const cosmosDbSelection = useSelector((state: AppState) => state.userSelection.services.cosmosDB);
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));
  const appServiceSelection = useSelector(getAppService);
  const [title, setTitle] = React.useState("");
  
  React.useEffect(()=>{
    switch (serviceType) {
      case servicesEnum.HOSTING:
        setTitle(formatMessage(messages.hostingTitle));
        break;
      case servicesEnum.DATABASE:
        setTitle(formatMessage(messages.storageTitle));
        break;
    }
  },[]);
        

  const setDetailPage = (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted, ROUTES.ADD_SERVICES));
  }

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

  return (
      <div className={styles.container}>
          <div className={styles.serviceType}>{serviceType}</div>
          <div className={styles.descriptor}>{title}</div>
          <div className={styles.cardsContainer}>
            {services.map((option, key) => {
              if (isPreview || !option.isPreview) {
                return (
                  <div
                    key={JSON.stringify(option.title)}
                    className={classnames(styles.subscriptionCardContainer, {
                      [styles.overlay]: !isLoggedIn
                    })}
                  >
                    <Card
                      option={option}
                      buttonText={addOrEditResourceText(option.internalName)}
                      handleButtonClick={
                        isLoggedIn
                          ? () => openCloudServiceModal(option)
                          : () => openLoginModal(option)
                      }
                      handleDetailsClick={setDetailPage}
                    />
                    <ServiceCard key={key} option={option} />
                  </div>
                );
              }
            })}
          </div>
      </div>
  );
}

export default injectIntl(ServiceGroup);
