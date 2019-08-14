import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { InjectedIntlProps, injectIntl, defineMessages } from "react-intl";

import TopNavBarLink from "../TopNavBarLink";

import styles from "./styles.module.css";

import { ROUTES_ARRAY } from "../../utils/constants";
import { IRoutes } from "../../reducers/wizardRoutes/navigationReducer";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

const messages = defineMessages({
  ariaNavLabel: {
    defaultMessage: "Navigate between pages in the Wizard",
    id: "topNavBar.ariaNavLabel"
  },
  frameworks: {
    id: "topNavBar.frameworks",
    defaultMessage: "Add Frameworks"
  },
  pages: {
    id: "topNavBar.pages",
    defaultMessage: "Add Pages"
  },
  services: {
    defaultMessage: "Add Optional Cloud Services",
    id: "topNavBar.services"
  },
  summary: {
    defaultMessage: "Summary",
    id: "topNavBar.summary"
  },
  welcome: {
    defaultMessage: "New Project",
    id: "topNavBar.newProject"
  }
});

interface IStateProps {
  isVisited: IRoutes;
  isValidNameAndProjectPath: boolean;
}

type Props = RouteComponentProps & IStateProps & InjectedIntlProps;

const TopNavBar = (props: Props) => {
  const { formatMessage } = props.intl;
  const topNavBarData: string[] = [
    formatMessage(messages.welcome),
    formatMessage(messages.frameworks),
    formatMessage(messages.pages),
    formatMessage(messages.services),
    formatMessage(messages.summary)
  ];
  const { pathname } = props.location;
  const [currentPathIndex, setPathIndex] = React.useState(
    ROUTES_ARRAY.indexOf(pathname)
  );
  const topNavTabClicked = (
    idx: number,
    visited: boolean,
    disabled: boolean
  ) => {
    if (visited && !disabled) {
      setPathIndex(ROUTES_ARRAY.indexOf(ROUTES_ARRAY[idx]));
    }
  };

  React.useEffect(() => {
    setPathIndex(ROUTES_ARRAY.indexOf(pathname));
  });
  const { isVisited, intl, isValidNameAndProjectPath } = props;
  return (
    <React.Fragment>
      {
        <nav
          className={classnames(styles.topNavBar)}
          aria-label={intl.formatMessage(messages.ariaNavLabel)}
        >
          <div>
            {topNavBarData.map((sidebartitle, idx) => {
              const alreadyVisitedRouteAndCanVisit =
                isVisited[ROUTES_ARRAY[idx]] && isValidNameAndProjectPath;
              const isOtherVisitedRoute =
                idx !== currentPathIndex && isVisited[ROUTES_ARRAY[idx]];

              const navTabClickedHandler = (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                event.preventDefault();
                topNavTabClicked(
                  idx,
                  isVisited[ROUTES_ARRAY[idx]],
                  !alreadyVisitedRouteAndCanVisit
                );
              };
              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.visitedPath]: alreadyVisitedRouteAndCanVisit,
                    [styles.nextPath]:
                      idx > currentPathIndex && !alreadyVisitedRouteAndCanVisit,
                    [styles.itemBorderTop]: idx === 0
                  })}
                  key={sidebartitle}
                  onClick={navTabClickedHandler}
                >
                  <TopNavBarLink
                    disabled={!alreadyVisitedRouteAndCanVisit}
                    path={ROUTES_ARRAY[idx]}
                    text={sidebartitle}
                    visitedCheck={isOtherVisitedRoute}
                    isSelected={idx === currentPathIndex}
                    pageNumber={idx + 1}
                  />
                </div>
              );
            })}
          </div>
        </nav>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state),
  isVisited: state.wizardRoutes.isVisited
});

export default withRouter(connect(mapStateToProps)(injectIntl(TopNavBar)));
