import classnames from "classnames";
import React, { useMemo, useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CancelSVG } from "../../assets/cancel.svg";
import buttonStyles from "../../css/button.module.css";
import {
  hasInvalidPlatformRequirementsSelector,
  hasPlatformRequirementsSelector,
} from "../../store/config/platform/selector";
import * as ModalActions from "../../store/navigation/modals/action";
import { getSelectedRoute } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { hasServices as hasServicesSelector } from "../../store/userSelection/services/servicesSelector";
import { KEY_EVENTS, ROUTE } from "../../utils/constants/constants";
import Notification from "../Notification";
import ProjectDetails from "../ProjectDetails";
import Title from "../Titles/Title";
import About from "./About";
import messages from "./messages";
import SelectFrameworks from "./SelectFrameworks";
import SelectPages from "./SelectPages";
import SelectProjectTypes from "./SelectProjectTypes";
import ServicesList from "./ServicesList";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const RightSidebar = (props: Props) => {
  const [isSidebarOpen, setIsSiderbarOpen] = useState(true);
  const hasServices: boolean = useSelector(hasServicesSelector);
  const hasRequirements = useSelector(hasPlatformRequirementsSelector);
  const hasInvalidRequirements = useSelector(hasInvalidPlatformRequirementsSelector);
  const selectedRoute = useSelector(getSelectedRoute);
  const isFirstOrLastPage: boolean = useMemo<boolean>(
    () => selectedRoute === ROUTE.NEW_PROJECT || selectedRoute === ROUTE.REVIEW_AND_GENERATE,
    [selectedRoute]
  );

  const { intl } = props;
  const { formatMessage } = intl;
  const dispatch = useDispatch();

  const showHideMenu = () => {
    setIsSiderbarOpen(!isSidebarOpen);
  };

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      showHideMenu();
    }
  };

  return (
    <>
      {!isSidebarOpen && !isFirstOrLastPage && (
        <div className={classnames(styles.container, styles.rightViewCroppedHamburguer)}>
          <button
            tabIndex={0}
            className={styles.hamburgerButton}
            onClick={showHideMenu}
            aria-label={intl.formatMessage(messages.showAriaLabel)}
            title={intl.formatMessage(messages.showIcon)}
          >
            <div className={styles.hamburgerLine} />
            <div className={styles.hamburgerLine} />
            <div className={styles.hamburgerLine} />
          </button>
        </div>
      )}
      {(isSidebarOpen || isFirstOrLastPage) && (
        <div role="complementary" id="dvRightSideBar" className={classnames(styles.container, styles.rightViewCropped)}>
          <div className={styles.summaryContainer} id="dvSummaryContainer">
            <div className={styles.titleContainer}>
              <Title>{formatMessage(messages.yourProjectDetails)}</Title>
              <CancelSVG
                tabIndex={0}
                className={classnames(styles.icon, {
                  [styles.iconHide]: selectedRoute === ROUTE.REVIEW_AND_GENERATE || selectedRoute === ROUTE.NEW_PROJECT,
                })}
                onClick={showHideMenu}
                onKeyDown={cancelKeyDownHandler}
                aria-label={intl.formatMessage(messages.hideAriaLabel)}
                title={intl.formatMessage(messages.hideIcon)}
              />
            </div>

            {hasInvalidRequirements && (
              <div className={styles.notificationContainer}>
                <Notification showWarning={true} altMessage={formatMessage(messages.missingRequirements)}>
                  {formatMessage(messages.missingRequirements)}
                  <button
                    className={classnames(styles.notificationLink, buttonStyles.buttonLink)}
                    onClick={() => dispatch(ModalActions.openPlatformRequirementsAction())}
                  >
                    {formatMessage(messages.viewDetails)}
                  </button>
                </Notification>
              </div>
            )}

            <div>
              <ProjectDetails isRightsidebar={true} />

              <SelectProjectTypes />
              <SelectFrameworks />
              <SelectPages pathname={selectedRoute} />
              {hasServices && <ServicesList />}
            </div>

            <div className={styles.container}>
              <div className={styles.buttonContainer}>
                <button
                  className={buttonStyles.buttonLink}
                  onClick={() => dispatch(ModalActions.openViewLicensesModalAction())}
                >
                  {formatMessage(messages.viewLicenses)}
                </button>
              </div>
              {hasRequirements && (
                <button
                  className={buttonStyles.buttonLink}
                  onClick={() => dispatch(ModalActions.openPlatformRequirementsAction())}
                >
                  {formatMessage(messages.viewRequirements)}
                </button>
              )}

              <About />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default injectIntl(RightSidebar);
