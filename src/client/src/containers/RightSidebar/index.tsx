import classNames from "classnames";
import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesSidebarItem from "../../components/ServicesSidebarItem";
import Licenses from "../Licenses";
import About from "../About";
import SortablePageList from "../SortablePageList";

import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";

import { getServicesSelector } from "../../selectors/cosmosServiceSelector";
import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";

import styles from "./styles.module.css";
import { ROUTES } from "../../utils/constants";
import messages from "./strings";

import { ISelected } from "../../types/selected";
import { AppState } from "../../reducers";
import { SelectionState } from "../../reducers/wizardSelectionReducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import { WizardContentType } from "../../reducers/wizardContentReducers";
import { IOption } from "../../types/option";

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
}

interface IRightSidebarProps {
  selection: SelectionState;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: any;
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
      showProjectTypes,
      showServices
    } = this.props.isRoutesVisited;
    const { pathname } = this.props.location;
    const { intl, contentOptions } = this.props;
    const { formatMessage } = intl;
    const { frontendOptions, backendOptions, projectTypes } = contentOptions;
    return (
      <React.Fragment>
        {pathname !== ROUTES.PAGE_DETAILS && (
          <div
            className={classNames(styles.container, styles.rightViewCropped)}
          >
            {pathname !== ROUTES.REVIEW_AND_GENERATE && (
              <div>
                <div className={styles.title}>
                  {formatMessage(messages.yourProjectDetails)}
                </div>
                <RightSidebarDropdown
                  options={this.props.projectTypeDropdownItems}
                  handleDropdownChange={this.handleChange.bind(this)}
                  optionsData={projectTypes}
                  selectDropdownOption={this.props.selectProjectType}
                  isVisible={showProjectTypes}
                  title={formatMessage(messages.projectType)}
                  value={this.convertOptionToDropdownItem(
                    this.props.selection.appType
                  )}
                />
                <RightSidebarDropdown
                  options={this.props.frontendDropdownItems}
                  handleDropdownChange={this.handleChange.bind(this)}
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
                  handleDropdownChange={this.handleChange.bind(this)}
                  selectDropdownOption={this.props.selectBackendFramework}
                  isVisible={showFrameworks}
                  title={formatMessage(messages.backendFramework)}
                  value={this.convertOptionToDropdownItem(
                    this.props.selection.backendFramework
                  )}
                  optionsData={backendOptions}
                />
                {showPages && <SortablePageList />}
                {showServices && (
                  <div className={styles.sidebarItem}>
                    <div className={styles.dropdownTitle}>
                      {formatMessage(messages.services)}
                    </div>
                    <ServicesSidebarItem services={this.props.services} />
                  </div>
                )}
              </div>
            )}
            <div>
              <Licenses />
              <About />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
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
  services: getServicesSelector(state),
  isRoutesVisited: getIsVisitedRoutesSelector(state),
  contentOptions: state.wizardContent
});

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

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(RightSidebar))
);
