import classnames from "classnames";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ServicesList from "./ServicesList";
import About from "./About";
import SelectPages from "./SelectPages";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import {
  ROUTES,
  KEY_EVENTS
} from "../../utils/constants";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";

import { AppState } from "../../store/combineReducers";
import * as ModalActions from "../../store/modals/action";
import { hasServicesSelector } from "../../store/azureProfileData/servicesSelector";
import { getIsVisitedRoutesSelector, IVisitedPages } from "../../store/wizardContent/wizardContent/wizardNavigationSelector";
import ProjectDetails from "./ProjectDetails";
import SelectFrameworks from "./SelectFrameworks";

type Props = InjectedIntlProps;

const RightSidebar = (props: Props)=>{
  const [ isSidebarOpen, setIsSiderbarOpen ] = React.useState(false);
  const [ isSidebarUserControlled, setIsSidebarUserControlled ] = React.useState(false);

  const hasServices: boolean = useSelector((state: AppState) => hasServicesSelector(state));
  const isRoutesVisited: IVisitedPages = useSelector((state: AppState) => getIsVisitedRoutesSelector(state));
  const wizardRoutes = useSelector((state: AppState) => state.wizardRoutes);
  const selectedRoute = useSelector((state: AppState) => state.wizardRoutes.selected);

  const { showPages } = isRoutesVisited;
  const { intl } = props;
  const { formatMessage } = intl;

  const dispatch = useDispatch();

  React.useEffect(()=>{
    if (wizardRoutes.isVisited["/SelectPages"]===true &&
    !isSidebarUserControlled)
      setIsSiderbarOpen(true);
  },[wizardRoutes]);

  const sidebarToggleClickHandler = () => {
    setIsSiderbarOpen(!isSidebarOpen);
    setIsSidebarUserControlled(true);
  };

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      sidebarToggleClickHandler();
    }
  };

  return (
    <div
      className={
        selectedRoute === ROUTES.PAGE_DETAILS || selectedRoute === ROUTES.NEW_PROJECT
          ? styles.hide
          : undefined
      }
    >
    {!isSidebarOpen && (
    <div className={styles.hamburgerContainer}>
      <button
        tabIndex={0}
        className={styles.hamburgerButton}
        onClick={sidebarToggleClickHandler}
        aria-label={intl.formatMessage(messages.openSideBar)}
      >
        <div className={styles.hamburgerLine} />
        <div className={styles.hamburgerLine} />
        <div className={styles.hamburgerLine} />
      </button>
    </div>
    )}
    {(isSidebarOpen || selectedRoute === ROUTES.REVIEW_AND_GENERATE) && (
      <div
        role="complementary" id="dvRightSideBar"
        className={classnames(styles.container, styles.rightViewCropped, {
          [styles.rightViewCroppedSummaryPage]:
          selectedRoute === ROUTES.REVIEW_AND_GENERATE
        })}
      >
      <div className={styles.summaryContainer} id="dvSummaryContainer">
        {selectedRoute !== ROUTES.REVIEW_AND_GENERATE && (
          <Cancel
            tabIndex={0}
            className={styles.icon}
            onClick={sidebarToggleClickHandler}
            onKeyDown={cancelKeyDownHandler}
            aria-label={intl.formatMessage(messages.closeSideBar)}
          />
        )}

        <ProjectDetails/>
        <SelectFrameworks/>
        {showPages && (<SelectPages pathname={selectedRoute}/>)}
        {hasServices && <ServicesList />}
        <div className={styles.container}>
          {selectedRoute !== ROUTES.REVIEW_AND_GENERATE && (
            <div className={styles.buttonContainer}>
              <button
                className={classnames(
                  buttonStyles.buttonDark,
                  styles.button,
                  styles.leftButton
                )}
                onClick={()=> dispatch(ModalActions.openViewLicensesModalAction())}
              >
                {formatMessage(messages.viewLicenses)}
              </button>
            </div>
          )}
          <About />
        </div>
      </div>
    </div>
    )}
  </div>
  );
}

export default injectIntl(RightSidebar);