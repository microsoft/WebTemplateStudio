import classnames from "classnames";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
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

import { AppState } from "../../reducers";
import * as ModalActions from "../../actions/modalActions/modalActions";
import { hasServicesSelector } from "../../selectors/servicesSelector";
import { getIsVisitedRoutesSelector, IVisitedPages } from "../../selectors/wizardNavigationSelector";
import ProjectDetails from "./ProjectDetails";
import SelectFrameworks from "./SelectFrameworks";

type Props = RouteComponentProps & InjectedIntlProps;

const RightSidebar = (props: Props)=>{
  const [ isSidebarOpen, setIsSiderbarOpen ] = React.useState(false);
  const [ isSidebarUserControlled, setIsSidebarUserControlled ] = React.useState(false);

  const hasServices: boolean = useSelector((state: AppState) => hasServicesSelector(state));
  const isRoutesVisited: IVisitedPages = useSelector((state: AppState) => getIsVisitedRoutesSelector(state));
  const wizardRoutes = useSelector((state: AppState) => state.wizardRoutes);

  const { showPages } = isRoutesVisited;
  const { pathname } = props.location;
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
        pathname === ROUTES.PAGE_DETAILS || pathname === ROUTES.NEW_PROJECT
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
    {(isSidebarOpen || pathname === ROUTES.REVIEW_AND_GENERATE) && (
      <div
        role="complementary" id="dvRightSideBar"
        className={classnames(styles.container, styles.rightViewCropped, {
          [styles.rightViewCroppedSummaryPage]:
            pathname === ROUTES.REVIEW_AND_GENERATE
        })}
      >
      <div className={styles.summaryContainer} id="dvSummaryContainer">
        {pathname !== ROUTES.REVIEW_AND_GENERATE && (
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
        {showPages && (<SelectPages pathname={pathname}/>)}
        {hasServices && <ServicesList />}
        <div className={styles.container}>
          {pathname !== ROUTES.REVIEW_AND_GENERATE && (
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

export default withRouter(injectIntl(RightSidebar));