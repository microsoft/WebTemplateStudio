import classNames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as EditSVG } from "../../../assets/edit.svg";
import { ReactComponent as PriceSVG } from "../../../assets/money.svg";
import { ReactComponent as PlusSVG } from "../../../assets/plus.svg";
import { ReactComponent as TimeSVG } from "../../../assets/timer.svg";
import Icon from "../../../components/Icon";
import buttonStyles from "../../../css/button.module.css";
import { AppState } from "../../../store/combineReducers";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { openAzureServicesModalAction } from "../../../store/navigation/modals/action";
import { hasSelectedService } from "../../../store/userSelection/services/servicesSelector";
import { KEY_EVENTS, ROUTE } from "../../../utils/constants/constants";
import cardStyles from "../../cardStyles.module.css";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  service: IService;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props): JSX.Element => {
  const { intl, service } = props;
  const [showPlusIcon, setShowPlusIcon] = React.useState(false);

  const { formatMessage } = intl;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const hasService = useSelector((state: AppState) => hasSelectedService(state, service.internalName));

  const showDetails = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    dispatch(setDetailPageAction(service, false, ROUTE.ADD_SERVICES));
  };

  const openModal = () => {
    isLoggedIn && service.openModalAction
      ? dispatch(service.openModalAction)
      : dispatch(openAzureServicesModalAction(service.internalName));
  };

  const openModalIfEnterOrSpace = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isSelectableCard = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isSelectableCard) {
      event.preventDefault();
      openModal();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openModal}
      onKeyDown={openModalIfEnterOrSpace}
      className={classNames(cardStyles.container, cardStyles.boundingBox, styles.boundingBox, {
        [cardStyles.selected]: hasService,
      })}
      onFocus={() => setShowPlusIcon(true)}
      onBlur={() => setShowPlusIcon(false)}
      onMouseLeave={() => setShowPlusIcon(false)}
      onMouseOver={() => setShowPlusIcon(true)}
    >
      <div>
        <div className={cardStyles.gridLayoutCardHeader}>
          <div>
            <Icon name={service.title} icon={service.icon} />
          </div>
          <div className={cardStyles.title}>{service.title}</div>

          {showPlusIcon && (
            <div className={classNames(styles.headerIconContainer)}>
              {!hasService && (
                <PlusSVG
                  role="figure"
                  className={styles.icon}
                  title={formatMessage(messages.addToProject)}
                  aria-label={formatMessage(messages.addToProject)}
                />
              )}
              {hasService && (
                <EditSVG
                  role="figure"
                  className={styles.icon}
                  title={formatMessage(messages.editResource)}
                  aria-label={formatMessage(messages.editResource)}
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.description}>
          {service.expectedPrice && (
            <div className={styles.expectedPrice}>
              <PriceSVG role="figure" className={styles.svg} aria-label={formatMessage(messages.price)} />
              <div>{formatMessage(service.expectedPrice)}</div>
            </div>
          )}
          {service.expectedTime && (
            <div className={styles.expectedTime}>
              <TimeSVG role="figure" className={styles.svg} aria-label={formatMessage(messages.setUpTime)} />
              <div>{formatMessage(service.expectedTime)}</div>
            </div>
          )}
          <div>{service.body}</div>
        </div>
        <div className={cardStyles.gridLayoutCardFooter}>
          <div>
            <button tabIndex={0} onClick={showDetails} className={buttonStyles.buttonLink}>
              {formatMessage(messages.learnMore)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
