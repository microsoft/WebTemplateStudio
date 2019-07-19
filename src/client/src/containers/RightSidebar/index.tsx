import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import classnames from "classnames";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesSidebarItem from "../../components/ServicesSidebarItem";
import About from "../About";
import SortablePageList from "../SortablePageList";

import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";
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
  PAYLOAD_MESSAGES_TEXT
} from "../../utils/constants";
import messages from "./strings";

import { ISelected } from "../../types/selected";
import { AppState } from "../../reducers";
import { SelectionState } from "../../reducers/wizardSelectionReducers";
import RootAction from "../../actions/ActionType";
import { WizardContentType } from "../../reducers/wizardContentReducers";
import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  openViewLicensesModal: () => any;
}

interface IRightSidebarProps {
  selection: SelectionState;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: any;
  vscode: IVSCodeObject;
  isValidNameAndProjectPath: boolean;
  isRoutesVisited: IVisitedPages;
  contentOptions: WizardContentType;
}

interface IRightSidebarState {
  frontendDropdownValue?: ISelected | undefined;
  items: string[];
}

type Props = IRightSidebarProps &
  RouteComponentProps &
  IDispatchProps &
  InjectedIntlProps;

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  public static defaultProps = {
    selectBackendFramework: () => {},
    selectFrontendFramework: () => {},
    selectWebApp: () => {},
    selectPages: () => {}
  };
  public handleChange(
    e: IDropDownOptionType,
    selectOption: (item: ISelected) => void,
    optionsData: IOption[]
  ) {
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
  }
  public resetAllPages() {
    const { pages, frontendFramework } = this.props.selection;
    const { vscode, intl } = this.props;
    vscode.postMessage({
      module: EXTENSION_MODULES.VSCODEUI,
      command: EXTENSION_COMMANDS.RESET_PAGES,
      track: false,
      text: intl.formatMessage(PAYLOAD_MESSAGES_TEXT.RESET_PAGES_TEXT),
      payload: {
        internalName: frontendFramework.internalName,
        pagesLength: pages.length
      }
    });
  }

  public handleFrameworkChange(option: IDropDownOptionType) {
    const { frontendFramework, pages } = this.props.selection;
    const { vscode, intl } = this.props;
    if (frontendFramework.internalName !== option.value) {
      vscode.postMessage({
        module: EXTENSION_MODULES.VSCODEUI,
        command: EXTENSION_COMMANDS.RESET_PAGES,
        track: false,
        text: intl.formatMessage(PAYLOAD_MESSAGES_TEXT.SWITCH_FRAMEWORKS_TEXT),
        payload: {
          internalName: option.value,
          pagesLength: pages.length
        }
      });
    }
  }

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
      openViewLicensesModal
    } = this.props;
    const { formatMessage } = intl;
    const { frontendOptions, backendOptions } = contentOptions;

    return (
      <React.Fragment>
        {pathname !== ROUTES.PAGE_DETAILS && pathname !== ROUTES.NEW_PROJECT && (
          <div
            role="complementary"
            className={classNames(styles.container, styles.rightViewCropped, {
              [styles.rightViewCroppedAllPages]:
                pathname !== ROUTES.REVIEW_AND_GENERATE,
              [styles.rightViewCroppedSummaryPage]:
                pathname === ROUTES.REVIEW_AND_GENERATE
            })}
          >
            {
              <div className={styles.summaryContainer}>
                <div className={styles.title}>
                  {formatMessage(messages.yourProjectDetails)}
                </div>
                <RightSidebarDropdown
                  options={this.props.frontendDropdownItems}
                  handleDropdownChange={
                    (showPages && this.handleFrameworkChange.bind(this)) ||
                    this.handleChange.bind(this)
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
                  handleDropdownChange={this.handleChange.bind(this)}
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
                      handleResetPages={this.resetAllPages.bind(this)}
                    />
                  )}
                </div>
                {showServices && (
                  <div className={styles.sidebarItem}>
                    <div className={styles.dropdownTitle}>
                      {formatMessage(messages.services)}
                    </div>
                    <ServicesSidebarItem services={this.props.services} />
                  </div>
                )}
              </div>
            }
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
        )}
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
  selection: state.selection,
  projectTypeDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.projectTypes
  ),
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
