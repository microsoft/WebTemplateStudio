import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { AppState } from "../../store/combineReducers";
import { AppContext } from "../../AppContext";

import keyUpHandler from "../../utils/keyUpHandler";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { ROUTE } from "../../utils/constants/constants";

import { IVSCodeObject } from "../../types/vscode";
import { IRoutesNavItems } from "../../types/route";
import { IOption } from "../../types/option";

import {
  isEnableNextPageSelector,
  isEnableGenerateButtonSelector,
  getSelectedRoute,
} from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { openGenModalAction } from "../../store/navigation/modals/action";
import { setRoutesAction } from "../../store/navigation/routesNavItems/actions";
import { setDetailPageAction } from "../../store/config/detailsPage/action";

import classnames from "classnames";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import messages from "./messages";

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
    const currentIndex = routesNavItems.filter((route) => route.route === currentRoute)[0].index;
    const newRoutesNavItems = routesNavItems.splice(0);
    newRoutesNavItems.forEach((route) => (route.isSelected = false));
    newRoutesNavItems.filter((route) => route.index === currentIndex - 1)[0].isSelected = true;
    newRoutesNavItems.filter((route) => route.index === currentIndex - 1)[0].wasVisited = true;
    const optionDetailPageBack: IOption = { title: "", internalName: "", body: "", icon: "" };
    dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
    dispatch(setRoutesAction(newRoutesNavItems));
  };

  const navigateForward = () => {
    trackPageForTelemetry(currentRoute);
    const currentIndex = routesNavItems.filter((route) => route.route === currentRoute)[0].index;
    const newRoutesNavItems = routesNavItems.splice(0);
    newRoutesNavItems.forEach((route) => (route.isSelected = false));
    newRoutesNavItems.filter((route) => route.index === currentIndex + 1)[0].isSelected = true;
    newRoutesNavItems.filter((route) => route.index === currentIndex + 1)[0].wasVisited = true;
    const optionDetailPageBack: IOption = { title: "", internalName: "", body: "", icon: "" };
    dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
    dispatch(setRoutesAction(newRoutesNavItems));
  };

  return (
    <nav aria-label={formatMessage(messages.navAriaLabel)}>
      {currentRoute !== ROUTE.PAGE_DETAILS && (
        <div className={styles.footer}>
          <div>{formatMessage(messages.license)}</div>
          <div className={styles.buttonContainer}>
            <button
              tabIndex={!isFirstStep ? 0 : -1}
              className={classnames(buttonStyles.buttonDark, {
                [styles.disabledOverlay]: isFirstStep || !isEnableGenerateButton,
              })}
              onClick={() => {
                if (!isFirstStep && isEnableGenerateButton) navigateBack();
              }}
            >
              {formatMessage(messages.back)}
            </button>
            <a
              tabIndex={isEnableNextPage ? 0 : -1}
              className={classnames(buttonStyles.buttonHighlighted, {
                [buttonStyles.buttonDark]: !isEnableNextPage,
                [styles.disabledOverlay]: isLastStep || !isEnableNextPage || !isEnableGenerateButton,
              })}
              onClick={() => {
                if (!isLastStep && isEnableNextPage && isEnableGenerateButton) navigateForward();
              }}
            >
              {formatMessage(messages.next)}
            </a>
            <button
              disabled={!isEnableGenerateButton}
              className={classnames({
                [buttonStyles.buttonDark]: !isEnableGenerateButton,
                [buttonStyles.buttonHighlighted]: isEnableGenerateButton,
                [styles.disabledOverlay]: !isEnableGenerateButton,
              })}
              onClick={(e) => {
                if (isEnableGenerateButton) generateProject(e);
              }}
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
