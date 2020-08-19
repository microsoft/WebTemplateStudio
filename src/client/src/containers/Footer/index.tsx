import classnames from "classnames";
import * as React from "react";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants/constants";
import { ROUTE } from "../../utils/constants/routes";

import { IVSCodeObject } from "../../types/vscode";

import { openGenModalAction } from "../../store/navigation/modals/action";

import { InjectedIntlProps, injectIntl } from "react-intl";

import { isEnableNextPageSelector, isEnableGenerateButtonSelector, getSelectedRoute } from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../store/combineReducers";

import { ReactComponent as NextArrow } from "../../assets/nextarrow.svg";
import nextArrow from "../../assets/nextarrow.svg";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import { AppContext } from "../../AppContext";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { IRoutesNavItems } from "../../types/route";
import { setRoutesAction } from "../../store/navigation/routesNavItems/actions";
import { IOption } from "../../types/option";
import { setDetailPageAction } from "../../store/config/detailsPage/action";

type Props = InjectedIntlProps;

const Footer = (props: Props) => {
  const { formatMessage } = props.intl;

  const isEnableNextPage = useSelector((state: AppState) => isEnableNextPageSelector(state));
  const currentRoute = useSelector((state: AppState) => getSelectedRoute(state));
  const isEnableGenerateButton = useSelector((state: AppState) => isEnableGenerateButtonSelector(state));
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;
  const isFirstStep = useMemo(() => currentRoute === ROUTE.NEW_PROJECT, [currentRoute]);
  const isLastStep = useMemo(() => currentRoute === ROUTE.REVIEW_AND_GENERATE, [currentRoute]);
  const routesNavItems: IRoutesNavItems[] = useSelector((state: AppState) => state.navigation.routesNavItems);

  const dispatch = useDispatch();

  const trackPageForTelemetry = (pathname: string) => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_PAGE_SWITCH, {
      pageName: pathname,
    });
  };

  const generateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trackPageForTelemetry(currentRoute);
    dispatch(openGenModalAction());
  };

  const navigateBack = () => {
    trackPageForTelemetry(currentRoute);
    const currentIndex = routesNavItems.filter(route => route.route === currentRoute)[0].index;
    const newRoutesNavItems = routesNavItems.splice(0);
    newRoutesNavItems.forEach(route => route.isSelected=false);
    newRoutesNavItems.filter(route => route.index === currentIndex -1)[0].isSelected=true;
    newRoutesNavItems.filter(route => route.index === currentIndex -1)[0].wasVisited=true;
    const optionDetailPageBack: IOption = {title: "", internalName: "", body: "", svgUrl: ""};
    dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
    dispatch(setRoutesAction(newRoutesNavItems));
  };

  const navigateForward = () => {
    trackPageForTelemetry(currentRoute);
    const currentIndex = routesNavItems.filter(route => route.route === currentRoute)[0].index;
    const newRoutesNavItems = routesNavItems.splice(0);
    newRoutesNavItems.forEach(route => route.isSelected=false);
    newRoutesNavItems.filter(route => route.index === currentIndex +1)[0].isSelected=true;
    newRoutesNavItems.filter(route => route.index === currentIndex +1)[0].wasVisited=true;
    const optionDetailPageBack: IOption = {title: "", internalName: "", body: "", svgUrl: ""};
    dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
    dispatch(setRoutesAction(newRoutesNavItems));
  };

  const navigateForwardOnKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      navigateForward();
    }
  };

  const navigateBackOnKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      navigateBack();
    }
  };

  return (
    <nav aria-label={formatMessage(messages.navAriaLabel)}>
      {currentRoute !== ROUTE.PAGE_DETAILS && (
        <div className={styles.footer}>
          <div>{formatMessage(messages.license)}</div>
          <div className={styles.buttonContainer}>
              <a
                tabIndex={!isFirstStep ? 0 : -1}
                className={classnames(buttonStyles.buttonDark, styles.button, styles.buttonBack,
                  {
                    [styles.disabledOverlay]: isFirstStep || !isEnableGenerateButton
                  })}
                onClick={() => { if (!isFirstStep) navigateBack() }}
                onKeyPress={(event) => { if (!isFirstStep) navigateBackOnKeyPress(event) }}
                onKeyUp={(event: React.KeyboardEvent<HTMLAnchorElement>) => { if (!isFirstStep) keyUpHandler(event) }}
              >
                {formatMessage(messages.back)}
              </a>
              <a
                tabIndex={isEnableNextPage ? 0 : -1}
                className={classnames(styles.button, styles.buttonNext, buttonStyles.buttonHighlighted, {
                  [buttonStyles.buttonDark]: !isEnableNextPage,
                  [styles.disabledOverlay]: isLastStep || !isEnableNextPage || !isEnableGenerateButton
                })}
                onClick={() => { if (!isLastStep && isEnableNextPage) navigateForward()}}
                onKeyPress={(event) => { if (!isLastStep) navigateForwardOnKeyPress(event)}}
                onKeyUp={(event: React.KeyboardEvent<HTMLAnchorElement>) => { if (!isLastStep) keyUpHandler(event) }}
              >
                {formatMessage(messages.next)}
                {nextArrow && (
                  <NextArrow
                    className={classnames(styles.nextIcon, {
                      [styles.nextIconNotDisabled]: isEnableNextPage,
                    })}
                  />
                )}
              </a>
            <button
              disabled={!isEnableGenerateButton}
              className={classnames(styles.button, {
                [buttonStyles.buttonDark]: !isEnableGenerateButton,
                [buttonStyles.buttonHighlighted]: isEnableGenerateButton,
                [styles.disabledOverlay]: !isEnableGenerateButton,
              })}
              onClick={generateProject}
            >
              {formatMessage(messages.generate)}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default injectIntl(Footer);