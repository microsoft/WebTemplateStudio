import classnames from "classnames";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import TopNavBarLink from "../TopNavBarLink";

import styles from "./styles.module.css";

import { ROUTES_ARRAY } from "../../utils/constants";
import { isEnableNextPageSelector } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import messages from "./messages";
import { setPageWizardPageAction, setVisitedWizardPageAction } from "../../store/navigation/routes/action";
import { AppState } from "../../store/combineReducers";
import { setIsDirtyAction } from "../../store/navigation/isDirty/action";

type Props = InjectedIntlProps;

const TopNavBar = (props: Props) => {
  const isEnableNextPage = useSelector((state: AppState) => isEnableNextPageSelector(state));
  const isVisited = useSelector((state: AppState) => state.navigation.routes.isVisited);
  const selectedRoute = useSelector((state: AppState) => state.navigation.routes.selected);
  const projectNameValidation = useSelector((state: AppState) => state.userSelection.projectNameObject.validation);
  const { intl } = props;
  const { formatMessage } = props.intl;
  const topNavBarData: string[] = [
    formatMessage(messages.welcome),
    formatMessage(messages.frameworks),
    formatMessage(messages.pages),
    formatMessage(messages.services),
    formatMessage(messages.summary)
  ];
  const [currentPathIndex, setPathIndex] = React.useState(ROUTES_ARRAY.indexOf(selectedRoute));
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

  const navigateToPageAndSetVisited = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number
  ) => {
    event.preventDefault();
    setPathIndex(ROUTES_ARRAY.indexOf(ROUTES_ARRAY[idx]));
    for (let i=0; i<= idx; i++){
      const routeToSetVisited = ROUTES_ARRAY[i];
      dispatch(setVisitedWizardPageAction(routeToSetVisited));
    }
  };

 
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

              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.visitedPath]: alreadyVisitedRouteAndCanVisit,
                    [styles.itemBorderTop]: idx === 0
                  })}
                  key={sidebartitle}
                  onClick={(event) => {
                    if (projectNameValidation.isValid) navigateToPageAndSetVisited(event, idx) 
                  }}
                >
                  <TopNavBarLink
                    disabled={!projectNameValidation.isValid}
                    path={ROUTES_ARRAY[idx]}
                    text={sidebartitle}
                    visitedCheck={isOtherVisitedRoute}
                    isSelected={idx === currentPathIndex}
                    pageNumber={idx + 1}
                    reducerSetPage={(page)=> {
                      dispatch(setPageWizardPageAction(page));
                      dispatch(setIsDirtyAction(true));
                    }}
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

export default (injectIntl(TopNavBar));
