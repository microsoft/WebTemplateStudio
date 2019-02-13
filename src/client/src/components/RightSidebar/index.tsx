import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import Dropdown from "../Dropdown";

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
class RightSidebar extends React.Component<RouteComponentProps> {
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
    const { pathname } = this.props.location;
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
            defaultValue={frontEndOptions[0]}
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

export default withRouter(RightSidebar);
