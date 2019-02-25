import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";
import RightSidebarDropdown from "../../components/RightSidebarDropdown";

import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/selectWebApp";

import { getServicesSelector } from "../../selectors/cosmosServiceSelector";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";

// TODO: Finalize types when API is hooked up
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
}

interface IRightSidebarProps {
  selection: ISelectionType;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: any;
}

interface IRightSidebarState {
  frontendDropdownValue: ISelected | undefined;
}

type Props = IRightSidebarProps & RouteComponentProps & IDispatchProps;

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  public static defaultProps = {
    selectBackendFramework: () => {},
    selectFrontendFramework: () => {},
    selectWebApp: () => {}
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
  public showProjectTypes = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/";
  };
  public showFrameworks = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/" && pathname !== "/SelectWebApp";
  };
  public showPages = (): boolean => {
    const { pathname } = this.props.location;
    return (
      pathname !== "/" &&
      pathname !== "/SelectWebApp" &&
      pathname !== "/SelectFrameworks"
    );
  };
  public showServices = (): boolean => {
    const { pathname } = this.props.location;
    return (
      pathname !== "/" &&
      pathname !== "/SelectWebApp" &&
      pathname !== "/SelectFrameworks" &&
      pathname !== "/SelectPages"
    );
  };
  public convertOptionToDropdownItem(option: ISelected): IDropDownOptionType {
    return {
      value: option.internalName,
      label: option.title
    };
  }
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Your Project Details</div>
        <RightSidebarDropdown
          options={this.props.projectTypeDropdownItems}
          handleDropdownChange={this.handleChange.bind(this)}
          selectDropdownOption={this.props.selectProjectType}
          isVisible={this.showProjectTypes()}
          title="Project Type"
          value={this.convertOptionToDropdownItem(this.props.selection.appType)}
        />
        <RightSidebarDropdown
          options={this.props.frontendDropdownItems}
          handleDropdownChange={this.handleChange.bind(this)}
          selectDropdownOption={this.props.selectFrontendFramework}
          isVisible={this.showFrameworks()}
          title="Front-end Framework"
          value={this.convertOptionToDropdownItem(
            this.props.selection.frontendFramework
          )}
        />
        <RightSidebarDropdown
          options={this.props.backendDropdownItems}
          handleDropdownChange={this.handleChange.bind(this)}
          selectDropdownOption={this.props.selectBackendFramework}
          isVisible={this.showFrameworks()}
          title="Back-end Framework"
          value={this.convertOptionToDropdownItem(
            this.props.selection.backendFramework
          )}
        />
        {this.showPages() && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Pages</div>
            {this.props.selection.pages.map(page => (
              <DraggableSidebarItem
                text={page.title}
                closeSvgUrl={`${process.env.REACT_APP_RELATIVE_PATH}${cancel}`}
                reorderSvgUrl={`${
                  process.env.REACT_APP_RELATIVE_PATH
                }${reorder}`}
              />
            ))}
          </div>
        )}
        {this.showServices() && !!this.props.services && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Services</div>
            {Object.keys(this.props.services).map(serviceName => (
              <DraggableSidebarItem
                text={this.props.services[serviceName].api}
                closeSvgUrl={`${process.env.REACT_APP_RELATIVE_PATH}${cancel}`}
                itemTitle={
                  serviceName === "cosmosOptions"
                    ? "CosmosDB"
                    : "Azure Functions"
                }
              />
            ))}
            {/*FIXME: service options assume only CosmosDB and Azure Functions for now*/}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): IRightSidebarProps => {
  // FIXME: Change this to selectors
  const { selection } = state;
  const { backendOptions, frontendOptions, projectTypes } = state.wizardContent;
  const projectTypeDropdownItems = convertOptionsToDropdownItems(projectTypes);
  const frontendDropdownItems = convertOptionsToDropdownItems(frontendOptions);
  const backendDropdownItems = convertOptionsToDropdownItems(backendOptions);

  return {
    selection,
    projectTypeDropdownItems,
    frontendDropdownItems,
    backendDropdownItems,
    services: getServicesSelector(state)
  };
};

function convertOptionsToDropdownItems(options: any[]): IDropDownOptionType[] {
  const dropDownItems = [];

  for (const option of options) {
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RightSidebar)
);
