import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter, Link } from "react-router-dom";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import classnames from "classnames";
import _ from "lodash";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesSidebarItem from "../../components/ServicesSidebarItem";
import About from "../About";
import SortablePageList from "../SortablePageList";

import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import {
  selectPagesAction,
  updatePageCountAction
} from "../../actions/wizardSelectionActions/selectPages";
import * as ModalActions from "../../actions/modalActions/modalActions";

import { getServicesSelector } from "../../selectors/cosmosServiceSelector";
import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import {
  ROUTES,
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  PAYLOAD_MESSAGES_TEXT,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";

import { ISelected } from "../../types/selected";
import { AppState } from "../../reducers";
import { SelectionState } from "../../reducers/wizardSelectionReducers";
import RootAction from "../../actions/ActionType";
import { WizardContentType } from "../../reducers/wizardContentReducers";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";
import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";
import { getPageCount } from "../../selectors/wizardSelectionSelector";
import {
  getOutputPath,
  getProjectName
} from "../../selectors/wizardSelectionSelector";

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  updatePageCount: (pageCount: IPageCount) => any;
  openViewLicensesModal: () => any;
}

interface IRightSidebarProps {
  outputPath: string;
  projectName: string;
  selection: SelectionState;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontEndOptions: IOption[];
  pageCount: IPageCount;
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: any;
  vscode: IVSCodeObject;
  isValidNameAndProjectPath: boolean;
  isRoutesVisited: IVisitedPages;
  contentOptions: WizardContentType;
}

interface IRightSidebarState {
  isSidebarOpen: boolean;
  isSidebarUserControlled: boolean;
}

type Props = IRightSidebarProps &
  RouteComponentProps &
  IDispatchProps &
  InjectedIntlProps;

const hasAzureServices = (services: any) => {
  for (const key in services) {
    if (!_.isEmpty(services[key].selection)) return true;
  }
  return false;
};

