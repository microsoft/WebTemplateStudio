import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import {
  InjectedIntlProps,
  injectIntl,
  defineMessages
} from "react-intl";

import LeftSidebarLink from "../LeftSidebarLink";

import styles from "./styles.module.css";

import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";
import { IRoutes } from "../../reducers/wizardRoutes/navigationReducer";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

const messages = defineMessages({
  welcome: {
    id: "leftSidebar.newProject",
    defaultMessage: "1. New Project"
  },
  projectType: {
    id: "leftSidebar.projectType",
    defaultMessage: "2. Project Type"
  },
  frameworks: {
    id: "leftSidebar.frameworks",
    defaultMessage: "3. Frameworks"
  },
  pages: {
    id: "leftSidebar.pages",
    defaultMessage: "4. Pages"
  },
  services: {
    id: "leftSidebar.services",
    defaultMessage: "5. Services (Optional)"
  },
  summary: {
    id: "leftSidebar.summary",
    defaultMessage: "6. Summary"
  },
  ariaNavLabel: {
    id: "leftSideBar.ariaNavLabel",
    defaultMessage: "Navigate between pages in the Wizard"
  }
});

interface IStateProps {
  isVisited: IRoutes;
  isValidNameAndProjectPath: boolean;
}

type Props = RouteComponentProps & IStateProps & InjectedIntlProps;

const LeftSidebar = (props: Props) => {
  const { formatMessage } = props.intl;
  const leftSidebarData: string[] = [
    formatMessage(messages.welcome),
    formatMessage(messages.projectType),
    formatMessage(messages.frameworks),
    formatMessage(messages.pages),
    formatMessage(messages.services),
    formatMessage(messages.summary)
  ];
  const { pathname } = props.location;
  const [currentPathIndex, setPathIndex] = React.useState(
    ROUTES_ARRAY.indexOf(pathname)
  );
  React.useEffect(() => {
    setPathIndex(ROUTES_ARRAY.indexOf(pathname));
  });
  const { isVisited, intl, isValidNameAndProjectPath } = props;
  return (
    <React.Fragment>
      {pathname !== ROUTES.PAGE_DETAILS && (
        <nav
          className={classnames(styles.leftView, styles.container)}
          aria-label={intl.formatMessage(messages.ariaNavLabel)}
        >
          <div>
            {leftSidebarData.map((sidebartitle, idx) => {
              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.currentPath]: idx === currentPathIndex,
                    [styles.visitedPath]:
                      isVisited[ROUTES_ARRAY[idx]] && isValidNameAndProjectPath,
                    [styles.nextPath]:
                      idx > currentPathIndex &&
                      (!isVisited[ROUTES_ARRAY[idx]] ||
                        !isValidNameAndProjectPath),
                    [styles.itemBorderTop]: idx === 0
                  })}
                  key={sidebartitle}
                >
                  <LeftSidebarLink
                    disabled={
                      !isVisited[ROUTES_ARRAY[idx]] ||
                      !isValidNameAndProjectPath
                    }
                    path={ROUTES_ARRAY[idx]}
                    text={sidebartitle}
                    visitedCheck={
                      idx !== currentPathIndex && isVisited[ROUTES_ARRAY[idx]]
                    }
                    isSelected={idx === currentPathIndex}
                  />
                </div>
              );
            })}
          </div>
        </nav>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isVisited: state.wizardRoutes.isVisited,
  isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
});

export default withRouter(connect(mapStateToProps)(injectIntl(LeftSidebar)));
