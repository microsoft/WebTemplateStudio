import classnames from "classnames";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import SidebarItem from "../SidebarItem";

import styles from "./styles.module.css";

import { ROUTES_ARRAY } from "../../utils/constants";

interface IProps {
  sidebarItems: string[];
}

type Props = IProps & RouteComponentProps;

const LeftSidebar = (props: Props) => {
  const { pathname } = props.location;
  const [ currentPathIndex, setPathIndex ] = React.useState(ROUTES_ARRAY.indexOf(pathname));
  React.useEffect(() => {
    setPathIndex(ROUTES_ARRAY.indexOf(pathname));
  });
  return (
    <div className={styles.container}>
      {props.sidebarItems.map((sidebartitle, idx) => {
        return (
          <div className={
            classnames(styles.itemBorder, { 
              [styles.currentPath]: idx === currentPathIndex, 
              [styles.visitedPath]: idx < currentPathIndex,
              [styles.nextPath]: idx > currentPathIndex,
              [styles.itemBorderTop]: idx === 0,
            })} key={`${sidebartitle}`}>
            <SidebarItem text={sidebartitle} />
          </div>
          )})}
    </div>
  );
};

export default withRouter(LeftSidebar);
