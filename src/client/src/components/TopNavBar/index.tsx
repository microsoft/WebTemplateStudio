import classnames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store/combineReducers";
import { setDetailPageAction } from "../../store/config/detailsPage/action";
import { setRoutesAction } from "../../store/navigation/routesNavItems/actions";
import {
  getSelectedRoute,
  isEnableNextPageSelector,
} from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { IOption } from "../../types/option";
import { IRoutesNavItems } from "../../types/route";
import TopNavBarLink from "../TopNavBarLink";
import messages from "./messages";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const TopNavBar = (props: Props) => {
  const isEnableNextPage = useSelector((state: AppState) => isEnableNextPageSelector(state));
  const selectedRoute = useSelector((state: AppState) => getSelectedRoute(state));
  const projectNameValidation = useSelector((state: AppState) => state.userSelection.projectNameObject.validation);
  const routesNavItems: IRoutesNavItems[] = useSelector((state: AppState) => state.navigation.routesNavItems);
  const { intl } = props;
  const { formatMessage } = props.intl;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (selectedRoute && routesNavItems.length > 0) {
      const index = routesNavItems.filter((route) => route.route === selectedRoute)[0].index;
      const page = document.getElementById("page" + (index + 1));
      if (page) page.focus();
    }
  }, [selectedRoute]);

  const navigateToPageAndSetVisited = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: IRoutesNavItems) => {
    event.preventDefault();
    const newRoutesNavItems = routesNavItems.splice(0);
    for (let i = 0; i <= item.index; i++) {
      if (i < item.index) newRoutesNavItems[i].isSelected = false;
      if (i === item.index) newRoutesNavItems[i].isSelected = true;
      newRoutesNavItems[i].wasVisited = true;
    }
    dispatch(setRoutesAction(newRoutesNavItems));
  };

  return (
    <React.Fragment>
      {
        <nav className={classnames(styles.topNavBar)} aria-label={intl.formatMessage(messages.ariaNavLabel)}>
          <div>
            {routesNavItems.map((item, idx) => {
              const alreadyVisitedRouteAndCanVisit = item.wasVisited && isEnableNextPage;
              const isOtherVisitedRoute = item.route !== selectedRoute && item.wasVisited;

              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.visitedPath]: alreadyVisitedRouteAndCanVisit,
                    [styles.itemBorderTop]: idx === 0,
                  })}
                  key={formatMessage(item.messageDescriptor)}
                  onClick={(event) => {
                    if (projectNameValidation.isValid) {
                      navigateToPageAndSetVisited(event, item);
                      const optionDetailPageBack: IOption = {
                        title: "",
                        internalName: "",
                        body: "",
                        icon: "",
                      };
                      dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
                    }
                  }}
                >
                  <TopNavBarLink
                    disabled={!projectNameValidation.isValid}
                    path={item.route}
                    text={formatMessage(item.messageDescriptor)}
                    visitedCheck={isOtherVisitedRoute}
                    isSelected={item.isSelected}
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

export default injectIntl(TopNavBar);
