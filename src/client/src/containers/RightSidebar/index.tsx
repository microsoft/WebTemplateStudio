import classnames from "classnames";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import ServicesList from "./ServicesList";
import About from "./About";
import SelectPages from "./SelectPages";
import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import { KEY_EVENTS } from "../../utils/constants/constants";
import { ROUTE } from "../../utils/constants/routes";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import * as ModalActions from "../../store/navigation/modals/action";
import { hasServices as hasServicesSelector } from "../../store/userSelection/services/servicesSelector";
import ProjectDetails from "./ProjectDetails";
import SelectFrameworks from "./SelectFrameworks";
import { getSelectedRoute } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

type Props = InjectedIntlProps;

const RightSidebar = (props: Props)=>{
  const [ isSidebarOpen, setIsSiderbarOpen ] = React.useState(true);
  const hasServices: boolean = useSelector(hasServicesSelector);
  const selectedRoute = useSelector(getSelectedRoute);
  const isFirstOrLastPage: boolean = React.useMemo<boolean>(()=>selectedRoute === ROUTE.NEW_PROJECT ||
    selectedRoute === ROUTE.REVIEW_AND_GENERATE,[selectedRoute]);

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
    <div>
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
      <div
        role="complementary" id="dvRightSideBar"
        className={classnames(styles.container, styles.rightViewCropped)}
      >
      <div className={styles.summaryContainer} id="dvSummaryContainer">
        <Cancel
          tabIndex={0}
          className={classnames(styles.icon,{[styles.iconHide]: selectedRoute === ROUTE.REVIEW_AND_GENERATE || selectedRoute === ROUTE.NEW_PROJECT})}
          onClick={showHideMenu}
          onKeyDown={cancelKeyDownHandler}
          aria-label={intl.formatMessage(messages.hideAriaLabel)}
          title={intl.formatMessage(messages.hideIcon)}
        />
        <ProjectDetails/>
        <SelectFrameworks/>
        <SelectPages pathname={selectedRoute}/>
        {hasServices && <ServicesList />}
        <div className={styles.container}>
          {selectedRoute !== ROUTE.REVIEW_AND_GENERATE && (
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