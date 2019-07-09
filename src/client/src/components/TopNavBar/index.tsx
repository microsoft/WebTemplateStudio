import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { InjectedIntlProps, injectIntl, defineMessages } from "react-intl";

import TopNavBarLink from "../TopNavBarLink";

import styles from "./styles.module.css";

import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";
import { IRoutes } from "../../reducers/wizardRoutes/navigationReducer";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

const messages = defineMessages({
  welcome: {
    id: "topNavBar.newProject",
    defaultMessage: "New Project"
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
    id: "topNavBar.services",
    defaultMessage: "Add Optional Cloud Services"
  },
  summary: {
    id: "topNavBar.summary",
    defaultMessage: "Summary"
  },
  ariaNavLabel: {
    id: "topNavBar.ariaNavLabel",
    defaultMessage: "Navigate between pages in the Wizard"
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
    event: React.SyntheticEvent,
    idx: number,
    visited: boolean
  ) => {
    if (visited) {
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
              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.visitedPath]:
                      isVisited[ROUTES_ARRAY[idx]] && isValidNameAndProjectPath,
                    [styles.nextPath]:
                      idx > currentPathIndex &&
                      (!isVisited[ROUTES_ARRAY[idx]] ||
                        !isValidNameAndProjectPath),
                    [styles.itemBorderTop]: idx === 0
                  })}
                  key={sidebartitle}
                  onClick={event =>
                    topNavTabClicked(event, idx, isVisited[ROUTES_ARRAY[idx]])
                  }
                >
                  <TopNavBarLink
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
  isVisited: state.wizardRoutes.isVisited,
  isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
});

export default withRouter(connect(mapStateToProps)(injectIntl(TopNavBar)));
