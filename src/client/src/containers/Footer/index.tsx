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
  PAGEID
} from "../../utils/constants";

import { IVSCodeObject } from "../../store/vscode/model";
import { ISelectedAppService } from "../../store/azureProfileData/appService/model";

import { rootSelector } from "../../store/selection/app/selector";
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
} from "../../store/azureProfileData/cosmosDb/selector";
import {
  isAppServiceSelectedSelector,
  getAppServiceSelectionSelector
} from "../../store/azureProfileData/appService/selector";

import { openPostGenModalAction } from "../../store/modals/action";
import { getVSCodeApiSelector } from "../../store/vscode/vscodeApiSelector";

import {
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

import {
  getIsVisitedRoutesSelector,
  IVisitedPages
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

interface IDispatchProps {
  setRouteVisited: (route: string) => void;
  setPage: (route: string) => void;
  openPostGenModal: () => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  engine: any;
  selectedCosmos: boolean;
  cosmos: any;
  selectedAppService: boolean;
  appService: ISelectedAppService | null;
  isVisited: IVisitedPages;
  isEnableNextPage: boolean;
  selectedRoute : string;
}

type Props = IStateProps &
  IDispatchProps &
  InjectedIntlProps;

const pathsNext: any = {
  [ROUTES.NEW_PROJECT]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.SELECT_PAGES,
  [ROUTES.SELECT_PAGES]: ROUTES.AZURE_LOGIN,
  [ROUTES.AZURE_LOGIN]: ROUTES.REVIEW_AND_GENERATE
};
const pathsBack: any = {
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.NEW_PROJECT,
  [ROUTES.SELECT_PAGES]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.AZURE_LOGIN]: ROUTES.SELECT_PAGES,
  [ROUTES.REVIEW_AND_GENERATE]: ROUTES.AZURE_LOGIN
};

class Footer extends React.Component<Props> {
  public logMessageToVsCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      engine,
      selectedCosmos,
      cosmos,
      selectedAppService,
      appService,
      vscode,
      openPostGenModal,
      selectedRoute
    } = this.props;
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
        appService
      }
    });
    this.trackPageForTelemetry(selectedRoute);
    openPostGenModal();
  };
  public canGenerate = (): boolean => {
    return this.props.isVisited.showReviewAndGenerate;
  };
  public findPageID = (pathname: string): number => {
    switch (pathname) {
      case ROUTES.NEW_PROJECT:
        return PAGEID.NEW_PROJECT;
      case ROUTES.SELECT_FRAMEWORKS:
        return PAGEID.SELECT_FRAMEWORKS;
      case ROUTES.SELECT_PAGES:
        return PAGEID.SELECT_PAGES;
      case ROUTES.AZURE_LOGIN:
        return PAGEID.AZURE_LOGIN;
      default:
        return PAGEID.REVIEW_AND_GENERATE;
    }
  };
  public handleLinkClick = (event: React.SyntheticEvent, pathname: string) => {
    const { isEnableNextPage, setRouteVisited, setPage } = this.props;
    this.trackPageForTelemetry(pathname);
    if (!isEnableNextPage) {
      event.preventDefault();
      return;
    }
    if (pathname !== ROUTES.REVIEW_AND_GENERATE) {
      setRouteVisited(pathsNext[pathname]);
    }
    setPage(pathsNext[pathname]);
    const pageNavLink = document.getElementById(
      "page" + this.findPageID(pathsNext[pathname])
    );
    if (pageNavLink) {
      pageNavLink.focus();
    }
  };

  public handleLinkBackClick = (
    event: React.SyntheticEvent,
    pathname: string
  ) => {
    const { setRouteVisited, setPage } = this.props;
    this.trackPageForTelemetry(pathname);
    if (pathname !== ROUTES.NEW_PROJECT) {
      setRouteVisited(pathname);
    }
    setPage(pathsBack[pathname]);
    const pageNavLink = document.getElementById(
      "page" + this.findPageID(pathsBack[pathname])
    );
    if (pageNavLink) {
      pageNavLink.focus();
    }
  };

  public trackPageForTelemetry = (pathname: string) => {
    sendTelemetry(this.props.vscode, EXTENSION_COMMANDS.TRACK_PAGE_SWITCH, {
      pageName: pathname
    });
  };
  public render() {
    // Validate the page names and do not generate if they are invalid or if there are duplicates
    const pageNames = new Set();
    for (const page of this.props.engine.pages) {
      const pageName = page.name;
      pageNames.add(pageName); 
    }

    const {
      isEnableNextPage,
      isVisited,
      intl,
      selectedRoute
    } = this.props;
    const { showFrameworks } = isVisited;
    return (
      <nav aria-label={intl.formatMessage(messages.navAriaLabel)}>
        {selectedRoute !== ROUTES.PAGE_DETAILS && (
          <div className={styles.footer}>
            <div>
              {showFrameworks && (
                <FormattedMessage
                  id="footer.license"
                  defaultMessage="By continuing, you agree to the terms of all the licenses in the
              licenses section."
                />
              )}
            </div>
            <div className={styles.buttonContainer}>
              {selectedRoute !== ROUTES.NEW_PROJECT && (
                <a
                  tabIndex={0}
                  className={classnames(
                    buttonStyles.buttonDark,
                    styles.button,
                    styles.buttonBack
                  )}
                  onClick={event => {
                    this.handleLinkBackClick(event, selectedRoute);
                  }}
                  onKeyUp={keyUpHandler}
                 
                >
                  <FormattedMessage id="footer.back" defaultMessage="Back" />
                </a>
              )}
              {selectedRoute !== ROUTES.REVIEW_AND_GENERATE && (
                <a
                  tabIndex={isEnableNextPage ? 0 : -1}
                  className={classnames(
                    styles.button,
                    styles.buttonNext,
                    buttonStyles.buttonHighlighted,
                    {
                      [buttonStyles.buttonDark]: !isEnableNextPage,
                      [styles.disabledOverlay]: !isEnableNextPage
                    }
                  )}
                  onClick={event => {
                    this.handleLinkClick(event, selectedRoute);
                  }}
                  onKeyUp={keyUpHandler}
                  
                >
                  <FormattedMessage id="footer.next" defaultMessage="Next" />
                  {nextArrow && (
                    <NextArrow
                      className={classnames(styles.nextIcon, {
                        [styles.nextIconNotDisabled]: isEnableNextPage
                      })}
                    />
                  )}
                </a>
              )}
              {this.canGenerate() && (
                <button
                  disabled={!isEnableNextPage}
                  className={classnames(styles.button, {
                    [buttonStyles.buttonDark]: !isEnableNextPage,
                    [buttonStyles.buttonHighlighted]: isEnableNextPage,
                    [styles.disabledOverlay]:!isEnableNextPage
                  })}
                  onClick={this.logMessageToVsCode}
                >
                  <FormattedMessage
                    id="footer.generate"
                    defaultMessage="Create Project"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  engine: rootSelector(state),
  selectedCosmos: isCosmosResourceCreatedSelector(state),
  cosmos: getCosmosDbSelectionSelector(state),
  selectedAppService: isAppServiceSelectedSelector(state),
  appService: getAppServiceSelectionSelector(state),
  isVisited: getIsVisitedRoutesSelector(state),
  isEnableNextPage: isEnableNextPage(state),
  selectedRoute : state.wizardRoutes.selected
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  setPage: (route: string) => {
    dispatch(setPageWizardPageAction(route));
  },
  openPostGenModal: () => {
    dispatch(openPostGenModalAction());
  }
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(Footer));
