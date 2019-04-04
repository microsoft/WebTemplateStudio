import classNames from "classnames";
import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import RightSidebarDropdown from "../../components/RightSidebarDropdown";
import ServicesSidebarItem from "../../components/ServicesSidebarItem";

import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/selectWebApp";

import { getServicesSelector } from "../../selectors/cosmosServiceSelector";
import { getIsVisitedRoutesSelector } from "../../selectors/wizardNavigationSelector";

import { ROUTES } from "../../utils/constants";

import { selectPagesAction } from "../../actions/selectPages";
import { ISelected } from "../../types/selected";
import SortablePageList from "../SortablePageList";
import styles from "./styles.module.css";
import Licenses from "../Licenses";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";

interface ISelectionType {
  appType: ISelected;
  backendFramework: ISelected;
  frontendFramework: ISelected;
  pages: ISelected[];
}

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
}

interface IRightSidebarProps {
  selection: ISelectionType;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: any;
  isRoutesVisited: any;
}

interface IRightSidebarState {
  frontendDropdownValue?: ISelected | undefined;
  items: string[];
}

type Props = IRightSidebarProps &
  RouteComponentProps &
  IDispatchProps &
  InjectedIntlProps;

const messages = defineMessages({
  yourProjectDetails: {
    id: "rightSidebar.yourProjectDetails",
    defaultMessage: "Your Project Details"
  },
  projectType: {
    id: "rightSidebar.projectType",
    defaultMessage: "Project Type"
  },
  frontendFramework: {
    id: "rightSidebar.frontendFramework",
    defaultMessage: "Front-end Framework"
  },
  backendFramework: {
    id: "rightSidebar.backendFramework",
    defaultMessage: "Back-end Framework"
  },
  services: {
    id: "rightSidebar.services",
    defaultMessage: "Services"
  }
});

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  public static defaultProps = {
    selectBackendFramework: () => {},
    selectFrontendFramework: () => {},
    selectWebApp: () => {},
    selectPages: () => {}
  };
  public handleChange(
    e: IDropDownOptionType,
    selectOption: (item: ISelected) => void
  ) {
    selectOption({
      title: e.label,
      internalName: e.value
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
    return {
      value: option.internalName,
      label: option.title
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
    const { intl } = this.props;
    return (
      <React.Fragment>
        {pathname !== ROUTES.PAGE_DETAILS &&
          pathname !== ROUTES.REVIEW_AND_GENERATE && (
            <div
              className={classNames(styles.container, {
                [styles.rightView]: pathname === ROUTES.WELCOME,
                [styles.rightViewCropped]: pathname !== ROUTES.WELCOME
              })}
            >
              <div className={styles.title}>
                {intl.formatMessage(messages.yourProjectDetails)}
              </div>
              <RightSidebarDropdown
                options={this.props.projectTypeDropdownItems}
                handleDropdownChange={this.handleChange.bind(this)}
                selectDropdownOption={this.props.selectProjectType}
                isVisible={showProjectTypes}
                title={intl.formatMessage(messages.projectType)}
                value={this.convertOptionToDropdownItem(
                  this.props.selection.appType
                )}
              />
              <RightSidebarDropdown
                options={this.props.frontendDropdownItems}
                handleDropdownChange={this.handleChange.bind(this)}
                selectDropdownOption={this.props.selectFrontendFramework}
                isVisible={showFrameworks}
                title={intl.formatMessage(messages.frontendFramework)}
                value={this.convertOptionToDropdownItem(
                  this.props.selection.frontendFramework
                )}
              />
              <RightSidebarDropdown
                options={this.props.backendDropdownItems}
                handleDropdownChange={this.handleChange.bind(this)}
                selectDropdownOption={this.props.selectBackendFramework}
                isVisible={showFrameworks}
                title={intl.formatMessage(messages.backendFramework)}
                value={this.convertOptionToDropdownItem(
                  this.props.selection.backendFramework
                )}
              />
              {showPages && <SortablePageList />}
              {showServices && (
                <div className={styles.sidebarItem}>
                  <div className={styles.dropdownTitle}>
                    {intl.formatMessage(messages.services)}
                  </div>
                  <ServicesSidebarItem services={this.props.services} />
                </div>
              )}
              <Licenses />
            </div>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any): IRightSidebarProps => ({
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
  isRoutesVisited: getIsVisitedRoutesSelector(state)
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

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
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
