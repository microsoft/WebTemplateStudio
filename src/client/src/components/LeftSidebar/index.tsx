import classnames from "classnames";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LeftSidebarLink from "../LeftSidebarLink";

import styles from "./styles.module.css";

import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";

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
  const isVisitedPath = (idx: number): boolean => {
    return idx < currentPathIndex;
  }
  return (
    <React.Fragment>
      {pathname !== ROUTES.PAGE_DETAILS && 
      <div className={classnames(styles.leftView, styles.container)}>
        {props.sidebarItems.map((sidebartitle, idx) => {
          return (
            <div className={
              classnames(styles.itemBorder, { 
                [styles.currentPath]: idx === currentPathIndex, 
                [styles.visitedPath]: isVisitedPath(idx),
                [styles.nextPath]: idx > currentPathIndex,
                [styles.itemBorderTop]: idx === 0,
              })} key={`${sidebartitle}`}>
              <LeftSidebarLink disabled={!isVisitedPath(idx)} path={ROUTES_ARRAY[idx]} text={sidebartitle} showCheck={isVisitedPath(idx)}/>
            </div>
            )})}
      </div>}
    </React.Fragment>
  );
};

export default withRouter(connect()(LeftSidebar));
