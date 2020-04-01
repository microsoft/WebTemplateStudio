import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
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
import { ISelectedAppService } from "../../store/azureProfileData/appService/model";

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

import {
  getIsVisitedRoutesSelector,
  IVisitedPages,
} from "../../store/wizardContent/wizardContent/wizardNavigationSelector";
import { isEnableNextPage } from "../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../store/combineReducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../store/ActionType";

import { ReactComponent as NextArrow } from "../../assets/nextarrow.svg";
import nextArrow from "../../assets/nextarrow.svg";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import { sendTelemetry } from "../../utils/extensionService/extensionService";
import { setVisitedWizardPageAction, setPageWizardPageAction } from "../../store/wizardContent/pages/action";
import { AppContext } from "../../AppContext";

interface IDispatchProps {
  setRouteVisited: (route: string) => void;
  setPage: (route: string) => void;
  openPostGenModal: () => any;
}

interface IStateProps {
  engine: any;
  selectedCosmos: boolean;
  cosmos: any;
  selectedAppService: boolean;
  appService: ISelectedAppService | null;
  isVisited: IVisitedPages;
  isEnableNextPage: boolean;
  selectedRoute: string;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

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
  const {
    engine,
    selectedCosmos,
    cosmos,
    selectedAppService,
    appService,
    openPostGenModal,
    isEnableNextPage,
    selectedRoute,
    isVisited,
    intl,
  } = props;

  const { showFrameworks } = isVisited;
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;

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
    trackPageForTelemetry(selectedRoute);
    openPostGenModal();
  };

  const navigateBack = () => {
    const { setPage, selectedRoute } = props;

    trackPageForTelemetry(selectedRoute);
    setPage(pathsBack[selectedRoute]);
  };

  const navigateForward = () => {
    const { setRouteVisited, setPage, selectedRoute } = props;

    trackPageForTelemetry(selectedRoute);
    if (selectedRoute !== ROUTES.REVIEW_AND_GENERATE) {
      setRouteVisited(pathsNext[selectedRoute]);
    }
    setPage(pathsNext[selectedRoute]);
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
    return isVisited.showReviewAndGenerate;
  };

  return (
    <nav aria-label={intl.formatMessage(messages.navAriaLabel)}>
      {selectedRoute !== ROUTES.PAGE_DETAILS && (
        <div className={styles.footer}>
          <div>{showFrameworks && intl.formatMessage(messages.license)}</div>
          <div className={styles.buttonContainer}>
            {selectedRoute !== ROUTES.NEW_PROJECT && (
              <a
                tabIndex={0}
                className={classnames(buttonStyles.buttonDark, styles.button, styles.buttonBack)}
                onClick={navigateBack}
                onKeyPress={navigateBackOnKeyPress}
                onKeyUp={keyUpHandler}
              >
                {intl.formatMessage(messages.back)}
              </a>
            )}
            {selectedRoute !== ROUTES.REVIEW_AND_GENERATE && (
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
                {intl.formatMessage(messages.next)}
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
                {intl.formatMessage(messages.generate)}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  engine: rootSelector(state),
  selectedCosmos: isCosmosResourceCreatedSelector(state),
  cosmos: getCosmosDbSelectionSelector(state),
  selectedAppService: isAppServiceSelectedSelector(state),
  appService: getAppServiceSelectionSelector(state),
  isVisited: getIsVisitedRoutesSelector(state),
  isEnableNextPage: isEnableNextPage(state),
  selectedRoute: state.wizardRoutes.selected,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, RootAction>): IDispatchProps => ({
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  setPage: (route: string) => {
    dispatch(setPageWizardPageAction(route));
  },
  openPostGenModal: () => {
    dispatch(openPostGenModalAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Footer));