const sideBarMessages = defineMessages({
  openSideBar: {
    id: "rightSidebar.open",
    defaultMessage: "View project details menu"
  },
  closeSideBar: {
    id: "rightSidebar.close",
    defaultMessage: "Close project details menu"
  }
});

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  public static defaultProps = {
    selectBackendFramework: () => {},
    selectFrontendFramework: () => {},
    selectWebApp: () => {},
    selectPages: () => {}
  };

  state: IRightSidebarState = {
    isSidebarOpen: false,
    isSidebarUserControlled: false
  };

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: IRightSidebarState
  ) {
    if (nextProps.location.pathname === ROUTES.REVIEW_AND_GENERATE) {
      return {
        isSidebarOpen: true
      };
    }
    if (!prevState.isSidebarUserControlled) {
      return {
        isSidebarOpen:
          nextProps.selection.pages.length > 1 ||
          hasAzureServices(nextProps.services) ||
          prevState.isSidebarOpen
      };
    }
    return null;
  }

  public handleChange = (
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

  public resetAllPages = () => {
    const { pages, frontendFramework } = this.props.selection;
    const { vscode } = this.props;
    vscode.postMessage({
      module: EXTENSION_MODULES.VSCODEUI,
      command: EXTENSION_COMMANDS.RESET_PAGES,
      track: false,
      text: PAYLOAD_MESSAGES_TEXT.RESET_PAGES_TEXT,
      payload: {
        internalName: frontendFramework.internalName,
        pagesLength: pages.length
      }
    });
  };

  public handleFrameworkChange = (option: IDropDownOptionType) => {
    const {
      frontendFramework,
      backendFramework,
      pages,
      pageCount
    } = this.props.selection;
    const {
      vscode,
      selectPages,
      frontEndOptions,
      selectFrontendFramework,
      updatePageCount
    } = this.props;
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
      const cardCountType: IPageCount = {};
      for (const pageType in pageCount) {
        const newKey = pageType.replace(
          frontendFramework.internalName,
          option.value
        );
        cardCountType[newKey] = pageCount[pageType];
      }
      updatePageCount(cardCountType);
      const newPages: ISelected[] = pages.map(page => {
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

  /**
   * Changes the title of the page type that was chosen
   * Saves changes into the redux
   */
  public handleInputChange = (newTitle: string, idx: number) => {
    const { pages } = this.props.selection;
    pages[idx].title = newTitle;
    this.props.selectPages(pages);
  };
  public convertOptionToDropdownItem(option: ISelected): IDropDownOptionType {
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

  sidebarToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        isSidebarOpen: !prevState.isSidebarOpen,
        isSidebarUserControlled: true
      };
    });
  };

  cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      this.sidebarToggleClickHandler();
    }
  };

  public render() {
    const {
      showFrameworks,
      showPages,
      showServices
    } = this.props.isRoutesVisited;
    const { pathname } = this.props.location;
    const {
      intl,
      contentOptions,
      isValidNameAndProjectPath,
      openViewLicensesModal,
      outputPath,
      projectName
    } = this.props;
    const { formatMessage } = intl;
    const { frontendOptions, backendOptions } = contentOptions;
    const { isSidebarOpen } = this.state;

    return (
      <React.Fragment>
        <div className={styles.hamburgerContainer}>
          <button
            tabIndex={0}
            className={styles.hamburgerButton}
            onClick={this.sidebarToggleClickHandler}
            aria-label={intl.formatMessage(sideBarMessages.openSideBar)}
          >
            <div className={styles.hamburgerLine} />
            <div className={styles.hamburgerLine} />
            <div className={styles.hamburgerLine} />
          </button>
        </div>
        <div
          role="complementary"
          className={classNames(styles.container, styles.rightViewCropped, {
            [styles.rightViewCroppedAllPages]:
              pathname !== ROUTES.REVIEW_AND_GENERATE,
            [styles.rightViewCroppedSummaryPage]:
              pathname === ROUTES.REVIEW_AND_GENERATE,
            [styles.open]: isSidebarOpen
          })}
        >
          <div className={styles.summaryContainer}>
            {pathname !== ROUTES.REVIEW_AND_GENERATE && (
              <Cancel
                tabIndex={0}
                className={styles.icon}
                onClick={this.sidebarToggleClickHandler}
                onKeyDown={this.cancelKeyDownHandler}
                aria-label={intl.formatMessage(sideBarMessages.closeSideBar)}
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
              options={this.props.frontendDropdownItems}
              handleDropdownChange={
                (showPages && this.handleFrameworkChange) || this.handleChange
              }
              selectDropdownOption={this.props.selectFrontendFramework}
              isVisible={showFrameworks}
              title={formatMessage(messages.frontendFramework)}
              value={this.convertOptionToDropdownItem(
                this.props.selection.frontendFramework
              )}
              optionsData={frontendOptions}
              disabled={!isValidNameAndProjectPath}
            />
            <RightSidebarDropdown
              options={this.props.backendDropdownItems}
              handleDropdownChange={this.handleChange}
              selectDropdownOption={this.props.selectBackendFramework}
              isVisible={showFrameworks}
              title={formatMessage(messages.backendFramework)}
              value={this.convertOptionToDropdownItem(
                this.props.selection.backendFramework
              )}
              optionsData={backendOptions}
            />
            <div className={styles.sortablePages}>
              {showPages && (
                <SortablePageList
                  handleResetPages={this.resetAllPages}
                  isSummaryPage={pathname === ROUTES.REVIEW_AND_GENERATE}
                />
              )}
            </div>
            {showServices && (
              <div className={styles.sidebarItem}>
                <div className={styles.dropdownTitle}>
                  {formatMessage(messages.services)}
                </div>
                {pathname === ROUTES.REVIEW_AND_GENERATE &&
                  !hasAzureServices(this.props.services) && (
                    <Link
                      className={classnames(
                        buttonStyles.buttonDark,
                        styles.backToAzureBox
                      )}
                      to={ROUTES.AZURE_LOGIN}
                      tabIndex={0}
                    >
                      {formatMessage(messages.backToAzurePage)}
                    </Link>
                  )}
                <ServicesSidebarItem services={this.props.services} />
              </div>
            )}
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
      </React.Fragment>
    );
  }
}

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

function convertOptionToDropdownItem(option: any): IDropDownOptionType {
  return {
    value: option.internalName,
    label: option.title
  };
}

const mapStateToProps = (state: AppState): IRightSidebarProps => ({
  outputPath: getOutputPath(state),
  projectName: getProjectName(state),
  selection: state.selection,
  projectTypeDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.projectTypes
  ),
  frontEndOptions: state.wizardContent.frontendOptions,
  pageCount: getPageCount(state),
  frontendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.frontendOptions
  ),
  backendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.backendOptions
  ),
  vscode: getVSCodeApiSelector(state),
  services: getServicesSelector(state),
  isRoutesVisited: getIsVisitedRoutesSelector(state),
  isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state),
  contentOptions: state.wizardContent
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectBackendFramework: (framework: ISelected) => {
    dispatch(selectBackendFrameworkAction(framework));
  },
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontEndFrameworkAction(framework));
  },
  selectProjectType: (projectType: ISelected) => {
    dispatch(selectWebAppAction(projectType));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
  },
  openViewLicensesModal: () => {
    dispatch(ModalActions.openViewLicensesModalAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(RightSidebar))
);
