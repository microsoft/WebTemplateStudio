import classnames from "classnames";
import * as React from "react";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import {
  ROUTES,
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  PAYLOAD_MESSAGES_TEXT,
  KEY_EVENTS,
} from "../../utils/constants";

import { IVSCodeObject } from "../../types/vscode";

import { rootSelector } from "../../store/selection/app/selector";
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector,
} from "../../store/azureProfileData/cosmosDb/selector";
import {
  isAppServiceSelectedSelector,
  getAppServiceSelectionSelector,
} from "../../store/azureProfileData/appService/selector";

import { openPostGenModalAction } from "../../store/modals/action";

import { InjectedIntlProps, injectIntl } from "react-intl";

import { getIsVisitedRoutesSelector } from "../../store/wizardContent/wizardContent/wizardNavigationSelector";
import { isEnableNextPageSelector } from "../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../store/combineReducers";

import { ReactComponent as NextArrow } from "../../assets/nextarrow.svg";
import nextArrow from "../../assets/nextarrow.svg";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import { setVisitedWizardPageAction, setPageWizardPageAction } from "../../store/wizardContent/pages/action";
import { AppContext } from "../../AppContext";
import { useSelector, useDispatch } from "react-redux";

type Props = InjectedIntlProps;

const pathsNext: any = {
  [ROUTES.NEW_PROJECT]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.SELECT_PAGES,
  [ROUTES.SELECT_PAGES]: ROUTES.AZURE_LOGIN,
  [ROUTES.AZURE_LOGIN]: ROUTES.REVIEW_AND_GENERATE,
};
const pathsBack: any = {
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.NEW_PROJECT,
  [ROUTES.SELECT_PAGES]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.AZURE_LOGIN]: ROUTES.SELECT_PAGES,
  [ROUTES.REVIEW_AND_GENERATE]: ROUTES.AZURE_LOGIN,
};

const Footer = (props: Props) => {
  const { formatMessage } = props.intl;

  const engine = useSelector((state: AppState) => rootSelector(state));
  const selectedCosmos = useSelector((state: AppState) => isCosmosResourceCreatedSelector(state));
  const cosmos = useSelector((state: AppState) => getCosmosDbSelectionSelector(state));
  const selectedAppService = useSelector((state: AppState) => isAppServiceSelectedSelector(state));
  const appService = useSelector((state: AppState) => getAppServiceSelectionSelector(state));
  const visitedRoutes = useSelector((state: AppState) => getIsVisitedRoutesSelector(state));
  const isEnableNextPage = useSelector((state: AppState) => isEnableNextPageSelector(state));
  const currentRoute = useSelector((state: AppState) => state.wizardRoutes.selected);
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;

  const dispatch = useDispatch();

  const trackPageForTelemetry = (pathname: string) => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_PAGE_SWITCH, {
      pageName: pathname,
    });
  };

  const generateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    vscode.postMessage({
      module: EXTENSION_MODULES.GENERATE,
      command: EXTENSION_COMMANDS.GENERATE,
      track: false,
      text: PAYLOAD_MESSAGES_TEXT.SENT_GENERATION_INFO_TEXT,
      payload: {
        engine,
        selectedCosmos,
        cosmos,
        selectedAppService,
        appService,
      },
    });
    trackPageForTelemetry(currentRoute);
    dispatch(openPostGenModalAction());
  };

  const navigateBack = () => {
    trackPageForTelemetry(currentRoute);
    dispatch(setPageWizardPageAction(pathsBack[currentRoute]));
  };

  const navigateForward = () => {
    trackPageForTelemetry(currentRoute);
    if (currentRoute !== ROUTES.REVIEW_AND_GENERATE) {
      dispatch(setVisitedWizardPageAction(pathsNext[currentRoute]));
    }
    dispatch(setPageWizardPageAction(pathsNext[currentRoute]));
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

  const canGenerate = (): boolean => {
    return visitedRoutes.showReviewAndGenerate;
  };

  const showLicenses = (): boolean => {
    return visitedRoutes.showFrameworks;
  };

  return (
    <nav aria-label={formatMessage(messages.navAriaLabel)}>
      {currentRoute !== ROUTES.PAGE_DETAILS && (
        <div className={styles.footer}>
          <div>{showLicenses() && formatMessage(messages.license)}</div>
          <div className={styles.buttonContainer}>
            {currentRoute !== ROUTES.NEW_PROJECT && (
              <a
                tabIndex={0}
                className={classnames(buttonStyles.buttonDark, styles.button, styles.buttonBack)}
                onClick={navigateBack}
                onKeyPress={navigateBackOnKeyPress}
                onKeyUp={keyUpHandler}
              >
                {formatMessage(messages.back)}
              </a>
            )}
            {currentRoute !== ROUTES.REVIEW_AND_GENERATE && (
              <a
                tabIndex={isEnableNextPage ? 0 : -1}
                className={classnames(styles.button, styles.buttonNext, buttonStyles.buttonHighlighted, {
                  [buttonStyles.buttonDark]: !isEnableNextPage,
                  [styles.disabledOverlay]: !isEnableNextPage,
                })}
                onClick={navigateForward}
                onKeyPress={navigateForwardOnKeyPress}
                onKeyUp={keyUpHandler}
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
            )}
            {canGenerate() && (
              <button
                disabled={!isEnableNextPage}
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]: !isEnableNextPage,
                  [buttonStyles.buttonHighlighted]: isEnableNextPage,
                  [styles.disabledOverlay]: !isEnableNextPage,
                })}
                onClick={generateProject}
              >
                {formatMessage(messages.generate)}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default injectIntl(Footer);
