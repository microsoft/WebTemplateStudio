import classnames from "classnames";
import * as React from "react";
import _ from "lodash";
import { injectIntl, InjectedIntlProps } from "react-intl";
import * as ModalActions from "../../../store/navigation/modals/action";

import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../../types/option";
import { getSvg } from "../../../utils/getSvgUrl";
import CardBody from "../../../components/CardBody";
import { KEY_EVENTS, ROUTES, WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setPageWizardPageAction, setDetailPageAction } from "../../../store/navigation/routes/action";
import messages from "./messages";
import { getServices, hasSelectedService } from "../../../store/userSelection/services/servicesSelector";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { AppState } from "../../../store/combineReducers";

interface IProps {
  option: IOption;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props) => {
  const { intl, option } = props;
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const hasService = useSelector((state: AppState) => hasSelectedService(state, option.internalName));

  const showDetails = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(option, false, ROUTES.ADD_SERVICES));
  }; 
  
  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
      dispatch(setDetailPageAction(option, false, ROUTES.ADD_SERVICES));
    }
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
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {getSvg(option.internalName, styles.icon)}
        <div className={styles.cardTitle}>{option.title}</div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <CardBody
            formattedBody={option.body as string}
            expectedTime={option.expectedTime as string|undefined}
            expectedPrice={option.expectedPrice as string|undefined}
          />
        </div>
        <div className={styles.selectionContainer}>
          <a
            tabIndex={0}
            onClick={showDetails}
            onKeyDown={showDetailIfPressEnterKey}
            className={styles.details}>
              {formatMessage(messages.learnMore)}
          </a>
          <button
            onClick={
              isLoggedIn
                ? () => openCloudServiceModal(option)
                : () => openLoginModal(option)
            }
            className={classnames(
              styles.signInButton,
              buttonStyles.buttonHighlighted,
              buttonStyles.buttonCursorPointer
            )}
            tabIndex={0}
          >
            {hasService 
              ? formatMessage( messages.editResource) 
              : formatMessage( messages.addToProject)}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
