import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import {
  InjectedIntlProps,
  injectIntl,
  defineMessages,
  FormattedMessage
} from "react-intl";

import LeftSidebarLink from "../LeftSidebarLink";

import styles from "./styles.module.css";

import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";

const messages = defineMessages({
  welcome: {
    id: "leftSidebar.welcome",
    defaultMessage: "1. Welcome"
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
  }
});

interface IStateProps {
  isVisited: { [key: string]: boolean };
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
  const { isVisited } = props;
  return (
    <React.Fragment>
      {pathname !== ROUTES.PAGE_DETAILS && (
        <div className={classnames(styles.leftView, styles.container)}>
          <div>
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
                  key={sidebartitle}
                >
                  <LeftSidebarLink
                    disabled={!isVisited[ROUTES_ARRAY[idx]]}
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
          <a href="https://aka.ms/give-feedback" className={styles.feedback}>
            <FormattedMessage
              id="leftSidebar.giveFeedback"
              defaultMessage="Give Feedback"
            />
          </a>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isVisited: state.wizardRoutes.isVisited
});

export default withRouter(connect(mapStateToProps)(injectIntl(LeftSidebar)));
