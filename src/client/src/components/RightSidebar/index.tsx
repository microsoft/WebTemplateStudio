import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import Dropdown from "../Dropdown";

import { selectFrontendFramework as selectFrontEndFrameworkAction } from "../../actions/selectFrontEndFramework";

import styles from "./styles.module.css";

// TODO: These constants are temporary and will migrate to the app state tree (redux store)
const webAppOptions = [
  {
    value: "Full Stack Web App",
    label: "Full Stack Web App"
  },
  {
    value: "RESTful API",
    label: "RESTful API"
  }
]
const frontEndOptions = [
  {
    value: "React",
    label: "React"
  },
  {
    value: "Vue.JS",
    label: "Vue.JS"
  },
  {
    value: "AngularJS",
    label: "AngularJS"
  }
]
const backEndOptions = [
  {
    value: "Node.JS",
    label: "Node.JS"
  },
  {
    value: "ASP.NET",
    label: "ASP.NET"
  }
]

interface IDropdownValue {
  value: string;
  label: string;
}

// TODO: Finalize types when API is hooked up
interface ISelectionType {
  appType: string;
  backendFramework: string;
  frontendFramework: string;
  pages: string[]
}

interface IDispatchProps {
  selectFrontendFramework: (framework: string) => void;
}

interface IRightSidebarProps {
  selection: ISelectionType;
}

type Props = IRightSidebarProps & RouteComponentProps & IDispatchProps;

class RightSidebar extends React.Component<Props> {
  public convertToDropdownObject = (selection: string): IDropdownValue => {
    return {
      value: selection,
      label: selection,
    }
  }
  public handleChange(e: IDropdownValue) {
    this.props.selectFrontendFramework(e.value);
  }
  public showWebApp = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/";
  }
  public showFrontEnd = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/" && pathname !== "/SelectWebApp";
  }
  public showBackEnd = (): boolean => {
    const { pathname } = this.props.location;
    return pathname !== "/" && pathname !== "/SelectWebApp" && pathname !== "/SelectFrontEnd"
  }
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Your Project Details</div>
        { this.showWebApp() && 
        <div className={styles.sidebarItem}>        
          <div className={styles.dropdownTitle}>
            Project Type
          </div>
          <Dropdown
            defaultValue={webAppOptions[0]}
            options={webAppOptions}
          />
        </div>
        }
        { this.showFrontEnd() && 
        <div className={styles.sidebarItem}>        
          <div className={styles.dropdownTitle}>
            Front-end Framework
          </div>
          <Dropdown
            handleChange={this.handleChange.bind(this)}
            defaultValue={this.convertToDropdownObject(this.props.selection.frontendFramework)}
            options={frontEndOptions}
          />
        </div>
        }
        { this.showBackEnd() && 
        <div className={styles.sidebarItem}>        
          <div className={styles.dropdownTitle}>
            Back-end Framework
          </div>
          <Dropdown
            defaultValue={backEndOptions[0]}
            options={backEndOptions}
          />
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any): IRightSidebarProps => {
  const { selection } = state;
  return {
    selection,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectFrontendFramework: (framework: string) => { dispatch(selectFrontEndFrameworkAction(framework)) }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSidebar));
