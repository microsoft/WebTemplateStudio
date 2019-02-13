import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import Dropdown from "../Dropdown";

import styles from "./styles.module.css";

// TODO: Options should come from redux state once fetching data from Core
const options = [
  {
    value: "Full Stack Web App",
    label: "Full Stack Web App"
  },
  {
    value: "RESTful API",
    label: "RESTful API"
  }
]

class RightSidebar extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Your Project Details</div>
        <div className={styles.sidebarItem}>        
          <div className={styles.dropdownTitle}>
            Project Type
          </div>
          <Dropdown
            defaultValue={options[0]}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(RightSidebar);
