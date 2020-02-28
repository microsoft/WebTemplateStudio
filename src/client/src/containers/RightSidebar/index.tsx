import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import classnames from "classnames";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesList from "./ServicesList";
import About from "./About";
import SortablePageList from "./SortablePageList";

import { setSelectedBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectedBackEndFramework";
import { setSelectedFrontendFrameworkAction } from "../../actions/wizardSelectionActions/selectedFrontendFramework";
import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import {
  selectPagesAction, resetPagesAction
} from "../../actions/wizardSelectionActions/selectPages";
import * as ModalActions from "../../actions/modalActions/modalActions";

import { getServicesSelector, hasServicesSelector } from "../../selectors/servicesSelector";
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
  WIZARD_CONTENT_INTERNAL_NAMES,
  BOOTSTRAP_LICENSE
} from "../../utils/constants";
import messages from "./strings";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";

import { ISelected } from "../../types/selected";
import { AppState } from "../../reducers";
import { SelectionState } from "../../reducers/wizardSelectionReducers";
import RootAction from "../../actions/ActionType";
import { WizardContentType } from "../../reducers/wizardContentReducers";
import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import {
  getOutputPath,
  getProjectName
} from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { ServiceState } from "../../reducers/wizardSelectionReducers/services";
import { resetAllPages } from "../../utils/extensionService/extensionService";

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  openViewLicensesModal: () => any;
  resetPageSelection: () => any;
}

interface IRightSidebarProps {
  outputPath: string;
  projectName: string;
  selection: SelectionState;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontEndOptions: IOption[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: ServiceState;
  hasServices: boolean;
  vscode: IVSCodeObject;
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

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  public static defaultProps = {
    selectBackendFramework: () => void(0),
    selectFrontendFramework: () => void(0),
    selectWebApp: () => void(0),
    selectPages: () => void(0)
  };

  state: IRightSidebarState = {
    isSidebarOpen: false,
    isSidebarUserControlled: false
  };

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: IRightSidebarState
  ) {
    if (!prevState.isSidebarUserControlled) {
      return {
        isSidebarOpen:
          nextProps.selection.pages.length > 0 ||
          nextProps.hasServices ||
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
    const { vscode, resetPageSelection, selectPages } = this.props;
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

  public handleFrameworkChange = (option: IDropDownOptionType) => {
    const {
      frontendFramework,
      backendFramework,
      pages
    } = this.props.selection;
    const {
      vscode,
      selectPages,
      frontEndOptions,
      selectFrontendFramework
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
      showPages
    } = this.props.isRoutesVisited;
    const { pathname } = this.props.location;
    const {
      intl,
      contentOptions,
      openViewLicensesModal,
      outputPath,
      projectName,
      hasServices
    } = this.props;
    const { formatMessage } = intl;
    const { frontendOptions, backendOptions } = contentOptions;
    const { isSidebarOpen } = this.state;

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
              onClick={this.sidebarToggleClickHandler}
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
            role="complementary"
            className={classNames(styles.container, styles.rightViewCropped, {
              [styles.rightViewCroppedSummaryPage]:
                pathname === ROUTES.REVIEW_AND_GENERATE
            })}
          >
            <div className={styles.summaryContainer}>
              {pathname !== ROUTES.REVIEW_AND_GENERATE && (
                <Cancel
                  tabIndex={0}
                  className={styles.icon}
                  onClick={this.sidebarToggleClickHandler}
                  onKeyDown={this.cancelKeyDownHandler}
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
  frontendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.frontendOptions
  ),
  backendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.backendOptions
  ),
  vscode: getVSCodeApiSelector(state),
  services: getServicesSelector(state),
  hasServices : hasServicesSelector(state),
  isRoutesVisited: getIsVisitedRoutesSelector(state),
  contentOptions: state.wizardContent
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectBackendFramework: (framework: ISelected) => {
    dispatch(setSelectedBackendFrameworkAction(framework));
  },
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(setSelectedFrontendFrameworkAction(framework));
  },
  selectProjectType: (projectType: ISelected) => {
    dispatch(selectWebAppAction(projectType));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  openViewLicensesModal: () => {
    dispatch(ModalActions.openViewLicensesModalAction());
  },
  resetPageSelection: () => {
    dispatch(resetPagesAction());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(RightSidebar))
);
