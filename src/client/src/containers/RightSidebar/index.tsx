import classNames from "classnames";
import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import classnames from "classnames";

import ServicesList from "./ServicesList";
import About from "./About";
import SortablePageList from "./SortablePageList";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import {
  ROUTES,
  KEY_EVENTS,
  BOOTSTRAP_LICENSE
} from "../../utils/constants";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";

import { ISelected } from "../../types/selected";
import { resetAllPages } from "../../utils/extensionService/extensionService";
import Dropdown from "../../components/Dropdown";
import { getOutputPath, getProjectName, getServicesSelector } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../reducers";
import { setSelectedBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectedBackEndFramework";
import { setSelectedFrontendFrameworkAction } from "../../actions/wizardSelectionActions/selectedFrontendFramework";
import * as ModalActions from "../../actions/modalActions/modalActions";
import { resetPagesAction, selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";
import { SelectionState } from "../../reducers/wizardSelectionReducers";
import { IOption } from "../../types/option";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ServiceState } from "../../reducers/wizardSelectionReducers/services";
import { hasServicesSelector } from "../../selectors/servicesSelector";
import { getIsVisitedRoutesSelector, IVisitedPages } from "../../selectors/wizardNavigationSelector";
import { WizardContentType } from "../../reducers/wizardContentReducers";

type Props = RouteComponentProps & InjectedIntlProps;

const RightSidebar = (props:Props)=>{
  
  const [ isSidebarOpen, setIsSiderbarOpen ] = React.useState(false);
  const [ isSidebarUserControlled, setIsSidebarUserControlled ] = React.useState(false);

  const outputPath:string = useSelector((state: AppState) => getOutputPath(state));
  const projectName:string = useSelector((state: AppState) => getProjectName(state));
  const selection:SelectionState = useSelector((state: AppState) => state.selection);
  /*const projectTypeDropdownItems: IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.wizardContent.projectTypes));*/
  const frontEndOptions:IOption[] = useSelector((state: AppState) => state.wizardContent.frontendOptions);
  const frontendDropdownItems:IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.wizardContent.frontendOptions));
  const backendDropdownItems:IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.wizardContent.backendOptions));
  const vscode:IVSCodeObject = useSelector((state: AppState) => getVSCodeApiSelector(state));
  const services = useSelector((state: AppState) => getServicesSelector(state));
  const hasServices:boolean = useSelector((state: AppState) => hasServicesSelector(state));
  const isRoutesVisited: IVisitedPages = useSelector((state: AppState) => getIsVisitedRoutesSelector(state));
  const contentOptions: WizardContentType = useSelector((state: AppState) => state.wizardContent);
  const wizardRoutes = useSelector((state: AppState) => state.wizardRoutes);

  const {
    showPages
  } = isRoutesVisited;
  const { pathname } = props.location;
  const {
    intl
  } = props;

  const { formatMessage } = intl;
  const { backendOptions } = contentOptions;

  const dispatch = useDispatch();

  React.useEffect(()=>{
    if (wizardRoutes.isVisited["/SelectPages"]===true &&
    !isSidebarUserControlled)
      setIsSiderbarOpen(true);
  },[wizardRoutes]);

  function convertOptionsToDropdownItems(options: any[]): IDropDownOptionType[] {
    const dropDownItems = [];
    for (const option of options) {
      if (option.unselectable) {
        continue;
      }
      const dropdownItem = convertOptionToDropdownItem(option);
      dropDownItems.push(dropdownItem);
    }
    return dropDownItems;
  }

  function convertOptionToDropdownItem(option: ISelected): IDropDownOptionType {
    if (option.internalName && option.title) {
      return {
        value: option.internalName,
        label: option.title
      };
    }
    return {
      value: "",
      label: ""
    };
  }

  const handleBackEndFrameworkChange = (option: IDropDownOptionType) => {
    const optionBackEnd =
      backendOptions.find((optionBack:IOption) => optionBack.internalName === option.value);
    if (optionBackEnd){
      const { title, internalName, version, author, licenses } = optionBackEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses };
      dispatch(setSelectedBackendFrameworkAction(newBackEndFramework));
    }
  };

  const resetAllPagesEvent = () => {
    const { pages, frontendFramework } = selection;
    resetAllPages(vscode, frontendFramework.internalName, pages.length).then(()=>{
      dispatch(resetPagesAction());
      const PAGES_SELECTION: ISelected[] = [
        {
          title: "Blank",
          internalName: `wts.Page.${frontendFramework.internalName}.Blank`,
          id: "Blank",
          defaultName: "Blank",
          isValidTitle: true,
          licenses: [
            {
              text: "Bootstrap",
              url: BOOTSTRAP_LICENSE
            }
          ],
          author: "Microsoft"
        }
      ];
      dispatch(selectPagesAction(PAGES_SELECTION));
    });
  };

  const handleFrontEndFrameworkChange = (option: IDropDownOptionType) => {
    const optionFrontEnd =
      frontEndOptions.find((optionFront:IOption) => optionFront.internalName === option.value);
    if (optionFrontEnd){
      const { title, internalName, version, author, licenses } = optionFrontEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses };
      dispatch(setSelectedFrontendFrameworkAction(newBackEndFramework));
    }
  };

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
          className={classNames(styles.container, styles.rightViewCropped, {
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

            <div className={styles.title}>
              {formatMessage(messages.yourProjectDetails)}
            </div>
            <div className={styles.statics}>
              <div className={styles.projectStatic}>
                {formatMessage(messages.projectName)}:
                <span title={projectName} className={styles.value}>
                  {projectName}
                </span>
              </div>
              <div className={styles.projectStatic}>
                {formatMessage(messages.location)}:
                <span title={outputPath} className={styles.value}>
                  {outputPath}
                </span>
              </div>
            </div>
            <div className={styles.decoratedLine} />
            <div className={styles.sidebarItem}>
              <div className={styles.dropdownTitle}>{formatMessage(messages.frontendFramework)}</div>
              <Dropdown
                handleChange={(dropDrownItem: IDropDownOptionType) => {
                  handleFrontEndFrameworkChange(dropDrownItem);
                }}
                ariaLabel={formatMessage(messages.backendFramework)}
                options={frontendDropdownItems}
                value={convertOptionToDropdownItem(
                  selection.frontendFramework
                )}
              />
            </div>
            <div className={styles.sidebarItem}>
              <div className={styles.dropdownTitle}>{formatMessage(messages.backendFramework)}</div>
              <Dropdown
                handleChange={(dropDrownItem: IDropDownOptionType) => {
                  handleBackEndFrameworkChange(dropDrownItem);
                }}
                ariaLabel={formatMessage(messages.backendFramework)}
                options={backendDropdownItems}
                value={convertOptionToDropdownItem(
                  selection.backendFramework
                )}
              />
            </div>
            <div className={styles.sortablePages}>
              {showPages && (
                <SortablePageList
                  handleResetPages={resetAllPagesEvent}
                  isSummaryPage={pathname === ROUTES.REVIEW_AND_GENERATE}
                />
              )}
            </div>
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

function convertOptionToDropdownItem(option: any): IDropDownOptionType {
  return {
    value: option.internalName,
    label: option.title
  };
}

export default withRouter(injectIntl(RightSidebar));