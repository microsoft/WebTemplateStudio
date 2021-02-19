import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as ModalActions from "../../store/navigation/modals/action";
import { hasServices as hasServicesSelector } from "../../store/userSelection/services/servicesSelector";
import { getSelectedRoute } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

import { KEY_EVENTS, PLATFORM, ROUTE } from "../../utils/constants/constants";

import { ReactComponent as CancelSVG } from "../../assets/cancel.svg";

import About from "./About";
import SelectPages from "./SelectPages";
import ProjectDetails from "../ProjectDetails";
import ServicesList from "./ServicesList";
import SelectFrameworks from "./SelectFrameworks";
import Notification from "../Notification";

import messages from "./messages";
import messagesWeb from "./messagesWeb";
import messagesReactNative from "./messagesReactNative";
import classnames from "classnames";
import styles from "./styles.module.css";
import buttonStyles from "../../css/button.module.css";
import SelectProjectTypes from "./SelectProjectTypes";

import Title from "../Titles/Title";

import {
  getPlatformSelector,
  hasInvalidPlatformRequirementsSelector,
  hasPlatformRequirementsSelector,
} from "../../store/config/platform/selector";

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
  const platform = useSelector(getPlatformSelector);
  const platformMessages = (platform.id === PLATFORM.WEB) ? messagesWeb : messagesReactNative;

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
              <Title>{formatMessage(platformMessages.yourProjectDetails)}</Title>
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
