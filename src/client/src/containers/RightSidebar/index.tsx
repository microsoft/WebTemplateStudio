import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import classnames from "classnames";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesList from "./ServicesList";
import About from "./About";
import SortablePageList from "./SortablePageList";
import { IDispatchProps, IRightSidebarProps } from "./interfaces";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import {
  ROUTES,
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  BOOTSTRAP_LICENSE
} from "../../utils/constants";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";

import { ISelected } from "../../types/selected";
import { IOption } from "../../types/option";
import { resetAllPages } from "../../utils/extensionService/extensionService";
import { mapDispatchToProps, mapStateToProps } from "./store";

interface IRightSidebarState {
  isSidebarOpen: boolean;
  isSidebarUserControlled: boolean;
}

type Props = IRightSidebarProps &
  RouteComponentProps &
  IDispatchProps &
  InjectedIntlProps;

const RightSidebar = (props:Props)=>{
  const {
    showFrameworks,
    showPages
  } = props.isRoutesVisited;
  const { pathname } = props.location;
  const {
    intl,
    contentOptions,
    openViewLicensesModal,
    outputPath,
    projectName,
    hasServices
  } = props;
  const { selectBackendFramework,
    selectFrontendFramework,
    selectPages,
    selection,
    vscode,
    resetPageSelection,
    backendDropdownItems,
    wizardRoutes
  } = props;

  const { formatMessage } = intl;
  const { frontendOptions, backendOptions } = contentOptions;
  const [ isSidebarOpen, setIsSiderbarOpen ] = React.useState(false);
  const [ isSidebarUserControlled, setIsSidebarUserControlled ] = React.useState(false);

  React.useEffect(()=>{
    if ((wizardRoutes.isVisited["/SelectPages"]===true ||
    wizardRoutes.isVisited["/SelectPages"]===true ||
    wizardRoutes.isVisited["/SelectPages"]===true) &&
    !isSidebarUserControlled)
      setIsSiderbarOpen(true);
  },[wizardRoutes]);

  /*public static defaultProps = {
    selectBackendFramework: () => void(0),
    selectFrontendFramework: () => void(0),
    selectWebApp: () => void(0),
    selectPages: () => void(0)
  };*/

  /*state: IRightSidebarState = {
    isSidebarOpen: false,
    isSidebarUserControlled: false
  };*/

  const handleChange = (
    e: IDropDownOptionType,
    selectOption: (item: ISelected) => void,
    optionsData: IOption[]
  ) => {
    optionsData.map(option => {
      if (option.internalName === e.value) {
        const { title, internalName, version, author, licenses } = option;
        selectOption({
          title: title as string,
          internalName,
          version,
          author,
          licenses
        });
      }
    });
  };

  const resetAllPagesEvent = () => {
    const { pages, frontendFramework } = selection;
    resetAllPages(vscode, frontendFramework.internalName, pages.length).then(()=>{
      //if (message.payload.resetPages) {
        resetPageSelection();
        // select default blank page
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
        selectPages(PAGES_SELECTION);
      //}
    });
  };

  const handleFrameworkChange = (option: IDropDownOptionType) => {
    const {
      frontendFramework,
      backendFramework,
      pages
    } = selection;
    const {
      vscode,
      selectPages,
      frontEndOptions,
      selectFrontendFramework
    } = props;
    if (frontendFramework.internalName !== option.value) {
      vscode.postMessage({
        module: EXTENSION_MODULES.CORETS,
        command: EXTENSION_COMMANDS.GET_PAGES,
        payload: {
          projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
          frontendFramework: option.value,
          backendFramework: backendFramework.internalName
        }
      });
      let newFrontEndFramework;
      frontEndOptions.forEach(frontEnd => {
        if (frontEnd.internalName === option.value) {
          const { title, internalName, version, author, licenses } = frontEnd;
          newFrontEndFramework = {
            title: title as string,
            internalName,
            version,
            author,
            licenses
          };
        }
      });

      const newPages: ISelected[] = pages.map((page: ISelected) => {
        return {
          title: page.title,
          internalName: page.internalName.replace(
            frontendFramework.internalName,
            option.value
          ),
          id: page.id,
          defaultName: page.defaultName,
          isValidTitle: page.isValidTitle,
          licenses: page.licenses,
          author: page.author
        };
      });
      selectPages(newPages);
      newFrontEndFramework && selectFrontendFramework(newFrontEndFramework);
    }
  };

  const handleInputChange = (newTitle: string, idx: number) => {
    const { pages } = selection;
    pages[idx].title = newTitle;
    selectPages(pages);
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
            <RightSidebarDropdown
              options={props.frontendDropdownItems}
              handleDropdownChange={
                (showPages && handleFrameworkChange) || handleChange
              }
              selectDropdownOption={selectFrontendFramework}
              isVisible={showFrameworks}
              title={formatMessage(messages.frontendFramework)}
              value={convertOptionToDropdownItem(
                selection.frontendFramework
              )}
              optionsData={frontendOptions}
            />
            <RightSidebarDropdown
              options={backendDropdownItems}
              handleDropdownChange={handleChange}
              selectDropdownOption={selectBackendFramework}
              isVisible={showFrameworks}
              title={formatMessage(messages.backendFramework)}
              value={convertOptionToDropdownItem(
                selection.backendFramework
              )}
              optionsData={backendOptions}
            />
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
                    onClick={openViewLicensesModal}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(RightSidebar))
);
