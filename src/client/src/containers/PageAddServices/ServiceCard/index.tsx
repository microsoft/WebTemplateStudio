import classnames from "classnames";
import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {openAzureLoginModalAction} from "../../../store/navigation/modals/action";

import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { getSvg } from "../../../utils/getSvgUrl";
import { KEY_EVENTS } from "../../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import messages from "./messages";
import { hasSelectedService } from "../../../store/userSelection/services/servicesSelector";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { AppState } from "../../../store/combineReducers";
import { ReactComponent as PriceSVG } from "../../../assets/money.svg";
import { ReactComponent as TimeSVG } from "../../../assets/timer.svg";
import { ROUTE } from "../../../utils/constants/routes";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";

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
    dispatch(setDetailPageAction(service, false, ROUTE.ADD_SERVICES));
  };

  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      dispatch(setDetailPageAction(service, false, ROUTE.ADD_SERVICES));
    }
  };

  const openModal = () => {
    isLoggedIn && service.openModalAction
      ? dispatch(service.openModalAction)
      : dispatch(openAzureLoginModalAction(service.internalName));
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          {getSvg(service.internalName, styles.icon)}
          <div className={styles.title}>{service.title}</div>
        </div>
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
              <div>{service.body}</div>
          </div>
        <div className={styles.footer}>
            <a tabIndex={0} onClick={showDetails} onKeyDown={showDetailIfPressEnterKey} className={styles.link}>
              {formatMessage(messages.learnMore)}
            </a>
            <button
              onClick={openModal}
              className={classnames(
                styles.addButton,
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
  );
};

export default injectIntl(ServiceCard);
