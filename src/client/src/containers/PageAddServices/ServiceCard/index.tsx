import classnames from "classnames";
import * as React from "react";
import _ from "lodash";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import * as ModalActions from "../../../store/navigation/modals/action";

import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../../types/option";
import { getSvg } from "../../../utils/getSvgUrl";
import CardBody from "../../../components/CardBody";
import keyUpHandler from "../../../utils/keyUpHandler";
import { KEY_EVENTS, ROUTES, WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setPageWizardPageAction, setDetailPageAction } from "../../../store/navigation/routes/action";
import messages from "./messages";
import { getServices } from "../../../store/userSelection/services/servicesSelector";
import { isLoggedInSelector } from "../../../store/config/azure/selector";

interface IProps {
  option: IOption;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props) => {
  const { intl, option } = props;
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const servicesSelection = useSelector(getServices);

  const handleDetailsClick = (option: IOption) => {
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(option, false, ROUTES.ADD_SERVICES));
  };

  const isSelectionCreated = (internalName: string): boolean => {
    if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
      return !_.isEmpty(servicesSelection.cosmosDB);
    } else if (internalName === WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE) {
      return !_.isEmpty(servicesSelection.appService);
    }
    return false;
  };

  const addOrEditResourceText = (internalName: string): string => {
    if (isSelectionCreated(internalName)) {
      return formatMessage(messages.editResource);
    }
    return formatMessage(messages.addToProject);
  };
  
  const handleDetailsClickIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>, option: IOption) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      handleDetailsClick(option);
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
            onClick={() => handleDetailsClick(option)}
            onKeyPress={event => handleDetailsClickIfPressEnterKey(event, option)}
            className={styles.details}
            onKeyUp={keyUpHandler}
          >
            <FormattedMessage id="card.details" defaultMessage="Learn more" />
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
            {addOrEditResourceText(option.internalName)}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
