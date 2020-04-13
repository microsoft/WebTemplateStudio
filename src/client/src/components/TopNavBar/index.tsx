import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import TopNavBarLink from "../TopNavBarLink";

import styles from "./styles.module.css";

import { ROUTES_ARRAY } from "../../utils/constants";
import { IRoutes } from "../../store/userSelection/pages/model";
import { isEnableNextPageSelector } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import messages from "./messages";
import { setPageWizardPageAction } from "../../store/config/pages/action";

interface IStateProps {
  isVisited: IRoutes;
  isEnableNextPage: boolean;
  selectedRoute: string;
}

type Props = IStateProps & InjectedIntlProps;

const TopNavBar = (props: Props) => {
  const { formatMessage } = props.intl;
  const topNavBarData: string[] = [
    formatMessage(messages.welcome),
    formatMessage(messages.frameworks),
    formatMessage(messages.pages),
    formatMessage(messages.services),
    formatMessage(messages.summary)
  ];
  const selectedRoute  = props.selectedRoute;
  const [currentPathIndex, setPathIndex] = React.useState(
    ROUTES_ARRAY.indexOf(selectedRoute)
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
  const dispatch = useDispatch();

  React.useEffect(() => {
    const index = ROUTES_ARRAY.indexOf(selectedRoute);
    setPathIndex(index);
    const page = document.getElementById('page' + (index + 1));
    if (page)
    {
      page.focus();
    }
  }, [selectedRoute]);

  const { isVisited, intl, isEnableNextPage } = props;
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
                isVisited[ROUTES_ARRAY[idx]] && isEnableNextPage;
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
                    reducerSetPage={(page)=> dispatch(setPageWizardPageAction(page))}
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
  isEnableNextPage: isEnableNextPageSelector(state),
  isVisited: state.navigation.routes.isVisited,
  selectedRoute : state.navigation.routes.selected
});

export default connect(mapStateToProps)(injectIntl(TopNavBar));
