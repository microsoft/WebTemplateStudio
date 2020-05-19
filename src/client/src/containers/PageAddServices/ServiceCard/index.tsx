import classnames from "classnames";
import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {openAzureLoginModalAction} from "../../../store/navigation/modals/action";

import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { getSvg } from "../../../utils/getSvgUrl";
import { KEY_EVENTS, ROUTES } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setPageWizardPageAction, setDetailPageAction } from "../../../store/navigation/routes/action";
import messages from "./messages";
import { hasSelectedService } from "../../../store/userSelection/services/servicesSelector";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { AppState } from "../../../store/combineReducers";
import { ReactComponent as PriceSVG } from "../../../assets/money.svg";
import { ReactComponent as TimeSVG } from "../../../assets/timer.svg";
import { IService } from "../../../store/templates/features/selector";

interface IProps {
  service: IService;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props) => {
  const { intl, service } = props;
  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const hasService = useSelector((state: AppState) => hasSelectedService(state, service.internalName));

  const showDetails = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(service, false, ROUTES.ADD_SERVICES));
  };

  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
      dispatch(setDetailPageAction(service, false, ROUTES.ADD_SERVICES));
    }
  };

  const openModal = () => {
    isLoggedIn && service.openModalAction
      ? dispatch(service.openModalAction)
      : dispatch(openAzureLoginModalAction(service.internalName));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.cardTitleContainer}>
          {getSvg(service.internalName, styles.icon)}
          <div className={styles.cardTitle}>{service.title}</div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardBody}>
            <div className={styles.body}>
              {service.expectedPrice && (
                <div className={styles.expectedPrice}>
                  <PriceSVG className={styles.svg} />
                  <div>{formatMessage(service.expectedPrice)}</div>
                </div>
              )}
              {service.expectedTime && (
                <div className={styles.expectedTime}>
                  <TimeSVG className={styles.svg} />
                  <div>{formatMessage(service.expectedTime)}</div>
                </div>
              )}
              <div className={styles.formattedBody}>{service.body}</div>
            </div>
          </div>
          <div className={styles.selectionContainer}>
            <a tabIndex={0} onClick={showDetails} onKeyDown={showDetailIfPressEnterKey} className={styles.details}>
              {formatMessage(messages.learnMore)}
            </a>
            <button
              onClick={openModal}
              className={classnames(
                styles.signInButton,
                buttonStyles.buttonHighlighted,
                buttonStyles.buttonCursorPointer
              )}
              tabIndex={0}
            >
              {hasService ? formatMessage(messages.editResource) : formatMessage(messages.addToProject)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
