import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import {
  ROUTES,
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  PAYLOAD_MESSAGES_TEXT,
  PAGEID
} from "../../utils/constants";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";

import { rootSelector } from "../../selectors/generationSelector";
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
} from "../../selectors/cosmosServiceSelector";
import {
  isAppServiceSelectedSelector,
  getAppServiceSelectionSelector
} from "../../selectors/appServiceSelector";

import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";
import { setPageWizardPageAction } from "../../actions/wizardInfoActions/setPageWizardPage";
import { updateCreateProjectButtonAction } from "../../actions/wizardInfoActions/updateCreateProjectButton";
import { openPostGenModalAction } from "../../actions/modalActions/modalActions";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import {
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";
import { isEnableNextPage } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

import { ReactComponent as NextArrow } from "../../assets/nextarrow.svg";
import nextArrow from "../../assets/nextarrow.svg";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import { sendTelemetry } from "../../utils/extensionService/extensionService";

interface IDispatchProps {
  setRouteVisited: (route: string) => void;
  setPage: (route: string) => void;
  openPostGenModal: () => any;
  updateCreateProjectButton: (enable: boolean) => any;
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
  enableCreateProjectButton: boolean;
}

type Props = RouteComponentProps &
  IStateProps &
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
      openPostGenModal
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
    const { pathname } = this.props.location;
    this.trackPageForTelemetry(pathname);
    openPostGenModal();
  };
  public isReviewAndGenerate = (): boolean => {
    return this.props.location.pathname === ROUTES.REVIEW_AND_GENERATE;
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
      location,
      isVisited,
      intl,
      updateCreateProjectButton,
      enableCreateProjectButton
    } = this.props;
    const { pathname } = location;
    const { showFrameworks } = isVisited;
    if (this.isReviewAndGenerate()) {
      updateCreateProjectButton(true);
    }
    return (
      <nav aria-label={intl.formatMessage(messages.navAriaLabel)}>
        {pathname !== ROUTES.PAGE_DETAILS && (
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
              {pathname !== ROUTES.NEW_PROJECT && (
                <Link
                  tabIndex={0}
                  className={classnames(
                    buttonStyles.buttonDark,
                    styles.button,
                    styles.buttonBack
                  )}
                  onClick={event => {
                    this.handleLinkBackClick(event, pathname);
                  }}
                  onKeyUp={keyUpHandler}
                  to={
                    pathsBack[pathname] === undefined
                      ? ROUTES.NEW_PROJECT
                      : pathsBack[pathname]
                  }
                >
                  <FormattedMessage id="footer.back" defaultMessage="Back" />
                </Link>
              )}
              {pathname !== ROUTES.REVIEW_AND_GENERATE && (
                <Link
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
                    this.handleLinkClick(event, pathname);
                  }}
                  onKeyUp={keyUpHandler}
                  to={pathsNext[pathname]}
                >
                  <FormattedMessage id="footer.next" defaultMessage="Next" />
                  {nextArrow && (
                    <NextArrow
                      className={classnames(styles.nextIcon, {
                        [styles.nextIconNotDisabled]: isEnableNextPage
                      })}
                    />
                  )}
                </Link>
              )}
              {enableCreateProjectButton && (
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
  enableCreateProjectButton: state.wizardContent.createProjectButton
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
  },
  updateCreateProjectButton: (enable: boolean) => {
    dispatch(updateCreateProjectButtonAction(enable));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(Footer))
);
