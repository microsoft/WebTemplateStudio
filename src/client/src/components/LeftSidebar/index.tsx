import classnames from "classnames";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LeftSidebarLink from "../LeftSidebarLink";

import styles from "./styles.module.css";

import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";
import leftSidebarData from "../../mockData/leftSidebarData";

interface IStateProps {
  isVisited: { [key: string]: boolean };
}

type Props = RouteComponentProps & IStateProps;

const LeftSidebar = (props: Props) => {
  const { pathname } = props.location;
  const [currentPathIndex, setPathIndex] = React.useState(
    ROUTES_ARRAY.indexOf(pathname)
  );
  React.useEffect(() => {
    setPathIndex(ROUTES_ARRAY.indexOf(pathname));
  });
  const { isVisited } = props;
  return (
    <React.Fragment>
      {pathname !== ROUTES.PAGE_DETAILS && (
        <div className={classnames(styles.leftView, styles.container)}>
          {leftSidebarData.map((sidebartitle, idx) => {
            return (
              <div
                className={classnames(styles.itemBorder, {
                  [styles.currentPath]: idx === currentPathIndex,
                  [styles.visitedPath]: isVisited[ROUTES_ARRAY[idx]],
                  [styles.nextPath]:
                    idx > currentPathIndex && !isVisited[ROUTES_ARRAY[idx]],
                  [styles.itemBorderTop]: idx === 0
                })}
                key={`${sidebartitle}`}
              >
                <LeftSidebarLink
                  disabled={!isVisited[ROUTES_ARRAY[idx]]}
                  path={ROUTES_ARRAY[idx]}
                  text={sidebartitle}
                  showCheck={
                    idx !== currentPathIndex && isVisited[ROUTES_ARRAY[idx]]
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isVisited: state.wizardRoutes.isVisited
});

export default withRouter(connect(mapStateToProps)(LeftSidebar));
