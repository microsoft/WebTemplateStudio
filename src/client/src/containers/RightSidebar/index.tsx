import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";
import Dropdown from "../../components/Dropdown";

import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";
import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/selectFrontEndFramework";
import { selectWebAppAction } from "../../actions/selectWebApp";

import cancel from "../../assets/Cancel.svg";
import reorder from "../../assets/Reorder.svg";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";
import { IOption } from "../../types/option";
import projectTypes from "../../reducers/wizardContentReducers/projectTypeReducer";
import frontendFrameworkOptions from "../../reducers/wizardContentReducers/frontendFrameworkReducer";

// TODO: Finalize types when API is hooked up
interface ISelectionType {
  appType: ISelected;
  backendFramework: ISelected;
  frontendFramework: ISelected;
  pages: string[];
}

interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectWebApp: (projectType: ISelected) => void;
}

interface IRightSidebarProps {
  selection: ISelectionType;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
}

interface IRightSidebarState {
  frontendDropdownValue: ISelected | undefined;
}

type Props = IRightSidebarProps & RouteComponentProps & IDispatchProps;

class RightSidebar extends React.Component<Props, IRightSidebarState> {
  static defaultProps = {
    selectBackendFramework: () => {},
    selectFrontendFramework: () => {},
    selectWebApp: () => {}
  };
  // public convertToDropdownObject = (selection: string): ISelected => {
  //   return {
  //     value: selection,
  //     label: selection
  //   };
  // };
  public handleChange(
    e: IDropDownOptionType,
    selectOption: (item: ISelected) => void
  ) {
    console.log(selectOption);
    selectOption({
      title: e.label,
      internalName: e.value
    });
  }
  public showWebApp = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/";
  };
  public showFrontEnd = (): boolean => {
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
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Your Project Details</div>
        {this.showWebApp() && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Project Type</div>
            <Dropdown
              handleChange={dropDrownItem => {
                this.handleChange(dropDrownItem, this.props.selectWebApp);
              }}
              options={this.props.projectTypeDropdownItems}
            />
          </div>
        )}
        {this.showFrontEnd() && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Front-end Framework</div>
            <Dropdown
              handleChange={dropDrownItem => {
                this.handleChange(
                  dropDrownItem,
                  this.props.selectFrontendFramework
                );
              }}
              options={this.props.frontendDropdownItems}
            />
          </div>
        )}
        {this.showFrontEnd() && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Back-end Framework</div>
            <Dropdown
              handleChange={dropDrownItem => {
                this.handleChange(
                  dropDrownItem,
                  this.props.selectBackendFramework
                );
              }}
              options={this.props.backendDropdownItems}
              //value={this.props.selection.backendFramework}
            />
          </div>
        )}
        {this.showPages() && (
          <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Pages</div>
            {this.props.selection.pages.map(page => (
              <DraggableSidebarItem
                text={page}
                closeSvgUrl={`${process.env.REACT_APP_RELATIVE_PATH}${cancel}`}
                reorderSvgUrl={`${
                  process.env.REACT_APP_RELATIVE_PATH
                }${reorder}`}
              />
            ))}
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
    backendDropdownItems
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
  selectWebApp: (projectType: ISelected) => {
    dispatch(selectWebAppAction(projectType));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RightSidebar)
);
