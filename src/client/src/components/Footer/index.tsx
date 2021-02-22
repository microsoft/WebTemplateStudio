import classnames from "classnames";
import React, { useMemo } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { AppContext } from "../../AppContext";
import buttonStyles from "../../css/button.module.css";
import { AppState } from "../../store/combineReducers";
import { setDetailPageAction } from "../../store/config/detailsPage/action";
import { openGenModalAction } from "../../store/navigation/modals/action";
import { setRoutesAction } from "../../store/navigation/routesNavItems/actions";
import {
  getSelectedRoute,
  isEnableGenerateButtonSelector,
  isEnableNextPageSelector,
} from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { IOption } from "../../types/option";
import { IRoutesNavItems } from "../../types/route";
import { IVSCodeObject } from "../../types/vscode";
import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { ROUTE } from "../../utils/constants/constants";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import messages from "./messages";
import styles from "./styles.module.css";

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
            <button
              tabIndex={isEnableNextPage ? 0 : -1}
              className={classnames(styles.button, styles.buttonNext, buttonStyles.buttonHighlighted, {
                [buttonStyles.buttonDark]: !isEnableNextPage,
                [styles.disabledOverlay]: isLastStep || !isEnableNextPage || !isEnableGenerateButton,
              })}
              onClick={() => {
                if (!isLastStep && isEnableNextPage && isEnableGenerateButton) navigateForward();
              }}
            >
              {formatMessage(messages.next)}
            </button>
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
